import {useAppSelector} from "../hooks.ts";
import {RootState} from "../store";
import {Navigate, Outlet} from "react-router-dom";

function PrivateRoute () {
    const isAuthenticated = useAppSelector((state: RootState) => state.user.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
