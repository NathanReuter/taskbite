import './App.css';
import {Home} from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Signup} from "./pages/Signup.tsx";
import {Dashboard} from "./pages/app/Dashboard.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
