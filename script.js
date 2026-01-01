const calculateButton = document.getElementById("calculate");
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from");
const toCurrencySelect = document.getElementById("to");
const outputElement = document.getElementById("output");

const swapButton = document.getElementById("swap");

swapButton.addEventListener("click", () => {
  const temp = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = temp;

  if (outputElement.style.display === "block") {
    calculateButton.click();
  }
});

calculateButton.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const from = fromCurrencySelect.value;
  const to = toCurrencySelect.value;

  if (amount <= 0 || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/814385ebe55498d47ded4e4f/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const result = (amount * rate).toFixed(2);

      outputElement.textContent = `${amount} ${from} = ${result} ${to}`;
      outputElement.style.display = "block";
    })
    .catch(() => alert("Failed to fetch exchange rates"));
});
