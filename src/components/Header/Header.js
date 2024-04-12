import { routes } from "../../utils/routes";
import "./Header.css";


// Crear función que crea el Header
export const Header = () => {
    // Comprobar si existe token para construir el menú de navegación
    if(localStorage.getItem("token")){
        // Pintar el nav con usuario logeado
        printNavMenu(true);
    }else{
        // Pintar el nav sin tener usuario logeado
        printNavMenu();
    }
};


const printNavMenu = (loged = false) => {
    // Traer el div app para inyectarle el header
    const app = document.querySelector("#app");
    // Crear el elemento HTML header
    const header = document.createElement("header");
    header.id = "header";
    // Crear el elemento HTML nav para intectar menú de navegación
    const nav = document.createElement("nav");
    // Crear lista de enlaces
    const ul = document.createElement("ul");
    // Comprobar si el menú debe ser el de usuario logeado
    if(loged){
        for (const route of routes) {
            if(route.linkName !== "Registro" && route.linkName !== "Iniciar sesión") {
                // Crear el elemento HTML li de la lista de enlaces
                const li = document.createElement("li");
                // Crear el lemento HTML a con los datos de la ruta
                const a = document.createElement("a");
                a.href = route.src;
                a.textContent = route.linkName;
                // Crear escuchador de eventos para ejecutar la función correspondiente
                a.addEventListener("click", (e) => {
                    e.preventDefault();            
                    route.function();
                });
                li.append(a);
                ul.append(li);
            }            
        }
    }else{
        for (const route of routes) {
            if(route.linkName !== "Favoritos") {
                // Crear el elemento HTML li de la lista de enlaces
                const li = document.createElement("li");
                // Crear el lemento HTML a con los datos de la ruta
                const a = document.createElement("a");
                a.href = route.src;
                a.textContent = route.linkName;
                // Crear escuchador de eventos para ejecutar la función correspondiente
                a.addEventListener("click", (e) => {
                    e.preventDefault();            
                    route.function();
                });
                // a.addEventListener("click", route.function);
                li.append(a);
                ul.append(li);
            }
        }
    }
    // Inyectar ul en el nav
    nav.append(ul);
    // Inyectar el nav en el header
    header.append(nav);
    // Inyectar el header en app
    app.append(header);
}