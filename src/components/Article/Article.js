import { addFavorite, formatTitle, getStars, sendScore } from "../../utils/functions";
import "./Article.css";

export const Article = (book, favorites) => {
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
    
    // Crear sistema de valoración de libros.
    // Llamar a la función para obtener las estrellas
    const stars = getStars(book.rating);
    // Añadir dataset id con el id del libro al la lista de estrellas.
    stars.dataset.id = book._id;        
    // Añadir evento de clic a cada estrella utilizando un bucle for
    const starsChildNodes = stars.querySelectorAll('.star');
    for (let i = 0; i < starsChildNodes.length; i++) {
        const star = starsChildNodes[i];
        star.addEventListener('click', () => {
            console.log("Estoy haciendo click aquí");
            const id = stars.getAttribute('data-id');
            const rating = parseInt(star.getAttribute('data-rating'));
            // Enviar la valoración del libro
            sendScore(id, rating);  
        });             
    }    
    // Final estrellas

    const price = document.createElement("p");
    // Convertir el número a String
    const strNumber = `${book.price.toFixed(2)} €`; 
    // Reemplazar el punto decimal por coma y poner . separador de miles
    const formattedNumber = strNumber.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Poner el precio del libro
    price.textContent = formattedNumber;
    
    // Comprobar si el usuario ha hecho login
    if(localStorage.getItem("userId") && !favorites) {
        // Crear el elemento HTML para la imagen del like
        const pushLike = document.createElement("img");
        // Crear array con el contenido de los favoritos del usuario
        const arrayFavorites = localStorage.getItem("favorites").split(",");
        if(arrayFavorites){
            const found = arrayFavorites.find(item => item === book._id);
            if(found) {
                pushLike.src = "./assets/img/like.png";
            }else{
                pushLike.src = "./assets/img/get-like.png";
                pushLike.addEventListener("click", () => addFavorite(book._id));
            }
        }else{
            pushLike.src = "./assets/img/get-like.png";
            pushLike.classList.add("push-like-img");
            pushLike.addEventListener("click", () => addFavorite(book._id));
        }
        pushLike.classList.add("push-like-img");
        card.append(pushLike);
    }
    // Inyectar elementos en el nodo padre
    card.append(coverContainer, title, stars, publishedDate, price);

    // Devolver el article    
    return card;
}