/*Récupération des données de l'APi*/
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.table (data);
    getproducts(data);

  })
  .catch((error) => {
    console.log("erreur lors du chargement");
  });
  /*Création d'une fonction pour récupérer les informations du HTML*/
function getproducts(index) {
  /*Création d'une boucle pour afficher les données*/
    let zoneArticle = document.querySelector("#items");
    for (product of index) {
  /* Création du lieb vers la page produit */
      let link = document.createElement("a");
      zoneArticle.appendChild(link);
      link.href = `./product.html?id=${product._id}`;
/* Création de l'article*/
      let article = document.createElement("article");
      link.appendChild(article);
/*Création de l'image*/
      let img = document.createElement("img");
      article.appendChild(img);
      img.src=product.imageUrl;
      img.alt=product.altTxt;
/*Création du nom du produit*/
      let h3 = document.createElement("h3");      
      article.appendChild(h3);
      h3.textContent = product.name;
/*Création de la description*/
      let p = document.createElement("p");
      article.appendChild (p);
      p.classList.add("productDescription");
      p.textContent = product.description;
/*Affichage du messae de confirmation*/
      console.log("affichage produit")
    
  };
};
