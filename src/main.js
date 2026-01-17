import "./style.css";

const clickMeBtn = document.querySelector("#clickMe");
clickMeBtn.addEventListener("click", helloWorld);

function helloWorld() {
  alert("Hej Världen!");
}

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
    rating: 4.8,
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
        <p>Pris: ${currentProduct.price} Caps</p>
        <p>Betyg: ${currentProduct.rating} / 5</p>
      </div>
      <p>Kategori: ${currentProduct.category}</p>
      <img src="${currentProduct.img}" alt="${currentProduct.name}" />
    </article>
  `;

  productsListing.innerHTML += html;
}
