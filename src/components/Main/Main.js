import { Footer } from "../Footer/Footer";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
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
    switch (page) {
        case "Home":
            
            break;
        case "Login":
            // Crear el formulario
            const form = Form("loginForm");
            // Crear los inputs del formulario
            const inputName = Input("userName", "text", "Escribe tu e-mail");
            const inputPassword = Input("password", "password", "*********");
            // Inyectar inputs en el form
            form.append(inputName, inputPassword);
            main.append(form);
            break;
        case "Regiter":
            break;
        case "Favorites":
            break;
    
        default:
            break;
    }
    Footer();
}