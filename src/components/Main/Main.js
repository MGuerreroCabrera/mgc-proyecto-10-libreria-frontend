import { Button } from "../Button/Button";
import { Footer } from "../Footer/Footer";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import "./Main.css";

// Crear función que inyecta el main en el DOM
export const Main = () => {
    // Traer la etiqueta app donde se pintará el main
    const app = document.querySelector("#app");
    // Crear el elemento HTML main
    const main = document.createElement("main")

    app.append(main);
}