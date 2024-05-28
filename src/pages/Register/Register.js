import { Button } from "../../components/Button/Button";
import { Footer } from "../../components/Footer/Footer";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { Main } from "../../components/Main/Main";
import { fetchData } from "../../utils/api";
import { deleteOldMain, doLogin, validateError, validateForm } from "../../utils/functions";
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
    const form = Form("registerForm", "Rellena el siguiente formulario para crear tu cuenta.");
    // Crear los inputs del formulario
    const inputName = Input("name", "text", "Introduce tu nombre");
    const inputLastName = Input("lastName", "text", "Introduce tus apellidos");
    const inputEmail = Input("email", "email", "Ej. example@gmail.com")
    const inputPassword = Input("password", "password", "Introduce una contraseña");
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

        // Recoger valores del formulario
        const nameInput = document.querySelector("#name");
        const lastNameInput = document.querySelector("#lastName");        
        const emailInput = document.querySelector("#email");
        const passwordInput = document.querySelector("#password");
        const name = nameInput.value;
        const lastName = lastNameInput.value;        
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validar campos del formulario
        let control = false;
        control = validateForm(nameInput, lastNameInput, emailInput, passwordInput);
        if(control){return}
        
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
        const res = await fetchData("users", fetchOptions);

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