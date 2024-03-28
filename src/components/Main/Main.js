import { Footer } from "../Footer/Footer";
import "./Main.css";

// Crear función que inyecta el main en el DOM
export const Main = (page) => {
    // Traer la etiqueta app donde se pintará el main
    const app = document.querySelector("#app");
    // Eliminar el main si existe
    const oldMain = document.querySelector("main");
    if(oldMain){
        oldMain.remove();
    }
    // Crear el elemento HTML main
    const main = document.createElement("main");
    // Inyectar el main en app
    const h1 = document.createElement("h1");
    h1.textContent = page;
    main.append(h1);
    app.append(main);
    Footer();
}