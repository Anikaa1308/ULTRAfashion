// 1. ADD TO CART FUNCTION
function addToCart(btn, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('ultraCart')) || [];
    
    // Check if item exists
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    localStorage.setItem('ultraCart', JSON.stringify(cart));
    updateCartCount();
    
    // CHANGE BUTTON TEXT & COLOR
    btn.innerText = "Go to Cart ➝";
    btn.style.backgroundColor = "#a67c52"; // Gold accent
    btn.onclick = function() {
        window.location.href = 'cart.html';
    };
}

// 2. UPDATE NAVBAR COUNT
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('ultraCart')) || [];
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    let countElem = document.getElementById('cart-count');
    if (countElem) {
        countElem.innerText = totalQty > 0 ? `(${totalQty})` : '';
    }
}

// 3. LOAD CART PAGE
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('ultraCart')) || [];
    let container = document.getElementById('cart-items-container');
    let totalElem = document.getElementById('cart-total');
    
    if (!container) return; 

    container.innerHTML = "";
    let grandTotal = 0;

    if (cart.length === 0) {
        container.innerHTML = "<tr><td colspan='6' style='text-align:center; padding:30px;'>Your cart is empty.</td></tr>";
        totalElem.innerText = "₹0";
        return;
    }

    cart.forEach((item, index) => {
        let total = item.price * item.qty;
        grandTotal += total;
        container.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="60" style="border-radius:5px;"></td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <button onclick="updateQty(${index}, -1)">-</button> 
                    ${item.qty} 
                    <button onclick="updateQty(${index}, 1)">+</button>
                </td>
                <td>₹${total}</td>
                <td><button onclick="removeItem(${index})" class="remove-btn">&times;</button></td>
            </tr>`;
    });
    totalElem.innerText = "₹" + grandTotal;
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('ultraCart'));
    if (cart[index].qty + change > 0) {
        cart[index].qty += change;
        localStorage.setItem('ultraCart', JSON.stringify(cart));
        loadCart(); updateCartCount();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('ultraCart'));
    cart.splice(index, 1);
    localStorage.setItem('ultraCart', JSON.stringify(cart));
    loadCart(); updateCartCount();
}

function checkout() {
    alert("Order Placed Successfully!");
    localStorage.removeItem('ultraCart');
    window.location.href = 'index.html';
}

window.onload = function() { updateCartCount(); loadCart(); };