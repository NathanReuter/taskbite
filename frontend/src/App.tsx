import './App.css';
import {Home} from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Signup} from "./pages/Signup.tsx";
import {Dashboard} from "./pages/app/Dashboard.tsx";
import {Provider} from "react-redux";
import store from "./store";
import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
    return (
        <>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/dashboard' element={<PrivateRoute />}>
                        <Route path="" element={<Dashboard />}/>
                    </Route>
                </Routes>
            </Provider>
        </>
    );
}

export default App;
