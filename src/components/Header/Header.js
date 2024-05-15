import { saveRoute } from "../../utils/controlRoutes";
import { routes } from "../../utils/routes";
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

const printLogo = (header) => {
    // Crear el elemento HTML h1 para logo
    const logo = document.createElement("h1");
    logo.classList.add("logo");
    logo.textContent = "BIBLOVE";
    // Inyectar logo en el header
    header.append(logo);
}


const printNavMenu = (header, loged = false) => {
      
    // Crear el elemento HTML nav para intectar menú de navegación
    const nav = document.createElement("nav");

    // Crear lista de enlaces
    const ul = document.createElement("ul");

    // Comprobar si el menú debe ser el de usuario logeado
    if(loged){
        // Recorrer array de rutas
        for (const route of routes) {
            // Comprobar que no llegan las rutas Registro e Iniciar sesión ya que aquí debo estar loged
            if(route.linkName !== "Registro" && route.linkName !== "Iniciar sesión") {        
                // Validar si es favoritos
                if(route.linkName === "Favoritos")
                {
                    // Comprobar si en el localStorage - favorites hay elemento
                    if(localStorage.getItem("favorites").length !== 0){
                        printElement(ul, route);
                    }
                } else {
                    printElement(ul, route);
                }
            }            
        }
    }else{
        for (const route of routes) {
            if(route.linkName !== "Favoritos") {
                printElement(ul, route)
            }
        }
    }
    // Inyectar ul en el nav
    nav.append(ul);
    // Inyectar el nav en el header
    header.append(nav);
}

const printElement = (ul, route) => {
    // Crear el elemento HTML li de la lista de enlaces
    const li = document.createElement("li");
    // Crear el lemento HTML a con los datos de la ruta
    const a = document.createElement("a");
    a.href = route.src;
    a.textContent = route.linkName;
    // Crear escuchador de eventos para ejecutar la función correspondiente
    a.addEventListener("click", (e) => {
        e.preventDefault();            
        window.history.pushState({}, "", e.target.href);
        route.function();
        saveRoute(route.src);
    });
    li.append(a);
    ul.append(li);
}