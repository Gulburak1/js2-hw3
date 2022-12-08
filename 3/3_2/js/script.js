const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

let exchangeRates = {};

const mapExchangeRates = () => {
    return new Promise((resolve) => {
        amountOneEl.setAttribute("disabled", "true");
        amountTwoEl.setAttribute("disabled", "true");
        fetch(
            `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/USD`
            )
    
    .then((res) => res.json())
    .then((data) => {
        let ratesRender = "";

        for (key in data.conversion_rates) {
            ratesRender +=
                key === "USD"
                    ? `<option selected value="${key}">${key}</option>`
                    : `<option value="${key}">${key}</option>`;
        }

        currencyOneEl.innerHTML = ratesRender;
        currencyTwoEl.innerHTML = ratesRender;
})

.finally(() => {
    amountOneEl.removeAttribute("disabled");
    amountTwoEl.removeAttribute("disabled");
    resolve();
             })
         });
    
};
const getExchangeRates = () => {
    const currencyOne = currencyOneEl.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
        )
        .then((res) => res.json())
        .then((data) => {
            exchangeRates = {...data.conversion_rates };
            calculateRates();
        });
    };

    const calculateRates = () => {
        const currencyTwo = currencyTwoEl.value;
        const rate = exchangeRates[currencyTwo];
        const resultCalculate = +amountOneEl.value * rate;
        amountTwoEl.value = resultCalculate.toFixed(2);
    };

mapExchangeRates() .then(getExchangeRates);

amountOneEl.addEventListener("input", calculateRates);
currencyOneEl.addEventListener("change", getExchangeRates);
currencyTwoEl.addEventListener("change", calculateRates)

let swapRates = () =>{

let a = currencyOneEl.value;
let b = currencyTwoEl.value;

currencyOneEl.value = b;
currencyTwoEl.value = a;



}