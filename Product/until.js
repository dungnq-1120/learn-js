function $(id) {
  return document.getElementById(id);
}

function getCartLocal() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCartLocal(data) {
  return localStorage.setItem("cart", JSON.stringify(data));
}
