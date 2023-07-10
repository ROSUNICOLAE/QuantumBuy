import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import SlimSidebar from "./SlimSidebar";

function HomePage() {
    const [buyProducts, setBuyProducts] = useState([]);
    const [sellProducts, setSellProducts] = useState([]);

    useEffect(() => {
        const fetchBuyProducts = async () => {
            try {
                const buyResponse = await fetch("http://localhost:8080/api/buyproducts");
                if (buyResponse.ok) {
                    const buyData = await buyResponse.json();
                    setBuyProducts(buyData);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const fetchSellProducts = async () => {
            try {
                const sellResponse = await fetch("http://localhost:8080/api/sellproducts");
                if (sellResponse.ok) {
                    const sellData = await sellResponse.json();
                    setSellProducts(sellData);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchBuyProducts();
        fetchSellProducts();
    }, []);

    return (
        <div className="home-page">
            <Navbar />
            <Header />
            <div className="scrollable-content">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Buy/Sell Polls</h1>
                            <p>Some content here...</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>Buy Polls</MDBCardTitle>
                                    <div className="table-wrapper">
                                        <div className="table-container">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    {/* Add more table headers if needed */}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {buyProducts.slice(0, 3).map((product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.productName}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.quantity}</td>
                                                        {/* Add more table cells with data if needed */}
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h5 className="card-title">Sell Polls</h5>
                                </div>
                                <div className="card-body">
                                    <div className="table-wrapper">
                                        <div className="table-container">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    {/* Add more table headers if needed */}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {sellProducts.slice(0, 3).map((product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.productName}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.quantity}</td>
                                                        {/* Add more table cells with data if needed */}
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <SlimSidebar />
        </div>
    );
}

export default HomePage;
