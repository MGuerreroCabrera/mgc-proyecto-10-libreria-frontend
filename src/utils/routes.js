import { Favorites } from "../pages/Favorites/Favorites";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const routes = [
    {
        linkName: "Home",
        src: "#",
        function: Home
    },
    {
        linkName: "Login",
        src: "#",
        function: Login
    },
    {
        linkName: "Register",
        src: "#",
        function: Register
    },
    {
        linkName: "Favorites",
        src: "#",
        function: Favorites
    }
];