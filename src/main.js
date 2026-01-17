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
    rating: 2,
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

const DrinkFilterBtn = document.querySelector("#DrinkFilterBtn");
DrinkFilterBtn.addEventListener("click", filterDrinks);

function filterDrinks() {
  const result = products.filter((product) => product.category == "Drinks");
  console.log(result);
}

console.log(products);

const productsListing = document.querySelector("#products");

for (let i = 0; i < products.length; i++) {
  const currentProduct = products[i];

  const html = `
    <article>
    <h2>${currentProduct.name}</h2>
    <div class="metadata">
        <p>Pris: ${currentProduct.price} <img class="currency-icon" src="${currency[0].img}" alt="${currency[0].name}"></p>
        <p>Betyg: ${currentProduct.rating} / 5</p>
      </div>
      <p>Kategori: ${currentProduct.category}</p>
      <img class="product-image" src="${currentProduct.img}" alt="${currentProduct.name}" />
    </article>
  `;

  productsListing.innerHTML += html;
}
