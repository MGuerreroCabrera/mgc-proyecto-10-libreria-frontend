import { Favorites } from "../pages/Favorites/Favorites";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const routes = [
    {
        linkName: "Inicio",
        src: "/home",
        function: Home
    },
    {
        linkName: "Iniciar sesión",
        src: "/login",
        function: Login
    },
    {
        linkName: "Registro",
        src: "/register",
        function: Register
    },
    {
        linkName: "Favoritos",
        src: "/favorites",
        function: Favorites
    }
];