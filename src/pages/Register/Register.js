import { Button } from "../../components/Button/Button";
import { Footer } from "../../components/Footer/Footer";
import { Form } from "../../components/Form/Form";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { Main } from "../../components/Main/Main";
import { deleteOldMain, validateForm } from "../../utils/functions";
import { Home } from "../Home/Home";
import "./Register.css";


export const Register = () => {
    // Eliminar main
    deleteOldMain();
    // Crear nuevo main de la página
    Main();
    
    // Crear capa contenedora del formulario
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-register-container");
    formContainer.id = "form-register-container";

    // Crear el formulario
    const form = Form("registerForm", "👇 Rellena el siguiente formulario para crear tu cuenta 👇");
    // Crear los inputs del formulario
    const inputName = Input("name", "text", "Nombre", true);
    const inputLastName = Input("lastName", "text", "Apellidos");
    const inputEmail = Input("email", "email", "Dirección de correo electrónico", true)
    const inputPassword = Input("password", "password", "*********", true);
    // Crear el botón del formulario
    const btSend = Button("Enviar");
    // Añadir escuchador de evento al botón y crear la lógica del register
    btSend.addEventListener("click", async (event) => {
        event.preventDefault();
        // Comprobar si el párrafo de error existe y eliminarlo si es así
        const pError = document.querySelector(".error");
        if(pError) {
            pError.remove();
        }
        // Validar campos del formulario
        let control = false;
        control = validateForm("name", "lastName", "email", "password");
        if(control){return}
        // Recoger valores del formulario
        const name = inputName.value;
        const lastName = inputLastName.value;        
        const email = inputEmail.value;
        const password = inputPassword.value;
        // Pasar los datos del usuario a formato JSON
        const user = JSON.stringify({
            name,
            lastName,
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
        // Recoger resultado de la petición de register
        const res = await fetch("http://localhost:3000/api/v1/users/", fetchOptions);

        // Comprobar si la dirección de correo electrónico ya está registrada
        let control_user = false;
        control_user = validateError(res.status);
        if(control_user)
        {
            return;
        } else {
            doLogin(email, password);
        }
    })
    // Inyectar campos del formulario al formulario
    form.append(inputName, inputLastName, inputEmail, inputPassword, btSend);
    // Coger el main del DOM
    const main = document.querySelector("main");    
    // Inyectar formulario al contenedor
    formContainer.append(form);
    // Inyectar el formulario al main
    main.append(formContainer);

    // Pintar el footer
    Footer();
};

// Función que comprueba el error obtenido
const validateError = (status) => {
    // Crear párrafo de error y añadirlo al DOM
    const p = document.createElement("p");    
    const parentNode = document.querySelector("#form-register-container");
    const brotherNode = document.querySelector("#registerForm");
    switch (status) {
        case 409:
            p.textContent = "Esta dirección de correo electrónico ya ha sido registrada. Pruebe con otra dirección de correo electrónico";        
            p.classList.add("error");
            parentNode.insertBefore(p, brotherNode);
            return true;
        case 400:
            p.textContent = "Ha ocurrido un problema con el registro. Contacta con soporte@mgc-library.com para solucionar el problema";
            p.classList.add("error");
            parentNode.insertBefore(p, brotherNode);
            return true;
        default:
            return false;
    }
}

const doLogin = async (email, password) => {  

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
    
    // Pasar resultado a formato JSON
    const response = await res.json();

    // Añadir elementos token y datos de usuario al localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.userLoged._id);
    localStorage.setItem("userName", response.userLoged.name);
    localStorage.setItem("lastName", response.userLoged.lastName);
    localStorage.setItem("favorites", response.userLoged.favorites);
    
    // Cargar la página de inicio
    Header();
    Home();
}