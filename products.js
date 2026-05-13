console.log("PRODUCTS JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const products = [

        // 🍹 Bars & Trailers
        { name: "BevBar", category: "Bars & Trailers", img: "assets/images/bevbar.jpg" },
        { name: "BevBox", category: "Bars & Trailers", img: "assets/images/bevbox.jpg" },
        { name: "4ft Bar", category: "Bars & Trailers", img: "assets/images/4ftbar.jpg" },

        // ⛺ Tents
        { name: "20x30 Frame Tent", category: "Tents", img: "assets/images/20x30.jpg" },
        { name: "20x20 Frame Tent", category: "Tents", img: "assets/images/20x20.jpg" },
        { name: "10x20 Pop Up Tent", category: "Tents", img: "assets/images/10x20.jpg" },
        { name: "10x15 Pop Up Tent", category: "Tents", img: "assets/images/10x15.jpg" },
        { name: "Tent Sidewalls (Frame Tents Only)", category: "Tents", img: "assets/images/sidewalls.jpg" },

        // 🪑 Tables & Seating
        { name: "White Resin Chairs", category: "Tables & Chairs", img: "assets/images/chairs.jpg" },
        { name: "6ft Banquet Tables", category: "Tables & Chairs", img: "assets/images/6ft.jpg" },
        { name: "48in Round Tables", category: "Tables & Chairs", img: "assets/images/round.jpg" },
        { name: "32in Cocktail Tables", category: "Tables & Chairs", img: "assets/images/32cocktail.jpg" },

        // 🍽️ Other Rental Equipment
        { name: "Chafing Dishes", category: "Other Rental Equipment", img: "assets/images/chafing.jpg" },
        { name: "9x12 Bounce House", category: "Other Rental Equipment", img: "assets/images/bouncehouse.jpg" }
    ];

    const container = document.getElementById("products-container");
    const categorySelect = document.getElementById("categoryFilter");

    if (!container) {
        console.error("Products container not found");
        return;
    }

    let currentCategory = null;
    let html = "";

    // =============================
    // BUILD PRODUCTS
    // =============================
    products.forEach(product => {

        if (product.category !== currentCategory) {

            if (currentCategory !== null) {
                html += `</div></section>`;
            }

            currentCategory = product.category;

            const categoryId = currentCategory
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/&/g, "and");

            html += `
                <section id="${categoryId}" class="product-section">
                    <h2 style="margin: 2rem 0 1rem;">${currentCategory}</h2>
                    <div class="products-grid">
            `;
        }

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

    if (currentCategory !== null) {
        html += `</div></section>`;
    }

    container.innerHTML = html;

    // =============================
    // CATEGORY DROPDOWN SCROLL
    // =============================
    if (categorySelect) {
        categorySelect.addEventListener("change", function () {

            if (this.value === "all") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const id = this.value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/&/g, "and");

            const target = document.getElementById(id);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // =============================
    // BACK TO TOP BUTTON
    // =============================
    const backToTop = document.createElement("button");
    backToTop.innerText = "↑ Top";
    backToTop.className = "back-to-top";

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =============================
    // STICKY CATEGORY HIGHLIGHT
    // =============================
    const sections = document.querySelectorAll(".product-section");

    window.addEventListener("scroll", () => {

        let scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            const id = section.id;

            if (scrollPos >= top && scrollPos < bottom) {

                // highlight dropdown
                if (categorySelect) {
                    categorySelect.value = section.querySelector("h2")
                        .innerText;
                }
            }
        });
    });

});
