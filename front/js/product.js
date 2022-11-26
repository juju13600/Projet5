const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

fetch("http://localhost:3000/api/products/"+id)
    .then((response) => response.json())
    .then((res) => { 
      detailProduct(res);
      console.log("chargement")
    })
    .catch((error) => {
      console.log("erreur lors du chargement");
    });

const addImage = (imageUrl, altTxt) => {
    const itemImg = document.querySelector(".item__img")
    const image = document.createElement("img")
    itemImg.appendChild(image)
    image.src = imageUrl
    image.alt = altTxt
}
const addTitle = (name) => {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}
const addPrice = (price) => {
    const span = document.querySelector("#price")
    span.textContent = price
}
const addDescription = (description) =>{
    const p = document.querySelector("#description")
    p.textContent = description
}
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

const button = document.querySelector("#addToCart")
const addClick = () => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    
    if (fail(color, quantity)) return
    saveProduct(color, quantity)
    confirmation()
}
button.addEventListener("click", addClick)

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

const confirmation = () => {
    window.location.href = "cart.html"
}

