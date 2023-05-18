import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import SlimSidebar from "./SlimSidebar";

function HomePage() {
    const [buyProducts, setBuyProducts] = useState([]);

    useEffect(() => {
        const fetchBuyProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/buyproducts");
                if (response.ok) {
                    const data = await response.json();
                    setBuyProducts(data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchBuyProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <Header />
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
                                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Price </th>
                                            <th>Quantity</th>
                                            {/* Add more table headers if needed */}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {buyProducts.map((product) => (
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
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h5 className="card-title">Sell Polls</h5>
                            </div>
                            <div className="card-body">
                                {/* Add your sell products component */}
                                {/* Example: <SellProducts /> */}
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
