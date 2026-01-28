import "./style.css";
import products from "./products.mjs";

const cart = [];

const currency = [{ name: "Caps", img: "./img/caps.webp" }];

let filteredProducts = Array.from(products);
const productsListing = document.querySelector("#products");

const drinkFilterBtn = document.querySelector("#drinkFilterBtn");
const chemsFilterBtn = document.querySelector("#chemsFilterBtn");
const foodFilterBtn = document.querySelector("#foodFilterBtn");
const showAllFilterBtn = document.querySelector("#showAllFilterBtn");

drinkFilterBtn.addEventListener("click", filterDrinks);
chemsFilterBtn.addEventListener("click", filterChems);
foodFilterBtn.addEventListener("click", filterFood);
showAllFilterBtn.addEventListener("click", showAllProducts);

const sortByNameBtn = document.querySelector("#sortByNameBtn");
sortByNameBtn.addEventListener("click", sortByName);

const sortByPriceBtn = document.querySelector("#sortByPriceBtn");
sortByPriceBtn.addEventListener("click", sortByPrice);

const sortByLowPriceBtn = document.querySelector("#sortByLowPriceBtn");
sortByLowPriceBtn.addEventListener("click", sortByLowPrice);

function sortByLowPrice() {
  filteredProducts.sort(
    (product1, product2) => product1.price - product2.price,
  );
  printProducts();
}

function sortByPrice() {
  filteredProducts.sort(
    (product1, product2) => product2.price - product1.price,
  );
  printProducts();
}

function sortByName() {
  filteredProducts.sort((product1, product2) => {
    const product1Name = product1.name.toUpperCase();
    const product2Name = product2.name.toUpperCase();
    if (product1Name < product2Name) {
      return -1;
    }
    if (product1Name > product2Name) {
      return 1;
    }
    return 0;
  });

  printProducts();
}

function showAllProducts() {
  filteredProducts = Array.from(products);
  printProducts();
}

function filterFood() {
  filteredProducts = products.filter((product) => product.category === "Food");
  printProducts();
}

function filterChems() {
  filteredProducts = products.filter((product) => product.category === "Chems");
  printProducts();
}

function filterDrinks() {
  filteredProducts = products.filter(
    (product) => product.category === "Drinks",
  );
  printProducts();
}

function printProducts() {
  productsListing.innerHTML = "";

  let html = "";

  for (let i = 0; i < filteredProducts.length; i++) {
    const currentProduct = filteredProducts[i];

    html += `
     <article>
      <h2>${currentProduct.name}</h2>
      <div class="metadata">
        <p>Pris: ${currentProduct.price} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}"> ${currency[0].name} </p>
        <p>Betyg: ${currentProduct.rating} / 5</p>
        </div>
        <p> ID: ${currentProduct.id} </p>
        <p>Kategori: ${currentProduct.category}</p>
        <button class="decrease" data-id="${currentProduct.id}">-</button>
        <input type="number" class="amount-bar" id="amount-${currentProduct.id}" disabled>
        <button class="increase" data-id="${currentProduct.id}">+</button>
        <button class="buy" data-id="${currentProduct.id}"> Add to cart </button>
        <img class="product-image" src="${currentProduct.img}" loading="lazy" alt="${currentProduct.name}" />
    </article>
  `;
  }

  productsListing.innerHTML = html;

  const buyButtons = document.querySelectorAll("#products button.buy");
  buyButtons.forEach((btn) => {
    btn.addEventListener("click", addProductToCart);
  });

  const increaseButtons = document.querySelectorAll(
    "#products button.increase",
  );
  increaseButtons.forEach((btn) => {
    btn.addEventListener("click", increaseProductCount);
  });

  const decreaseButton = document.querySelectorAll("#products button.decrease");
  decreaseButton.forEach((btn) => {
    btn.addEventListener("click", decreaseProductCount);
  });
}

function increaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value = Number(input.value) + 1;
}

function decreaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);

  let amount = Number(input.value) - 1;
  if (amount < 0) {
    amount = 0;
  }

  input.value = amount;
}

function addProductToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id);

  const product = products.find((product) => product.id === clickedBtnId);

  if (product === undefined) {
    return;
  }

  const inputField = document.querySelector(`#amount-${clickedBtnId}`);
  let amount = Number(inputField.value);
  if (amount < 1) {
    return;
  }

  inputField.value = 1;

  const index = cart.findIndex((product) => product.id === clickedBtnId);
  if (index === -1) {
    product.amount = amount;
    cart.push(product);
  } else {
    product.amount += amount;
  }

  updateCartTotals();

  printCart();
}

const cartTotalEl = document.querySelector("#cartTotal");
function updateCartTotals() {
  let cartTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    cartTotal += productSum;
  }

  cartTotalEl.innerHTML = `${cartTotal} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}">`;

  highlightCartTotalChange();
}

function highlightCartTotalChange() {
  cartTotalEl.classList.add("highlight-price");

  const SECONDS_IN_MS = 1000;
  const SECONDS = 1;
  setTimeout(removeCartTotalHighlight, SECONDS_IN_MS * SECONDS);
}

function removeCartTotalHighlight() {
  cartTotalEl.classList.remove("highlight-price");
}

const cartSection = document.querySelector("#cart");
function printCart() {
  cartSection.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    cartSection.innerHTML += `
    <article class="cart-container">
    <div class="cart-product-name">
      ${cart[i].name}:
    </div>
      ${cart[i].amount}
      <button data-id="${cart[i].id}" class="decrease-cart-product">-</button>
      <button data-id="${cart[i].id}" class="increase-cart-product">+</button>
      <button data-id="${i}" class="delete-product">Remove</button>
    </article>
    `;
  }

  const deleteButtons = document.querySelectorAll("button.delete-product");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", deleteProductFromCart);
  });

  const cartDecreaseButtons = document.querySelectorAll(
    "button.decrease-cart-product",
  );
  cartDecreaseButtons.forEach((btn) => {
    btn.addEventListener("click", decreaseProductFromCart);
  });

  const cartIncreaseButtons = document.querySelectorAll(
    "button.increase-cart-product",
  );
  cartIncreaseButtons.forEach((btn) => {
    btn.addEventListener("click", increaseProductFromCart);
  });
}

function decreaseProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);
  const product = cart.find((product) => product.id === rowId);

  if (product.amount <= 0) {
    return;
  }
  product.amount -= 1;

  printCart();
  updateCartTotals();
}

function increaseProductFromCart(e) {
  const clickedBtnId = Number(e.target.dataset.id);
  const product = cart.find((product) => product.id === clickedBtnId);

  if (product.amount <= 0) {
    return;
  }
  product.amount += 1;

  printCart();
  updateCartTotals();
}

function deleteProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);

  cart.splice(rowId, 1);

  printCart();
  updateCartTotals();
}

printProducts();

const firstNameRegEx = /^(?=.{2,}$)[A-Za-z]+(?:[.-][A-Za-z]+)*$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegEx = /^\+?[0-9][0-9\s().-]{6,14}[0-9]$/;

const orderBtn = document.querySelector("#orderBtn");
const firstName = document.querySelector("#firstname");
const emailField = document.querySelector("#email");
const phoneField = document.querySelector("#phone");

firstName.addEventListener("focusout", validateFirstNameField);
emailField.addEventListener("focusout", validateEmailField);
phoneField.addEventListener("focusout", validatePhoneField);

function validateFirstNameField() {
  const inputFieldValue = firstName.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidFirstName = firstNameRegEx.test(inputFieldValue);

  if (isValidFirstName) {
    firstName.nextElementSibling.classList.add("hidden");
  } else {
    firstName.nextElementSibling.classList.remove("hidden");
  }

  return isValidFirstName;
}

function validateEmailField() {
  const inputFieldValue = emailField.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidEmail = emailRegEx.test(inputFieldValue);

  if (isValidEmail) {
    emailField.nextElementSibling.classList.add("hidden");
  } else {
    emailField.nextElementSibling.classList.remove("hidden");
  }

  return isValidEmail;
}

function validatePhoneField() {
  const inputFieldValue = phoneRegEx.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidPhone = phoneRegEx.test(inputFieldValue);

  if (isValidPhone) {
    phoneField.nextElementSibling.classList.add("hidden");
  } else {
    phoneField.nextElementSibling.classList.remove("hidden");
  }

  return isValidPhone;
}
