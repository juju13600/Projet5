/*Récupération de l'URL de l'Id*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
/*Réupération de l'article de l'API*/
fetch("http://localhost:3000/api/products/"+id)
    .then((response) => response.json())
    .then((res) => { 
      detailProduct(res);
      console.log("chargement")
    })
    .catch((error) => {
      console.log("erreur lors du chargement");
    });
/*Ajout de l'image*/
const addImage = (imageUrl, altTxt) => {
    const itemImg = document.querySelector(".item__img")
    const image = document.createElement("img")
    itemImg.appendChild(image)
    image.src = imageUrl
    image.alt = altTxt
}
/*Ajout du titre*/
const addTitle = (name) => {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}
/*Ajout du prix*/
const addPrice = (price) => {
    const span = document.querySelector("#price")
    span.textContent = price
}
/*Ajout de la description*/
const addDescription = (description) =>{
    const p = document.querySelector("#description")
    p.textContent = description
}
/*Ajout du choix des couleurs*/
const addColors = (colors) => {
    const colorsChoice = document.querySelector("#colors")
    if (colorsChoice != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            colorsChoice.appendChild(option)
        })
    }
}
/*Répartion des données de l'API dans le DOM */
const detailProduct = (product) => {
  const { altTxt, colors, description, imageUrl, name, price } = product
  itemPrice = price
  imgUrl = imageUrl
  altText = altTxt
  articleName = name
  addImage(imageUrl, altTxt)
  addTitle(name)
  addPrice(price)
  addDescription(description)
  addColors(colors)
}
/*Vérification de la couleur et de la quantité en cas d'erreur*/
function fail(color, quantity) {
    if (color === "" ) {
        alert("Choisissez une couleur SVP")
        return true
    } 
    if (quantity == 0 || quantity > 100 ) {
        alert("Saisissez une quantitée inférieur à 100")
        return true
    } 
  }
  /*Gestion des évènements sur le bouton panier*/
  const button = document.querySelector("#addToCart")
  const addClick = () => {
      const color = document.querySelector("#colors").value
      const quantity = document.querySelector("#quantity").value
      
      if (fail(color, quantity)) return
      saveProduct(color, quantity)
      confirmation()
  }
  button.addEventListener("click", addClick)
  /*Sauvegarde dans le local Storage*/
  const saveProduct = (color, quantity) => {
    const key = `${id}-${color}`
    const data = {
        id: key,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(key, JSON.stringify(data))
}
/*Envoie vers la page du panier*/
const confirmation = () => {
    window.location.href = "cart.html"
}

