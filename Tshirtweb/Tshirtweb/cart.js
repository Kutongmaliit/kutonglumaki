document.addEventListener("DOMContentLoaded", function () {
    const cartCounter = document.querySelector(".cart-counter");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close");
    const cartItemsList = document.getElementById("cart-items");

    let cartCount = 0;
    let cartContents = {}; 

    document.querySelectorAll(".add-to-cart").forEach(function (button) {
        button.addEventListener("click", function () {            
            cartCount++;
            cartCounter.textContent = cartCount;

            const product = button.parentElement;
            const productName = product.querySelector("h3").textContent;
            const productPrice = product.querySelector("span").textContent;

            if (cartContents[productName]) {
                cartContents[productName]++;
            } else {
                cartContents[productName] = 1;
            }

            updateCartModal();
        });
    });

    function updateCartModal() {
        cartItemsList.innerHTML = '';

        let totalPrice = 0;

        for (const [productName, quantity] of Object.entries(cartContents)) {
            const cartItem = document.createElement("li");
            const productPrice = parseFloat(document.querySelector(`h3:contains('${productName}')`).nextElementSibling.textContent.replace('₱', ''));
            const itemTotalPrice = productPrice * quantity;
            totalPrice += itemTotalPrice;

            cartItem.textContent = `@{productName} x@{quantity} - ₱${itemTotalPrice.toFixed(2)}`;
            cartItemsList.appendChild(cartItem);
        }

        // Display total price in the modal
        const totalElement = document.createElement("li");
        totalElement.textContent = `Total: ₱${totalPrice.toFixed(2)}`;
        totalElement.classList.add("total-price");
        cartItemsList.appendChild(totalElement);
    }

    // Event listener to display cart modal when cart icon is clicked
    document.querySelector(".cart").addEventListener("click", function () {
        cartModal.style.display = "block";
    });

    // Event listener to close cart modal when close button is clicked
    closeModal.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // Event listener to close cart modal when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
    });
});
