// Reference: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON

// function for loading in the products in the JSON file
async function getProducts() {
  const response = await fetch("./products.json");
  const products_list = await response.json();

  return products_list.products; // products list
}

// References:
// https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Query
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#parsing_window.location
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden

// function for conditionally displaying selected product
async function showSelectedProduct() {
  const display = document.getElementById("product-content");

  // fetch specific ID from URL parameters
  const productID = new URLSearchParams(window.location.search).get("id");

  // search for product with matching ID
  const products_list = await getProducts();
  const selected = products_list.find((item) => item.id === productID);

  // insert product image into its slot
  document.getElementById("item-image").innerHTML += `<img
    class="item-img"
    src="${selected.image}"
    alt="${selected.name} (${selected.type})"
  />`;

  // insert product details into their elements
  document.getElementById("product-name").textContent = selected.name;
  document.getElementById("product-type").textContent = selected.type;
  document.getElementById("product-desc-text").textContent =
    selected.description;
  document.querySelector("#product-price").textContent =
    `$ ${selected.price} CAD`;

  // display relevant tags (unhide/keep hidden)
  document.getElementById("product-lim").hidden = !selected.limited;
  document.getElementById("divider-1").hidden = !selected.limited;
  document.getElementById("product-signed").hidden = !selected.signed;
  document.getElementById("divider-2").hidden = !selected.signed;

  // display full product details once all info is loaded in
  display.hidden = false;
}

showSelectedProduct();
