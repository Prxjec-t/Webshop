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
        <p>Price: ${currentProduct.price} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}"> ${currency[0].name} </p>
        <p>Rating: ${currentProduct.rating} / 5</p>
        </div>
        <p> ID: ${currentProduct.id} </p>
        <p>Category: ${currentProduct.category}</p>
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
  if (amount < 0) {
    return;
  }

  inputField.value = 0;

  const index = cart.findIndex((product) => product.id === clickedBtnId);
  if (index === -1) {
    product.amount = amount;
    cart.push(product);
  } else {
    product.amount += amount;
  }

  if (amount > 0) {
    cartWrapper.classList.remove("hidden");
  }
  updateCartTotals();

  printCart();

  checkFormFieldsValidity();
}

// MARK: CART

const toggleCartBtn = document.querySelector("#toggleCartBtn");
const cartWrapper = document.querySelector("#cartWrapper");
const checkoutBtn = document.querySelector("#checkoutBtn");
const orderForm = document.querySelector("#orderForm");
const closeFormBtn = document.querySelector("#closeFormBtn");

closeFormBtn.addEventListener("click", () => {
  orderForm.classList.add("hidden");
});

checkoutBtn.addEventListener("click", () => {
  orderForm.classList.remove("hidden");
});

toggleCartBtn.addEventListener("click", () => {
  cartWrapper.classList.toggle("hidden");
});

cartWrapper.classList.add("hidden");

const cartTotalEl = document.querySelector("#cartTotal");

function updateCartTotals() {
  let cartTotal = 0;
  let totalCount = 0;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isWeekend =
    (day === 5 && hour >= 15) ||
    day === 6 ||
    day === 0 ||
    (day === 1 && hour < 3);

  const isMondayDiscount = day === 1 && hour < 10;

  for (let i = 0; i < cart.length; i++) {
    let currentPrice = cart[i].price;

    if (isWeekend) {
      currentPrice *= 1.15;
    }

    if (cart[i].amount >= 10) {
      currentPrice = currentPrice * 0.9;
    }

    const productSum = currentPrice * cart[i].amount;
    cartTotal += productSum;
    totalCount += cart[i].amount;
  }

  let shippingCost = 0;
  if (totalCount > 15) {
    shippingCost = 0;
  } else {
    shippingCost = 25 + cartTotal * 0.1;
  }

  let finalTotal = cartTotal + shippingCost;

  const discountMsg = document.querySelector("#mondayDiscountText");
  if (isMondayDiscount) {
    finalTotal *= 0.9;
    discountMsg.classList.remove("hidden");
  } else {
    discountMsg.classList.add("hidden");
  }

  const invoiceRadio = document.querySelector(
    'input[type="radio"][value="invoice"]',
  );
  const cardRadio = document.querySelector('input[type="radio"][value="card"]');

  if (finalTotal > 800) {
    invoiceRadio.disabled = true;

    if (invoiceRadio.checked) {
      cardRadio.checked = true;
      invoiceSection.classList.add("hidden");
      cardSection.classList.remove("hidden");
    }
  } else {
    invoiceRadio.disabled = false;
  }

  cartTotalEl.innerHTML = `${cartTotal.toFixed(2)} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}">`;

  document.querySelector("#shippingCost").innerHTML =
    `Shipping: ${shippingCost.toFixed(2)} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}">`;

  document.querySelector("#cartTotal").innerHTML =
    `${finalTotal.toFixed(2)} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}">`;

  // cartTotalEl.innerHTML = `${cartTotal} <img class="currency-icon" src="${currency[0].img}" loading="lazy" alt="${currency[0].name}">`;

  highlightCartTotalChange();
  checkFormFieldsValidity();
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

  product.amount -= 1;

  if (product.amount <= 0) {
    const productIndex = cart.indexOf(product);
    cart.splice(productIndex, 1);
  }

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

const resetCartBtn = document.querySelector("#resetCartBtn");
resetCartBtn.addEventListener("click", resetCart);

function resetCart() {
  cart.length = 0;

  updateCartTotals();
  printCart();
}

printProducts();

//MARK: VALIDATIONS

const nameRegEx = /^(?=.{2,}$)[A-Za-z]+(?:[.-][A-Za-z]+)*$/;
const adressRegEx = /^(?=.{2,}$)[A-Za-z]+(?:[.-][A-Za-z]+)*$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegEx = /^07[02369]\d{7}$/;
const postalCodeRegEx = /^[0-9]{5}$/;
const cityRegEx = /^(?=.{2,}$)[A-Za-z]+(?:[.-][A-Za-z]+)*$/;
const ssnRegex = /^(\d{6}|\d{8})[-]?\d{4}$/;

const orderBtn = document.querySelector("#orderBtn");
const clearFormBtn = document.querySelector("#clearFormBtn");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const adress = document.querySelector("#adress");
const postalCode = document.querySelector("#postalcode");
const city = document.querySelector("#city");
const emailField = document.querySelector("#email");
const phoneField = document.querySelector("#phone");
const ssnInput = document.querySelector("#ssn");
const cardPayment = document.querySelector('input[type="radio"].card');
const invoicePayment = document.querySelector('input[type="radio"].invoice');
const invoiceSection = document.querySelector("#invoicePayment");
const cardSection = document.querySelector("#cardPayment");
const invoiceRadio = document.querySelector('input[value="invoice"]');
const cardRadio = document.querySelector('input[value="card"]');
const gdprCheckbox = document.querySelector("#gdpr");
const cardNumberField = document.querySelector("#cardNumber");

firstName.addEventListener("focusout", validateFirstNameField);
lastName.addEventListener("focusout", validateLastNameField);
emailField.addEventListener("focusout", validateEmailField);
adress.addEventListener("focusout", validateAdressField);
postalCode.addEventListener("focusout", validatePostalCodeField);
city.addEventListener("focusout", validateCityField);
phoneField.addEventListener("focusout", validatePhoneField);
ssnInput.addEventListener("focusout", validateSSNField);

clearFormBtn.addEventListener("click", () => {
  orderForm.reset();
  cart.length = 0;
  document
    .querySelectorAll(".amount-bar")
    .forEach((input) => (input.value = 0));

  printCart();
  updateCartTotals();
  checkFormFieldsValidity();
});

function validateSSNField() {
  const isValid = ssnRegex.test(ssnInput.value);
  if (isValid || ssnInput.value === "") {
    ssnInput.nextElementSibling.classList.add("hidden");
  } else {
    ssnInput.nextElementSibling.classList.remove("hidden");
  }
  return isValid;
}

function validateFirstNameField() {
  const inputFieldValue = firstName.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidFirstName = nameRegEx.test(inputFieldValue);

  if (isValidFirstName) {
    firstName.nextElementSibling.classList.add("hidden");
  } else {
    firstName.nextElementSibling.classList.remove("hidden");
  }

  return isValidFirstName;
}

function validateLastNameField() {
  const inputFieldValue = lastName.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidLastName = nameRegEx.test(inputFieldValue);

  if (isValidLastName) {
    lastName.nextElementSibling.classList.add("hidden");
  } else {
    lastName.nextElementSibling.classList.remove("hidden");
  }

  return isValidLastName;
}

function validateAdressField() {
  const inputFieldValue = adress.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidAdress = adressRegEx.test(inputFieldValue);

  if (isValidAdress) {
    adress.nextElementSibling.classList.add("hidden");
  } else {
    adress.nextElementSibling.classList.remove("hidden");
  }

  return isValidAdress;
}

function validatePostalCodeField() {
  const inputFieldValue = postalCode.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidPostalCode = postalCodeRegEx.test(inputFieldValue);

  if (isValidPostalCode) {
    postalCode.nextElementSibling.classList.add("hidden");
  } else {
    postalCode.nextElementSibling.classList.remove("hidden");
  }

  return isValidPostalCode;
}

function validateCityField() {
  const inputFieldValue = city.value;

  if (inputFieldValue.length === 0) {
    return;
  }

  const isValidCity = cityRegEx.test(inputFieldValue);

  if (isValidCity) {
    city.nextElementSibling.classList.add("hidden");
  } else {
    city.nextElementSibling.classList.remove("hidden");
  }

  return isValidCity;
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
  const inputFieldValue = phoneField.value;

  if (inputFieldValue.length === 0) {
    phoneField.nextElementSibling.classList.add("hidden");
    return false;
  }

  const isValidPhone = phoneRegEx.test(inputFieldValue);

  if (isValidPhone) {
    phoneField.nextElementSibling.classList.add("hidden");
  } else {
    phoneField.nextElementSibling.classList.remove("hidden");
  }

  return isValidPhone;
}

orderBtn.addEventListener("click", (e) => {
  e.preventDefault();

  showSuccessNotification(
    "Thank you for your order! A confirmation has been sent.",
  );

  orderForm.classList.add("hidden");
  cartWrapper.classList.add("hidden");

  cart.length = 0;
  printCart();
  updateCartTotals();

  const form = document.querySelector("form");
  form.reset();

  formErrorSummary.classList.add("hidden");

  checkFormFieldsValidity();
});

function checkFormFieldsValidity() {
  const isFirstnameValid = nameRegEx.test(firstName.value);
  const isLastnameValid = nameRegEx.test(lastName.value);
  const isAdressValid = adressRegEx.test(adress.value);
  const isPostalCodeValid = postalCodeRegEx.test(postalCode.value);
  const isCityValid = cityRegEx.test(city.value);
  const isEmailValid = emailRegEx.test(emailField.value);
  const isPhoneValid = phoneRegEx.test(phoneField.value);
  const isCartNotEmpty = cart.length > 0;
  const isGdprChecked = gdprCheckbox.checked;
  const isSsnValid = ssnRegex.test(ssnInput.value);

  let isPaymentValid = false;

  if (invoiceRadio.checked) {
    isPaymentValid = isSsnValid;
  } else if (cardRadio.checked) {
    const cardNumber = document.querySelector("#cardNumber").value;
    isPaymentValid = cardNumber.length >= 12;
  }

  if (
    isFirstnameValid &&
    isLastnameValid &&
    isAdressValid &&
    isPostalCodeValid &&
    isCityValid &&
    isEmailValid &&
    isPhoneValid &&
    isCartNotEmpty &&
    isGdprChecked &&
    isPaymentValid
  ) {
    orderBtn.disabled = false;
  } else {
    orderBtn.disabled = true;
  }
}

const notificationToast = document.querySelector("#notification-toast");

function showSuccessNotification(message) {
  notificationToast.textContent = message;
  notificationToast.classList.remove("hidden");

  setTimeout(() => {
    notificationToast.classList.add("hidden");
  }, 4000);
}

firstName.addEventListener("input", checkFormFieldsValidity);
lastName.addEventListener("input", checkFormFieldsValidity);
adress.addEventListener("input", checkFormFieldsValidity);
postalCode.addEventListener("input", checkFormFieldsValidity);
city.addEventListener("input", checkFormFieldsValidity);
emailField.addEventListener("input", checkFormFieldsValidity);
phoneField.addEventListener("input", checkFormFieldsValidity);
ssnInput.addEventListener("input", checkFormFieldsValidity);
gdprCheckbox.addEventListener("change", checkFormFieldsValidity);
document.querySelectorAll("#cardPayment input").forEach((input) => {
  input.addEventListener("input", checkFormFieldsValidity);
});

checkFormFieldsValidity();

[cardRadio, invoiceRadio].forEach((radio) => {
  radio.addEventListener("change", () => {
    if (invoiceRadio.checked) {
      invoiceSection.classList.remove("hidden");
      cardSection.classList.add("hidden");
    }
    if (cardRadio.checked) {
      invoiceSection.classList.add("hidden");
      cardSection.classList.remove("hidden");
    }
    checkFormFieldsValidity();
  });
});

// MARK: DISCOUNTS

const SLOWNESS_TIMER_MINUTES = 15;
setTimeout(clearOrder, 1000 * 60 * SLOWNESS_TIMER_MINUTES);

function clearOrder() {
  cart.length = 0;

  printCart();
  updateCartTotals();

  if (orderForm) {
    orderForm.reset();
  }

  const msg = document.getElementById("statusMessage");
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 5000);
}

const date = new Date(2026, 0, 26, 9, 0);
console.log(date);

const MONDAY = 1;
if (date.getDay() === MONDAY && date.getHours() < 10) {
  console.log("it is monday before 10 o clokc");
}
