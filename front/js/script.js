fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((product) => {
    console.table(product);
    getproducts(product);
  })
  .catch((error) => {
    console.log("erreur lors du chargement");
  });

  function getproducts(index) {
    let zoneArticle = document.querySelector("#items");
    for (let article of index) {
      zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
    }
  }