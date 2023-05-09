
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import HomePage from "./components/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GoQuantum from "./components/GoQuantum";
import AboutUs from "./components/AboutUs";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/GoQuantum" element={<GoQuantum />} />
                <Route path="/AboutUs" element={<AboutUs />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
