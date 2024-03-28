import { routes } from "../../utils/routes";
import "./Header.css";


// Crear función que crea el Header
export const Header = () => {
    console.log("Estoy en la función Header");
    // Traer el div app para inyectarle el header
    const app = document.querySelector("#app");
    // Crear el elemento HTML header
    const header = document.createElement("header");
    // Crear el elemento HTML nav para intectar menú de navegación
    const nav = document.createElement("nav");
    // Crear lista de enlaces
    const ul = document.createElement("ul");
    // Recorrer elementos del array de rutas para crear los enlaces
    for (const route of routes) {
        // Crear el elemento HTML li de la lista de enlaces
        const li = document.createElement("li");
        // Crear el lemento HTML a con los datos de la ruta
        const a = document.createElement("a");
        a.href = route.src;
        a.textContent = route.linkName;
        // Crear escuchador de eventos para ejecutar la función correspondiente
        a.addEventListener("click", route.function);
        li.append(a);
        ul.append(li);
    }
    // Inyectar ul en el nav
    nav.append(ul);
    // Inyectar el nav en el header
    header.append(nav);
    // Inyectar el header en app
    app.append(header);
};