document.addEventListener("DOMContentLoaded", function () {

    const products = [
        // 🍹 Bars & Trailers
        { name: "BevBar (12ft Bar with Speakers)", category: "Bars & Trailers", img: "assets/images/main-bar.jpg" },
        { name: "BevBox (Mobile Tap Trailer)", category: "Bars & Trailers", img: "assets/images/bevbox.jpg" },
        { name: "4ft Folding Bar", category: "Bars & Trailers", img: "assets/images/folding-bar.jpg" },

        // ⛺ Tents
        { name: "20x30 West Coast Frame Tent", category: "Tents", img: "assets/images/20x30.jpg" },
        { name: "20x20 West Coast Frame Tent", category: "Tents", img: "assets/images/20x20.jpg" },
        { name: "10x20 Pop Up Tent", category: "Tents", img: "assets/images/10x20.jpg" },
        { name: "10x15 Pop Up Tent", category: "Tents", img: "assets/images/10x15.jpg" },
        { name: "Tent Sidewalls", category: "Tents", img: "assets/images/sidewalls.jpg" },

        // 🪑 Tables & Seating
        { name: "White Resin Chairs", category: "Tables & Chairs", img: "assets/images/chairs.jpg" },
        { name: "6ft Banquet Tables", category: "Tables & Chairs", img: "assets/images/6ft.jpg" },
        { name: '48" Round Tables', category: "Tables & Chairs", img: "assets/images/round.jpg" },
        { name: "32\" Cocktail Table", category: "Tables & Chairs", img: "assets/images/cocktail.jpg" },

        // 🍽️ Catering
        { name: "Chafing Dishes", category: "Catering Equipment", img: "assets/images/chafing.jpg" }
    ];

    const container = document.getElementById("products-container");

    let currentCategory = "";

    products.forEach(product => {

        // Create category header when category changes
        if (product.category !== currentCategory) {
            currentCategory = product.category;

            container.innerHTML += `
                <h2>${currentCategory}</h2>
                <div class="products-grid">
            `;
        }

        container.innerHTML += `
            <article class="product-card">
                <div class="product-image-container">
                    <img src="${product.img}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <h3>${product.name}</h3>

                    <a href="inquiry.html?item=${encodeURIComponent(product.name)}" 
                       class="quote-btn">
                        Request Quote
                    </a>
                </div>
                
            </article>
        `;
    });

});
document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".products-container");
    const viewToggle = document.getElementById("viewToggle");
    const categoryFilter = document.getElementById("categoryFilter");

    // =========================
    // VIEW TOGGLE (GRID / LIST)
    // =========================
    let isListView = false;

    viewToggle.addEventListener("click", function () {
        isListView = !isListView;

        if (isListView) {
            container.classList.add("list-view");
            viewToggle.textContent = "Switch to Grid View";
        } else {
            container.classList.remove("list-view");
            viewToggle.textContent = "Switch to List View";
        }
    });

    // =========================
    // CATEGORY FILTER (SCROLL)
    // =========================
    categoryFilter.addEventListener("change", function () {
        const value = this.value;

        if (value === "all") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const headers = document.querySelectorAll("h2");

        headers.forEach(h2 => {
            if (h2.textContent.trim() === value) {
                h2.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

});
