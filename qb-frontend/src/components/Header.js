
import {
    MDBBtn,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header>
            <div className='p-4 text-center bg-light' style={{ backgroundImage: `url(${require('./pictures/home_slide.png')})`, backgroundSize: 'cover', height: '500px' }}>
                <h1 className='mb-3' style={{ color: '#fff' }}>Quantum Platform</h1>
                <br/>
                <br/>
                <h2 className='mb-3' style={{ color: '#fff' }}>Together as <em>one</em>!</h2>
                <br/>
                <h2 className='mb-3' style={{ color: '#fff' }}>Join our community today and start buying smarter together.</h2>
                <br/>
                <h2 className='mb-3' style={{ color: '#fff' }}>Together  <em>We</em> buy better</h2>
                <br/>
                <br/>
                <MDBBtn outline size='lg' className='text-center' style={{ color: '#ccc' }}>
                    <Link to='/GoQuantum' className='text-decoration-none' style={{ color: '#fff' }}>
                        Go Quantum
                    </Link>
                </MDBBtn>
            </div>
        </header>
    );
}

export default Header;
