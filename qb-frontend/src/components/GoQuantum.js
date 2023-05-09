import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import SlimSidebar from "./SlimSidebar";

function GoQuantum() {
    return (
        <div>
        <Navbar />
            <SlimSidebar />
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <h2>Column 1</h2>
                    <p>
                        asd asdasdasdasd
                    </p>
                </div>
                <div className='col-md-6'>
                    <h2>Column 2</h2>
                    <p>
                       asdasdasdasdasdasda
                </div>
            </div>
            <Footer />
        </div>
        </div>

    );
}

export default GoQuantum;
