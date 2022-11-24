fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.table (data);
    getproducts(data);

  })
  .catch((error) => {
    console.log("erreur lors du chargement");
  });
  
function getproducts(index) {
    let zoneArticle = document.querySelector("#items");
   // zoneArticle.innerHTML = ""//
    for (product of index) {
      let link = document.createElement("a");
      zoneArticle.appendChild(link);
      link.href = `./product.html?id=${product._id}`;

      let article = document.createElement("article");
      link.appendChild(article);

      let img = document.createElement("img");
      article.appendChild(img);
      img.src=product.imageUrl;
      img.alt=product.altTxt;

      let h3 = document.createElement("h3");      
      article.appendChild(h3);
      h3.textContent = product.name;

      let p = document.createElement("p");
      article.appendChild (p);
      p.classList.add("productDescription");
      p.textContent = product.description;
      
      console.log("affichae produit")
    
  };
};
