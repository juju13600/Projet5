removeAllCache()

/*Récupération du numéro de commande*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const orderId = urlParams.get("orderId")
/*Affichage du numéro*/
const showOrder = document.getElementById("orderId");
showOrder.textContent = orderId;
/*Supression de la commande dans le local storage*/
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}
