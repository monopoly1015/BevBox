document.addEventListener("DOMContentLoaded", function () {

const products = [
    { name: "BevBar", category: "Bars & Trailers", img: "assets/images/main-bar.jpg" },
    { name: "BevBox", category: "Bars & Trailers", img: "assets/images/bevbox.jpg" },
    { name: "4ft Folding Bar", category: "Bars & Trailers", img: "assets/images/folding-bar.jpg" },

    { name: "20x30 Frame Tent", category: "Tents", img: "assets/images/20x30.jpg" },
    { name: "20x20 Frame Tent", category: "Tents", img: "assets/images/20x20.jpg" },
    { name: "10x20 Pop Up Tent", category: "Tents", img: "assets/images/10x20.jpg" },
    { name: "10x15 Pop Up Tent", category: "Tents", img: "assets/images/10x15.jpg" },

    { name: "White Resin Chairs", category: "Tables & Chairs", img: "assets/images/chairs.jpg" },
    { name: "6ft Banquet Tables", category: "Tables & Chairs", img: "assets/images/6ft.jpg" },
    { name: "48in Round Tables", category: "Tables & Chairs", img: "assets/images/round.jpg" },
    { name: "32in Cocktail Table", category: "Tables & Chairs", img: "assets/images/cocktail.jpg" },

    { name: "Chafing Dishes", category: "Catering Equipment", img: "assets/images/chafing.jpg" }
];

const container = document.getElementById("products-container");
const viewToggle = document.getElementById("viewToggle");
const categoryFilter = document.getElementById("categoryFilter");
const wrapper = document.querySelector(".products-container");

let isList = false;
let currentCategory = "all";

function renderProducts() {
    container.innerHTML = "";

    let filtered = products;

    if (currentCategory !== "all") {
        filtered = products.filter(p => p.category === currentCategory);
    }

    let lastCategory = "";

    filtered.forEach(p => {

        if (!isList && p.category !== lastCategory && currentCategory === "all") {
            lastCategory = p.category;
            container.innerHTML += `<h2>${p.category}</h2><div class="products-grid">`;
        }

        container.innerHTML += `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <a href="inquiry.html?item=${encodeURIComponent(p.name)}" class="quote-btn">
                        Request Quote
                    </a>
                </div>
            </div>
        `;
    });
}

/* TOGGLE VIEW */
viewToggle.addEventListener("click", function () {
    isList = !isList;

    wrapper.classList.toggle("list-view");

    viewToggle.textContent = isList ? "🔲 Grid View" : "📋 List View";

    renderProducts();
});

/* FILTER */
categoryFilter.addEventListener("change", function () {
    currentCategory = this.value;
    renderProducts();
});

renderProducts();

});
