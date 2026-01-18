// API URL (base currency is USD)
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Selecting required DOM elements
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const from = document.querySelector(".from");
const to = document.querySelector(".to");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.querySelector(".finalAmount");

// Variables to store user input
let searchValue = 0;
let resultFrom = "";
let resultTo = "";

// Get amount entered by user
search.addEventListener("input", (e) => {
    searchValue = e.target.value;
});

// Get selected "From" currency
from.addEventListener("change", (e) => {
    resultFrom = e.target.value;
});

// Get selected "To" currency
to.addEventListener("change", (e) => {
    resultTo = e.target.value;
});

// Convert button click event
convert.addEventListener("click", getResults);

// Function to fetch exchange rates
function getResults() {

    // Validation check
    if (!searchValue || !resultFrom || !resultTo) {
        alert("Please fill all Fields");
        return;
    }

    // Fetch exchange rate data
    fetch(api)
        .then(res => res.json())
        .then(data => displayResults(data))
        .catch(() => alert("Error fetching exchange rates"));
}

// Function to calculate and display result
function displayResults(currency) {

    // Get exchange rates
    const fromRate = currency.rates[resultFrom];
    const toRate = currency.rates[resultTo];

    // Conversion formula
    const converted = ((toRate / fromRate) * searchValue).toFixed(2);

    // Show result
    finalValue.textContent = converted;
    finalAmount.classList.remove("d-none");
}

// Reset function
function clear() {
    location.reload();
}
