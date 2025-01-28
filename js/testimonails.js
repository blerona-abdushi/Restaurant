document.addEventListener("DOMContentLoaded", () => {
    const leftArrow = document.querySelector(".left-arrow-testimonial");
    const rightArrow = document.querySelector(".right-arrow-testimonial");
    const dotsContainer = document.querySelector(".carousel-indicators");

    let currentIndex = 0;
    let testimonialsData = [];

    // Fetching testimonials data
    fetch("js/testimonials.json")
        .then((response) => response.json())
        .then((data) => {
            testimonialsData = data;
            createDots(testimonialsData.length); // Pass the number of testimonials
            updateTestimonials(testimonialsData, currentIndex); // Initialize the first view
        })
        .catch((error) => console.error("Error fetching testimonials:", error));

    // Function to create dots
    function createDots(numDots) {
        dotsContainer.innerHTML = "";

        for (let i = 0; i < numDots; i++) { // Corrected loop condition
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) {
                dot.classList.add("active");
            }
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateTestimonials(testimonialsData, currentIndex);
                updateDots(currentIndex);
            });
        });
    }

    // Function to update testimonials based on the current index
    function updateTestimonials(testimonials, index) {
        const cardElements = [
            {
                container: document.querySelector(".testimonial-card-first"),
                data: testimonials[index % testimonials.length],
            },
            {
                container: document.querySelector(".testimonial-card-middle"),
                data: testimonials[(index + 1) % testimonials.length],
            },
            {
                container: document.querySelector(".testimonial-card-third"),
                data: testimonials[(index + 2) % testimonials.length],
            },
        ];

        cardElements.forEach((card) => {
            const { container, data } = card;
            container.querySelector(".testimonial-image img").src = data.image;
            container.querySelector(".testimonial-name").textContent = data.name;
            container.querySelector(".testimonial-role").textContent = data.role;
            container.querySelector(".testimonial-text").textContent = data.text;
        });
    }

    // Event listener for the left arrow
    leftArrow.addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : testimonialsData.length - 1;
        updateTestimonials(testimonialsData, currentIndex);
        updateDots(currentIndex);
    });

    // Event listener for the right arrow
    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        updateTestimonials(testimonialsData, currentIndex);
        updateDots(currentIndex);
    });

    // Function to update the active dot
    function updateDots(index) {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }
});
