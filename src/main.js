import "./style.css";

const clickMeBtn = document.querySelector("#clickMe");
clickMeBtn.addEventListener("click", helloWorld);

function helloWorld() {
  alert("Hej Världen!");
}

const nukacola = {
  name: "Nuka-Cola",
  price: 20,
  rating: 4.5,
  category: "Beverages",
  img: "./img/nukacola.webp",
};

const stimpak = {
  name: "Stimpak",
  price: 75,
  rating: 4.8,
  category: "Medical Supplies",
  img: "./img/stimpak.webp",
};

const jet = {
  name: "Jet",
  price: 20,
  rating: 2,
  category: "Chems",
  img: "./img/jet.webp",
};

const products = [nukacola, stimpak, jet];

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
