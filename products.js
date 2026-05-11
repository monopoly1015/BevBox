console.log("PRODUCTS JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const products = [

        // 🍹 Bars & Trailers
        { name: "BevBar", category: "Bars & Trailers", img: "assets/images/bevbar.jpg" },
        { name: "BevBox", category: "Bars & Trailers", img: "assets/images/bevbox.jpg" },
        { name: "4ft Folding Bar", category: "Bars & Trailers", img: "assets/images/4ftbar.jpg" },

        // ⛺ Tents
        { name: "20x30 Frame Tent", category: "Tents", img: "assets/images/20x30.jpg" },
        { name: "20x20 Frame Tent", category: "Tents", img: "assets/images/20x20.jpg" },
        { name: "10x20 Pop Up Tent", category: "Tents", img: "assets/images/10x20.jpg" },
        { name: "10x15 Pop Up Tent", category: "Tents", img: "assets/images/10x15.jpg" },
        { name: "Tent Sidewalls", category: "Tents", img: "assets/images/sidewalls.jpg" },

        // 🪑 Tables & Seating
        { name: "White Resin Chairs", category: "Tables & Chairs", img: "assets/images/chairs.jpg" },
        { name: "6ft Banquet Tables", category: "Tables & Chairs", img: "assets/images/6ft.jpg" },
        { name: "48in Round Tables", category: "Tables & Chairs", img: "assets/images/round.jpg" },
        { name: "32in Cocktail Table", category: "Tables & Chairs", img: "assets/images/32cocktail.jpg" },

        // 🍽️ Other Rental Equipment
        { name: "Chafing Dishes", category: "Other Rental Equipment", img: "assets/images/chafing.jpg" },
        { name: "9x12 Bounce House", category: "Other Rental Equipment", img: "assets/images/bouncehouse.jpg" }
    ];

    const container = document.getElementById("products-container");

    if (!container) {
        console.error("Products container not found");
        return;
    }

    let currentCategory = null;
    let html = "";

    products.forEach(product => {

        // CATEGORY HEADER
        if (product.category !== currentCategory) {

            if (currentCategory !== null) {
                html += `</div>`;
            }

            currentCategory = product.category;

            html += `
                <h2 style="margin: 2rem 0 1rem;">${currentCategory}</h2>
                <div class="products-grid">
            `;
        }

        // PRODUCT CARD
        html += `
            <div class="product-card">
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
            </div>
        `;
    });

    // CLOSE FINAL GRID
    if (currentCategory !== null) {
        html += `</div>`;
    }

    container.innerHTML = html;

});
