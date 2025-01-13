let currentIndex = 0;
const visibleItemsCount = 3;
let currentFoodPrice = 0;
let currentQuantity = 1;

async function fetchFoodData() {
  try {
    const response = await fetch("food.json");
    const foodData = await response.json();

    console.log("Food data fetched:", foodData); // Debugging to check if the data is fetched
    const initialCategory = "Lunch";
    renderFoodCarousel(foodData.categories[initialCategory]);
    updateHeroImage(foodData.categories[initialCategory][0]);
    setupArrowNavigation(foodData.categories[initialCategory]);
  } catch (error) {
    console.log("Error fetching food data:", error); // Debugging to catch errors
  }
}

function renderFoodCarousel(foods) {
  const foodItemContainer = document.querySelector(".food-items");
  foodItemContainer.innerHTML = "";
  foods.forEach((food, index) => {
    const foodItem = document.createElement("div");
    foodItem.classList.add("food-item");
    if (index === 0) {
      foodItem.classList.add("selected");
    }
    foodItem.innerHTML = `
        <img src="${food.image}" alt="${
      food.name
    }"> <!-- Fixed src attribute -->
        <p>
            ${food.name} <br>
            <span class="item-price"><span class="value">$</span>${food.price.toFixed(
              2
            )}</span>
        </p>
        `;
    if (index >= visibleItemsCount) {
      foodItem.style.display = "none";
    }
    foodItem.addEventListener("click", () => {
      selectFoodItem(food, foodItem);
      currentIndex = index;
    });
    foodItemContainer.appendChild(foodItem);
  });
}

function updateTotalPrice() {
  const totalPriceElement = document.querySelector(".order-info-total .price");
  const total = currentFoodPrice * currentQuantity;
  totalPriceElement.textContent = `$ ${total.toFixed(2)}`;
}

document.getElementById("increase").addEventListener("click", () => {
  updateQuantity(currentQuantity + 1);
});
document.getElementById("decrease").addEventListener("click", () => {
  if (currentQuantity > 1) {
    updateQuantity(currentQuantity - 1);
  }
});

function updateQuantity(newQuantity) {
  currentQuantity = newQuantity;
  document.querySelector(".quantity").textContent = currentQuantity;
  updateTotalPrice();
}

function selectFoodItem(selectedFood, selectedElement) {
  updateHeroImage(selectedFood);
  currentFoodPrice = selectedFood.price;
  currentQuantity = 1;
  updateQuantity(currentQuantity);

  const allFoodItems = document.querySelectorAll(".food-item");
  allFoodItems.forEach((item) => item.classList.remove("selected"));
  selectedElement.classList.add("selected");
}

function updateHeroImage(food) {
  const heroImage = document.querySelector(".hero-main-image");
  const foodTitle = document.querySelector(".food-title p:first-of-type");
  const foodRating = document.querySelector(".food-title p:last-of-type");
  const prepareTime = document.querySelector(".prepare-time");

  heroImage.src = food.image;
  foodTitle.textContent = food.name;
  foodRating.innerHTML = `<i class="fa-solid fa-star"></i>${food.rating}`;
  prepareTime.innerHTML = `<i class="fa-regular fa-star"></i>${food.prepareTime}`;
}

function updateVisibleItems(foods) {
  const foodItems = document.querySelectorAll(".food-item");

  foodItems.forEach((item, index) => {
    if (index >= currentIndex && index < currentIndex + visibleItemsCount) {
      item.style.display = "block"; // Show item
    } else {
      item.style.display = "none"; // Hide item
    }
  });
}

function setupArrowNavigation(foods) {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = foods.length - visibleItemsCount;
    }
    updateVisibleItems(foods);
  });

  rightArrow.addEventListener("click", () => {
    if (currentIndex < foods.length - visibleItemsCount) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateVisibleItems(foods);
  });
}

function addToCart(selectedFood) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex(
    (item) => item.name === selectedFood.name
  );
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += currentQuantity; // Fixed typo: 'quntity' -> 'quantity'
  } else {
    cart.push({
      name: selectedFood.name,
      price: selectedFood.price,
      image: selectedFood.image,
      quantity: currentQuantity,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(); // Fixed function call
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalUniqueItems = cart.length; // Fixed 'card.length' to 'cart.length'
  document.getElementById("cart-badge").textContent = totalUniqueItems;
}

document.querySelector(".add-to-cart").addEventListener("click", () => {
  const selectedFood = {
    name: document.querySelector(".food-title p:first-of-type").textContent,
    price: currentFoodPrice,
    image: document.querySelector(".hero-main-image").src,
  };
  addToCart(selectedFood);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchFoodData();
  updateCartBadge(); // Ensure the cart badge is updated on page load
});
