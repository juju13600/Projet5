/*Création d'un tableau des produits*/
const cart = []
retrieveItemsFromCache()

cart.forEach((item) => displayItem(item))
/*Création du bouton de validation*/
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))
/* Récupération contenu du localStorage*/
function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}
/*Répartition informations API dans le DOM*/
function displayItem(item) {
    const article = addArticle(item)
    const imageDiv = addImageDiv(item)
    article.appendChild(imageDiv)

    const cardItemContent = addCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}
/*Ajout de la div "article" */ 
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}
/*Ajout du contenu de l'article*/
function addArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
/*Ajout de l'image*/
function addImageDiv(item) {
const div = document.createElement("div")
div.classList.add("cart__item__img")
const image = document.createElement("img")
image.src = item.imageUrl
image.alt = item.altTxt
div.appendChild(image)
return div
}
/*Ajout de la div "cart__item__content"*/
function addCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = addDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}
/*Ajout de la description*/
function addDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color;
    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}
/*Ajout du settings*/
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}
/*Ajout dU produit*/
function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}
