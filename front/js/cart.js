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
/*Ajout de la quantité totale*/
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

/*Ajout du prix total*/
function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}
/*Ajout de l'option de suppression*/
function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}
/* Option de suppression d'un produit*/
function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)  
    deleteArticleFromPage(item)    
}
/*Supression d'un produit de la page*/
function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}
/*Actualisation prix et quantité*/
function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}
/*Option de suppression produit du localstorage*/
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}
/*Stockage des données dans le localStorage*/
function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = item.id
    localStorage.setItem(key, dataToSave)

}
/*Création du formulaire de commande*/
function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Choisissez un article SVP")
        return
    }
  
    if (isFormInvalid()) return
    if (isFirstNameInvalid()) return
    if (isLastNameInvalid()) return
    if (isAddressInvalid()) return
    if (isCityInvalid()) return
    if (isEmailInvalid()) return
  
    const body = makeRequestBody()
  /* Envoie des données avec POST*/
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => console.error(err))
  }
  /*Vérification du prénom*/
  function isFirstNameInvalid() {
  const email = document.querySelector("#firstName").value
  const regex = /^[a-zA-Z ,.'-]+$/
  if (regex.test(email) === false) {
      alert("Saisir un prénom valide SVP")
      return true
  }
  return false
  }
  /*Vérification du nom*/
  function isLastNameInvalid() {
  const email = document.querySelector("#lastName").value
  const regex = /^[a-zA-Z ,.'-]+$/
  if (regex.test(email) === false) {
      alert("Saisir un nom valide SVP ")
      return true
  }
  return false
  }
  /* Vérification de l'adresse*/
  function isAddressInvalid() {
  const email = document.querySelector("#address").value
  const regex = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
  if (regex.test(email) === false) {
      alert("Saisir une adresse valide SVP")
      return true
  }
  return false
  }
  /*Vérification de la ville*/
  function isCityInvalid() {
  const email = document.querySelector("#city").value
  const regex = /^[a-zA-Z ,.'-]+$/
  if (regex.test(email) === false) {
      alert("Saisir une ville valide SVP")
      return true
  }
  return false
  }
  /*Vérifiction de l'adresse mail*/
  function isEmailInvalid() {
  const email = document.querySelector("#email").value
  const regex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
  if (regex.test(email) === false) {
      alert("Saisir une adresse mail valide SVP")
      return true
  }
  return false
  }
  /*Validation du formulaire et confimation formulaire*/
  function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
      if (input.value === "") {
          alert("Remplissez tous les champs SVP")
          return true
      }
      return false
  })
  }
 