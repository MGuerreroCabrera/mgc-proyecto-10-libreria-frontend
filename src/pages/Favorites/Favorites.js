import "./Favorites.css";

import { Footer } from "../../components/Footer/Footer";
import { Main } from "../../components/Main/Main";
import { deleteOldMain } from "../../utils/functions";
import { printBooks, printUserDataContainer } from "../Home/Home";


export const Favorites = async () => {
    // Eliminar el anterior main en el caso de que exista
    deleteOldMain();

    // Crear el main de la home
    Main();    

    // Seleccionar el main
    const main = document.querySelector("main");

    printUserDataContainer();

    // Crear el contenedor de los libros
    const booksContainer = document.createElement("div");
    booksContainer.id = "books-container";

    // Inyectar el contenedor de libros al main
    main.append(booksContainer);

    // Hacer la petición al backend para que nos devuelva el listado de libros.
    const res = await fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`);

    // Pasar objeto res a json
    const response = await res.json();

    // Imprimir los libros por pantalla
    printBooks(booksContainer, response.favorites, true);

    // Añadir el pie de página
    Footer();
};