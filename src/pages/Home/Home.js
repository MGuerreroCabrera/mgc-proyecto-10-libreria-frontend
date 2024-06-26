import "./Home.css";

import { Footer } from "../../components/Footer/Footer";
import { Main } from "../../components/Main/Main";
import { deleteOldMain } from "../../utils/functions";
import { Button } from "../../components/Button/Button";
import { Article } from "../../components/Article/Article";
import { routeControl } from "../../utils/controlRoutes";
import { books } from "../../utils/books";
import { fetchData } from "../../utils/api";


export const Home = async () => {    
    // Eliminar el anterior main en el caso de que exista
    deleteOldMain();

    // Crear el main de la home
    Main();        
    
    // Seleccionar el main
    const main = document.querySelector("main");
    
    // Comprobar si hay token
    if(localStorage.getItem("token")) {
        // Crear capa e insertar datos de usuario
        const userDataContainer = document.createElement("div");
        userDataContainer.classList.add("user-data-container");
        const userName = document.createElement("p");
        userName.classList.add("txt-home");
        userName.textContent = "Usuario conectado: " + localStorage.getItem("userName") + " " + localStorage.getItem("lastName");
        const btLogout = Button("Desconectar");
        btLogout.addEventListener("click", () => {
            // Eliminar el contenido del localStorage
            emptyLocalStorage();
            // Recargar la página
            location.reload();
        });
        userDataContainer.append(userName, btLogout);
        main.append(userDataContainer);
    }else {
        // Crear el contenedor de la cabecera
        const headerContainer = document.createElement("div");
        headerContainer.classList.add("header-container");
        // Crear párrafo con el texto de la home si entras sin login
        const pHome = document.createElement("p");
        pHome.classList.add("txt-home");
        pHome.textContent = "Bienvenido a la librería más molona de todo internet. Crea tu cuenta para poder elegir tus libros favoritos y valorarlos.";
        // Inyectar el párrafo al headerContainer
        headerContainer.append(pHome);
        // Inyectar el headerContainer al main    
        main.append(headerContainer);
    }


    // Crear el contenedor de los libros
    const booksContainer = document.createElement("div");
    booksContainer.id = "books-container";

    // Inyectar el contenedor de libros al main
    main.append(booksContainer);

    //Controlar la petición de los libros al backend
    if(books.length === 0) {
        // Controlar si ya se está en la home
        if(routeControl === "/home") {       
            //return;
            // Imprimir los libros en pantalla cogiendo los datos del array
            printBooks(booksContainer, books);
        } else {
            // Hacer la petición al backend para que nos devuelva el listado de libros utilizando función fetchData
            const res = await fetchData("books");
            // Recorrer respuesta para introducir los libros en el array de libros
            for (const book of res) {
                books.push(book);
            }
            // Imprimir los libros en pantalla obtenidos de la API
            printBooks(booksContainer, res);
        }        
    } else {
        // Imprimir los libros en pantalla cogiendo los datos del array
        printBooks(booksContainer, books); 
    }
    
    // Añadir el pie de página
    Footer();

};

export const printUserDataContainer = () => {
    const main = document.querySelector("main");
    // Crear capa e insertar datos de usuario
    const userDataContainer = document.createElement("div");
    userDataContainer.classList.add("user-data-container");
    const userName = document.createElement("p");
    userName.classList.add("txt-home");
    userName.textContent = "Bienvenido " + localStorage.getItem("userName") + " " + localStorage.getItem("lastName");
    const btLogout = Button("Desconectar");
    btLogout.addEventListener("click", () => {
        // Eliminar el contenido del localStorage
        emptyLocalStorage();
        // Recargar la página
        location.reload();
    });
    userDataContainer.append(userName, btLogout);
    main.append(userDataContainer);
}

export const printBooks = async (parentNode, books, favorites = false) => {    
    // Recorrer el objeto respuesta que contiene los registros obtenidos.
    for (const book of books) {                    
        // Crear el elemento HTML con la información completa del libro
        const card = Article(book, favorites);
        // Inyectar la carta en el elemento padre
        parentNode.append(card);
    } 
}

const emptyLocalStorage = () => {
    // Eliminar token
    localStorage.removeItem("token");
    // Eliminar el id del usuario
    localStorage.removeItem("userId");
    // Eliminar nombre, apellidos y favoritos
    localStorage.removeItem("userName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("favorites");
}