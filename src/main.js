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
        <input type="number" id="amount-${currentProduct.id}" disabled>
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
}
function increaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value = Number(input.value) + 1;
}

const decreaseButtons = document.querySelectorAll("#products button.decrease");
decreaseButtons.forEach((btn) => {
  btn.addEventListener("click", decreaseProductCount);
});
function decreaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value -= 1;
}

function addProductToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id);

  const product = products.find((product) => product.id === clickedBtnId);

  if (product === undefined) {
    return;
  }

  const index = cart.findIndex((product) => product.id === clickedBtnId);
  if (index === -1) {
    product.amount = 1;
    cart.push(product);
  } else {
    product.amount += 1;
  }

  console.log(cart);

  printCart();
}

const cartSection = document.querySelector("#cart");
function printCart() {
  cartSection.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    cartSection.innerHTML += `
      <p>${cart[i].name}: ${cart[i].amount}</p>
    `;
  }
}

printProducts();
