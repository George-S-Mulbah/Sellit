import { useContext } from "react";
import jwtDecode from "jwt-decode";
import authStorage from '../auth/storage';



import AuthContext from "./context";


export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    //log the user In 

    const logIn = (authToken) => {
        const user = jwtDecode(authToken);
        setUser(user);
        authStorage.storeToken(authToken);
    }
//logOut the user
    const logOut = () => {
        setUser(null);
    authStorage.removeToken();
    }


    return { user,logIn,logOut };
}