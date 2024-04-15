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
    const price = document.createElement("p");
    price.textContent = `${book.price.toFixed(2)} €`;              
    
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
    card.append(coverContainer, title, publishedDate, price);

    // Devolver el article    
    return card;
}

// Función que formatea el título del libro
const formatTitle = (title) => {
    if(title.length > 20) {
        return title.slice(0, 18) + "..."
    }else{
        return title;
    }
}

// Función que añade un libro a favoritos del usuario
const addFavorite = async (idBook) => {
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

    // Llamar a la API con el id de usuario
    await fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`, options);    

    // Recargar la página
    location.reload();
}