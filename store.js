if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

function ready() {
	let buttons = document.getElementsByClassName("btn btn-danger");
	for (let i = 0; i < buttons.length; i++) {
		let button = buttons[i];
		button.addEventListener("click", removeCartItem);
	}
	let quantityInputs = document.getElementsByClassName("cart-quantity-input");
	for (let i = 0; i < quantityInputs.length; i++) {
		let quantityInput = quantityInputs[i];
		quantityInput.addEventListener("change", quantityChange);
	}
	let addToCartButtons = document.getElementsByClassName("shop-item-button");
	for (let i = 0; i < addToCartButtons.length; i++) {
		let addToCartButton = addToCartButtons[i];
		addToCartButton.addEventListener("click", addToCartClicked);
	}

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClick);
}

function purchaseClick(e)
{
    alert("感謝您的購買");
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();
}

function addToCartClicked(e) {
	let button = e.target;
	let shopItem = button.parentElement.parentElement;
	let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
	let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
	let imagesrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
	additemToCart(title, price, imagesrc);
	updateTotal();
}

function additemToCart(title, price, imagesrc) {
	let cartRow = document.createElement("div");
	cartRow.classList.add("cart-row");
	let cartitems = document.getElementsByClassName("cart-items")[0];
	let cartItemstile = document.getElementsByClassName("cart-item-title");
	for (let i = 0; i < cartItemstile.length; i++) {
		if (cartItemstile[i].innerText == title) {
			alert("你已經加入到購物車了");
            return;
		}
		
	}
	let cartRowContent = `<div class="cart-item cart-column">
        <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
	cartRow.innerHTML = cartRowContent;
	cartitems.append(cartRow);
	let button = cartRow.getElementsByClassName("btn btn-danger")[0];
	button.addEventListener("click", removeCartItem);
	let quantity = cartRow.getElementsByClassName("cart-quantity-input")[0];
	quantity.addEventListener("change", quantityChange);
}

function removeCartItem(e) {
	let buttonClicked = e.target;
	buttonClicked.parentElement.parentElement.remove();
	updateTotal();
}

function quantityChange(e) {
	let quantity = e.target;
	if (isNaN(quantity.value) || quantity.value < 0) {
		quantity.value = 1;
	}
	updateTotal();
}

function updateTotal() {
	let cartItemsContainer = document.getElementsByClassName("cart-items")[0];
	let cartRows = cartItemsContainer.getElementsByClassName("cart-row");
	let total = 0;
	for (let i = 0; i < cartRows.length; i++) {
		let cartrow = cartRows[i];
		let priceElement = cartrow.getElementsByClassName(
			"cart-price cart-column"
		)[0];
		let quantityElement = cartrow.getElementsByClassName(
			"cart-quantity-input"
		)[0];
		console.log(priceElement);
		console.log(quantityElement);

		let price = parseFloat(priceElement.innerText.replace("$", ""));
		let quantity = quantityElement.value;
		total += price * quantity;
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("cart-total-price")[0].innerText = total;
}
