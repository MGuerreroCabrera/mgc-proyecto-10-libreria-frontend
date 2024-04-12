import "./Login.css";

import { Button } from "../../components/Button/Button";
import { Footer } from "../../components/Footer/Footer";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { Main } from "../../components/Main/Main";
import { deleteOldMain } from "../../utils/functions";
import { Home } from "../Home/Home";


export const Login = () => {
    
    // Eliminar el anterior main en el caso de que exista
    deleteOldMain();

    // Crear el main de la home
    Main();

    // Crear capa contenedora del formulario
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-login-container");
    formContainer.id = "form-login-container";

    // Crear el formulario
    const form = Form("loginForm", "Introduce tus datos para iniciar sesión");
    // Crear los inputs del formulario
    const inputName = Input("userName", "text", "Escribe tu e-mail", true);
    const inputPassword = Input("password", "password", "*********", true);
    // Crear el botón del formulario
    const btSend = Button("Enviar");
    // Añadir escuchador de eventos al click del botón
    btSend.addEventListener("click", async (event) => {
        event.preventDefault();
        // Crear la lógica del login
        const email = inputName.value;
        const password = inputPassword.value;
        // Recoger valores del formulario
        const user = JSON.stringify({
            email,
            password
        })
        // Opciones del fetch
        const fetchOptions = {
            method: "POST",
            body: user,
            headers: {
                "Content-Type": "application/json"
            }
        }
        // Recoger resultado de la petición de login
        const res = await fetch("http://localhost:3000/api/v1/users/login", fetchOptions);
        // Comprobar el estado de la respuesta por si ha habido error
        if(res.status === 400) {
            // Crear párrafo de error y añadirlo al formulario
            const p = document.createElement("p");
            p.classList.add("error");
            p.textContent = "Usuario y/o contraseña incorrectos";
            form.append(p);
            return;
        }
        // Comprobar si el párrafo de error existe y eliminarlo si es así
        const pError = document.querySelector(".error");
        if(pError) {
            pError.remove();
        }
        // Pasar resultado a formato JSON
        const response = await res.json();
        // Añadir elementos token y datos de usuario al localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userLoged._id);
        localStorage.setItem("userName", response.userLoged.name);
        localStorage.setItem("lastName", response.userLoged.lastName);
        // Recargar la página. Evita que se repita el header.
        location.reload();
        // Redirigir a la página de inicio
        Home();
    })
    // Inyectar inputs en el form
    form.append(inputName, inputPassword, btSend);
    const main = document.querySelector("main");
    
    // Inyectar formulario al contenedor
    formContainer.append(form);

    main.append(formContainer);

    Footer();
    
};