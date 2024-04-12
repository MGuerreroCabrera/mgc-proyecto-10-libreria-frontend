import "./Favorites.css";

import { Footer } from "../../components/Footer/Footer";
import { Main } from "../../components/Main/Main";
import { deleteOldMain } from "../../utils/functions";
import { printBooks } from "../Home/Home";


export const Favorites = async () => {
    // Eliminar el anterior main en el caso de que exista
    deleteOldMain();

    // Crear el main de la home
    Main();    

    // Seleccionar el main
    const main = document.querySelector("main");

    // Crear el contenedor de los libros
    const booksContainer = document.createElement("div");
    booksContainer.id = "books-container";

    // Inyectar el contenedor de libros al main
    main.append(booksContainer);

    // Hacer la petición al backend para que nos devuelva el listado de libros.
    const res = await fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`);

    // Pasar objeto res a json
    const response = await res.json();
    console.log(response);

    // Imprimir los libros por pantalla
    printBooks(booksContainer, response.favorites, true);

    // Añadir el pie de página
    Footer();
};

// Función que añade un libro a favoritos del usuario
export const removeFavorite = async (idBook) => {
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
    const res = await fetch(`http://localhost:3000/api/v1/users/delete-favorite/${localStorage.getItem("userId")}`, options);
    //console.log(res);
    // Pasar a JSON el resultado de la respuesta
    const response = await res.json();

    console.log(response);

    // Volver a cargar la página
    Favorites();
}