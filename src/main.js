import "./style.css";

const clickMeBtn = document.querySelector("#clickMe");
clickMeBtn.addEventListener("click", helloWorld);

function helloWorld() {
  alert("Hej Världen!");
}

const currency = [{ name: "Caps", img: "./img/caps.webp" }];

const products = [
  {
    name: "Nuka-Cola",
    price: 20,
    rating: 4.5,
    category: "Drinks",
    img: "./img/nukacola.webp",
  },

  {
    name: "Stimpak",
    price: 75,
    rating: 4.5,
    category: "Chems",
    img: "./img/stimpak.webp",
  },

  {
    name: "Jet",
    price: 20,
    rating: 1,
    category: "Chems",
    img: "./img/jet.webp",
  },

  {
    name: "YumYum Deviled Egg",
    price: 5,
    rating: 3.5,
    category: "Food",
    img: "./img/yumyumdeviledeggs.webp",
  },

  {
    name: "Purified Water",
    price: 20,
    rating: 5,
    category: "Drinks",
    img: "./img/purifiedwater.webp",
  },

  {
    name: "RadAway",
    price: 20,
    rating: 4,
    category: "Chems",
    img: "./img/radaway.webp",
  },

  {
    name: "Potato Crisps",
    price: 5,
    rating: 3,
    category: "Food",
    img: "./img/potatocrisps.webp",
  },

  {
    name: "Nuka-Cola Quartz",
    price: 40,
    rating: 5,
    category: "Drinks",
    img: "./img/nukacolaquartz.webp",
  },

  {
    name: "Buffalo Gourd Seed",
    price: 2,
    rating: 2,
    category: "Food",
    img: "./img/buffalogourdseed.webp",
  },

  {
    name: "Mentats",
    price: 20,
    rating: 5,
    category: "Chems",
    img: "./img/mentats.webp",
  },
];

let filteredProducts = Array.from(products);
const productsListing = document.querySelector("#products");

const DrinkFilterBtn = document.querySelector("#DrinkFilterBtn");
const ChemsFilterBtn = document.querySelector("#ChemsFilterBtn");
const FoodFilterBtn = document.querySelector("#FoodFilterBtn");
const showAllFilterBtn = document.querySelector("#showAllFilterBtn");

DrinkFilterBtn.addEventListener("click", filterDrinks);
ChemsFilterBtn.addEventListener("click", filterChems);
FoodFilterBtn.addEventListener("click", filterFood);
showAllFilterBtn.addEventListener("click", showAllProducts);

function showAllProducts() {
  filteredProducts = Array.from(products);
  printProducts();
}

function filterFood() {
  filteredProducts = products.filter((product) => product.category == "Food");
  printProducts();
}

function filterChems() {
  filteredProducts = products.filter((product) => product.category == "Chems");
  printProducts();
}

function filterDrinks() {
  filteredProducts = products.filter((product) => product.category == "Drinks");
  printProducts();
}

printProducts();

function printProducts() {
  productsListing.innerHTML = "";

  for (let i = 0; i < filteredProducts.length; i++) {
    const currentProduct = filteredProducts[i];

    const html = `
     <article>
      <h2>${currentProduct.name}</h2>
      <div class="metadata">
        <p>Pris: ${currentProduct.price} <img class="currency-icon" src="${currency[0].img}" alt="${currency[0].name}"> ${currency[0].name} </p>
        <p>Betyg: ${currentProduct.rating} / 5</p>
      </div>
      <p>Kategori: ${currentProduct.category}</p>
      <img class="product-image" src="${currentProduct.img}" alt="${currentProduct.name}" />
    </article>
  `;

    productsListing.innerHTML += html;
  }
}
