fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((product) => {
    console.table(product);
    getproducts(product);
  })
  .catch((error) => {
    console.log("erreur lors du chargement");
  });

