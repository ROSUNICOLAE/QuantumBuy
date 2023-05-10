import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import HomePage from "./components/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GoQuantum from "./components/GoQuantum";
import AboutUs from "./components/AboutUs";
import SignUp from "./components/SignUp";
import Callback from "./components/Callback";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/GoQuantum" element={<GoQuantum />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/users/oauth2/callback/google" element={<Callback />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
