import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  if (localStorage.getItem('so-cart') !== null) { 
    const cartItems = getLocalStorage('so-cart');
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const total = getCartTotal(cartItems);
    const cartTotalHTML = cartTotalTemplate(total);
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelector('section.products').insertAdjacentHTML('beforeend', cartTotalHTML);
    }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function getCartTotal(cartItems) {

  let total = 0;
  cartItems.forEach((item)=>{
    total += item.FinalPrice;
  })
  return total;
}

function cartTotalTemplate(total) {
  return `<div> Your total is going to be: ${total} </div>`
}

renderCartContents();
