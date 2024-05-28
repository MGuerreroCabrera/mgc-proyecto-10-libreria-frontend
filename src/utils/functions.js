import { Header } from "../components/Header/Header";
import { Favorites } from "../pages/Favorites/Favorites";
import { Home } from "../pages/Home/Home";
import { fetchData } from "./api";
import { books } from "./books";
import { routeControl, saveRoute } from "./controlRoutes";
import { routes } from "./routes";

// Función que elimina el antiguo main en el caso de que exista
export const deleteOldMain = () => {
    const oldMain = document.querySelector("main");
    if(oldMain){
        oldMain.remove();
    }
}

// Función que pone los estilos de campo requerido de un input que recibe por parámetro
const putError = (input, message) => {    
    input.value = "";
    input.className = "invalid-input";
    // Indicar que el campo es obligatorio
    input.placeholder = message;
    // Poner el foco en el campo
    input.focus();
}

// Función que formatea el título del libro
export const formatTitle = (title) => {
    if(title.length > 20) {
        return title.slice(0, 18) + "..."
    }else{
        return title;
    }
}

export const validateForm = (...inputs) => {
    // Recorremos los inputs enviados
    for(const input of inputs) {
        // Comprobar si el campo está vacío
        if(input.value === "") {     
            // Poner el foco en el campo       
            input.focus();            
            // Mostar mensaje al usuario
            putError(input, "📣 Campo obligatorio");
            // Añadir escuchador pàra cuando deje de tener foco
            input.addEventListener("blur", (event) => {
                if(event.target.value === "") {
                    input.focus();
                } else {
                    input.className = "input";
                }
            })
            return true;
        }
        if(input.id === "userName" || input.id === "email") {
            const validatedEmail = isEmail(input.value);
            if(!validatedEmail) {
                input.focus();
                putError(input, "⛔️ Email inválido")
                input.addEventListener("blur", (event) => {
                    if(event.target.value === "") {
                        input.focus();
                    } else {
                        input.className = "input";
                    }
                })
                return true;
            }
        }
    }
}

const isEmail = (email) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
}

// Función para convertir la valoración numérica a estrellas
export const getStars = (rating) => {
    const ul = document.createElement('ul');
    ul.classList.add('stars');

    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        if(localStorage.getItem("userId")) {           
            a.className = "star";
        } else {
            a.className = "star-disabled ";
        }
        a.textContent = '⭐';
        a.dataset.rating = i;
        
        if (i <= Math.floor(rating)) {
            a.textContent = '⭐';  // Estrella llena
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            a.textContent = '🌟';  // Media estrella
        } else {
            a.textContent = '✩';  // Estrella vacía
        }

        li.appendChild(a);
        ul.appendChild(li);
    }

    return ul;
};

// Función que envía valoración
export const sendScore = async (id, rating) => {
    console.log(rating);
    console.log(JSON.stringify({rating}));

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`            
        },
        body: JSON.stringify({ rating })
    }

    //const res = await fetch(`http://localhost:3000/api/v1/books/${id}`, options);
    const res = await fetchData("books", options, id);
    
    if(res._id) {
        // Actualizar el valor en el array de libros
        const book = books.find(element => element._id === id);
        book.rating = ((book.rating * book.ratingCounts) + rating) / (book.ratingCounts + 1);
        book.ratingCounts++;
        if(routeControl === "/home"){
            Home();
        }
        if(routeControl === "/favorites") {
            Favorites();
        }

    }
};

// Función que añade un libro a favoritos del usuario
export const addFavorite = async (idBook) => {
    // Recoger los favoritos del localStorage y añadirle el libro recibido
    const oldFavorites = localStorage.getItem("favorites");
    // Crear array de los favoritos con el valor del localStorage
    const oldFavoritesTransform = oldFavorites.split(",");
    // Inserta al final del array el idBook recibido
    oldFavoritesTransform.push(idBook);
    // Del array resultante crear un string con valores separados por comas
    const newFavorites = oldFavoritesTransform.join(",");
    // Actualizar el valor del localStorage
    localStorage.setItem("favorites", newFavorites);

    // Crear objeto que contiene un array con el id del libro y pasarlo a JSON.stringify
    const book = JSON.stringify({ favorites:[idBook] });
    
    // Opciones para llamar a la API
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: book
    }

    await fetchData("favorites", options);

    Header();
    Home();
}

// FUNCIONES DE HEADER

// Función que crea el elemento nav con los enlaces de navegación
export const printNavMenu = (header, loged = false) => {
      
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

// Función que crea un elemento de navegación
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

// Función que pinta el logo en el header
export const printLogo = (header) => {
    // Crear el elemento HTML h1 para logo
    const logo = document.createElement("h1");
    logo.classList.add("logo");
    logo.textContent = "BIBLOVE";
    // Inyectar logo en el header
    header.append(logo);
}

// FUNCIONES DE REGISTER
// Función que comprueba el error obtenido
export const validateError = (status) => {
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

// Función que permite al usuario hacer login
export const doLogin = async (email, password) => {  

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
    const response = await fetchData("login", fetchOptions);

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