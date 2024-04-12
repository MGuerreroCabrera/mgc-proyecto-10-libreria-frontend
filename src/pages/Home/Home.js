import "./Home.css";

import { Footer } from "../../components/Footer/Footer";
import { Main } from "../../components/Main/Main";
import { deleteOldMain } from "../../utils/functions";
import { Button } from "../../components/Button/Button";
import { removeFavorite } from "../Favorites/Favorites";


export const Home = async () => {
    // Eliminar el anterior main en el caso de que exista
    deleteOldMain();

    // Crear el main de la home
    Main();    

    // Seleccionar el main
    const main = document.querySelector("main");
    
    // Comprobar si hay token
    if(localStorage.getItem("token")) {
        // Comprobar si existe la capa con el texto de bienvenida y eliminar
        const oldHeaderContainer = document.querySelector(".header-container");
        if(oldHeaderContainer) {
            oldHeaderContainer.remove();
        }
        // Crear capa e insertar datos de usuario
        const userDataContainer = document.createElement("div");
        userDataContainer.classList.add("user-data-container");
        const userName = document.createElement("p");
        userName.classList.add("txt-home");
        userName.textContent = "Bienvenido " + localStorage.getItem("userName") + " " + localStorage.getItem("lastName");
        const btLogout = Button("Desconectar");
        btLogout.addEventListener("click", () => {
            // Eliminar token
            localStorage.removeItem("token");
            // Eliminar el id del usuario
            localStorage.removeItem("userId");
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
        pHome.textContent = "Bienvenido a la librería más molona de todo internet. Crea tu cuenta para poder elegir tus libros favoritos.";
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

    // Hacer la petición al backend para que nos devuelva el listado de libros.
    const res = await fetch("http://localhost:3000/api/v1/books");

    // Pasar objeto res a json
    const response = await res.json();

    // Imprimir los libros por pantalla
    printBooks(booksContainer, response);    

    // Añadir el pie de página
    Footer();

};

export const printBooks = (parentNode, books, favorites = false) => {
    // Recorres el objeto respuesta que contiene los registros obtenidos.
    for (const book of books) {    
        // Crear los elementos HTML para insertar datos del libro
        const card = document.createElement("article");
        const coverContainer = document.createElement("div");
        coverContainer.classList.add("img-container");
        const cover = document.createElement("img");
        cover.src = book.cover;
        coverContainer.append(cover);
        const title = document.createElement("p");
        title.textContent = formatTitle(book.title);
        const publishedDate = document.createElement("p");
        publishedDate.textContent = `Publicado en ${book.publishedOn}`;
        const price = document.createElement("p");
        price.textContent = `${book.price.toFixed(2)} €`;

        // Comprobar si el usuario ha hecho login
        if(localStorage.getItem("userId") && !favorites) {
            // Crear el elemento HTML para la imagen del like
            const pushLike = document.createElement("img");
            pushLike.src = "./assets/img/get-like.png";
            pushLike.classList.add("push-like-img");
            pushLike.addEventListener("click", () => addFavorite(book._id));
            card.append(pushLike);            
        }else if(localStorage.getItem("userId") && favorites) {
            const pushLike = document.createElement("img");
            pushLike.src = "./assets/img/like.png";
            pushLike.classList.add("push-like-img");
            // Eliminar favorito
            pushLike.addEventListener("click", () => removeFavorite(book._id));
            card.append(pushLike);            
        }

        // Inyectar elementos en el nodo padre
        card.append(coverContainer, title, publishedDate, price);
        // Inyectar la carta en el elemento padre
        parentNode.append(card);
    } 
}

// Función que formatea títulos muy largos
export const formatTitle = (title) => {
    if(title.length > 20) {
        return title.slice(0, 18) + "..."
    }else{
        return title;
    }
}

// Función que añade un libro a favoritos del usuario
const addFavorite = async (idBook) => {
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

    // Llamar a la API con el id de usuario
    const res = await fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`, options);
    //console.log(res);
    // Pasar a JSON el resultado de la respuesta
    const response = await res.json();

    console.log(response);
}