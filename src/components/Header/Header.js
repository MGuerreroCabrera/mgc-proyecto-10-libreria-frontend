import { printLogo, printNavMenu } from "../../utils/functions";
import "./Header.css";


// Crear función que crea el Header
export const Header = () => {
    const oldHeaderContainer = document.querySelector("#header");
    if(oldHeaderContainer) {
        oldHeaderContainer.remove();
    }
    
    // Traer el div app para inyectarle el header
    const app = document.querySelector("#app");
    // Crear el elemento HTML header
    const header = document.createElement("header");
    header.id = "header";
    // Inyectar logo en el header
    printLogo(header);
    // Comprobar si existe token para construir el menú de navegación
    if(localStorage.getItem("token")){
        // Pintar el nav con usuario logeado
        printNavMenu(header, true);
    }else{
        // Pintar el nav sin tener usuario logeado
        printNavMenu(header);
    }
    // Inyectar el header en app
    app.append(header);
};


