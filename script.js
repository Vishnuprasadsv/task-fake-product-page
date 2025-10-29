const cartCount = document.getElementById('cartCount');
const productImage = document.getElementById('productImage');
const cartIcon = document.getElementById('cartIcon');
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const product2 = document.getElementById('product2');
const product3 = document.getElementById('product3');
const product4 = document.getElementById('product4');

let cart = [];


const productUi = (productsData) => {
    productImage.src = productsData.image;
    productName.textContent = productsData.title;
    productPrice.textContent = `$ ${productsData.price}..`;
    productDescription.textContent = productsData.description;

}

const productDetailsApi =async(id) => {
    let response = await fetch('https://fakestoreapi.com/products/2');
    let productData = await response.json();
    productUi(productData);
    
    addToCartBtn.addEventListener("click", () => addToCart(productData));
}
        let urlparameters=new URLSearchParams(window.location.search);
        let id=urlparameters.get("id");

productDetailsApi(id)

function addToCart(product) {
  cart.push(product);
  updateCartUI();
}
function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <p class="m-0">${item.title}</p>
        <small>$${item.price}</small>
      </div>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

cartIcon.addEventListener("click", () => {
  cartPanel.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.querySelector(".cart-total button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      cartPanel.classList.remove("active");
      cart = [];
      updateCartUI();
      alert("Proceeding to checkout...");
    });
  }
});
