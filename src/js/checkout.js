import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout");
myCheckout.init();

document
  .querySelector("#zipn")
  .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector("#checkSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const siteForm = document.forms['checkout'];
  const status = siteForm.checkValidity();
  siteForm.reportValidity();
  if (status)
    myCheckout.checkout();
});

document.forms['checkout']
.addEventListener('submit', (e) => {
  e.preventDefault();
   myCheckout.checkout();
});