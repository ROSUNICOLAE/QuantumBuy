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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac lorem in libero fermentum mollis eget
                        nec ex. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                        turpis egestas.
                    </p>
                </div>
                <div className='col-md-6'>
                    <h2>Column 2</h2>
                    <p>
                        Nulla nec velit aliquam, fermentum nibh vel, ornare turpis. Proin sit amet mauris eu lacus dignissim
                        volutpat. Maecenas convallis, dolor nec hendrerit venenatis, massa mauris convallis arcu, ac sagittis
                        sapien ipsum vel odio.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
        </div>

    );
}

export default GoQuantum;
