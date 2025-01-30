class CurrencyConverter {
    constructor() {
        this.amountInput = document.getElementById('amount');
        this.currencyFromSelect = document.getElementById('currencyFrom');
        this.currencyToSelect = document.getElementById('currencyTo');
        this.resultElement = document.getElementById('result');
        this.swapButton = document.getElementById('swapBtn');

        // Event listeners
        this.swapButton.addEventListener('click', () => this.swapCurrencies());
        this.amountInput.addEventListener('input', () => this.validateInput());
    }

    async handleConversion() {
        try {
            const amount = this.amountInput.value;
            const fromCurrency = this.currencyFromSelect.value;
            const toCurrency = this.currencyToSelect.value;

            if (!amount) {
                throw new Error('Please enter an amount');
            }

            const convertedAmount = await this.convertCurrency(amount, fromCurrency, toCurrency);
            this.displayResult(amount, fromCurrency, convertedAmount, toCurrency);
        } catch (error) {
            this.handleError(error);
        }
    }

    async convertCurrency(amount, fromCurrency, toCurrency) {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        return (amount * rate).toFixed(2);
    }

    swapCurrencies() {
        [this.currencyFromSelect.value, this.currencyToSelect.value] = 
        [this.currencyToSelect.value, this.currencyFromSelect.value];

        if (this.amountInput.value) {
            this.handleConversion();
        }
    }

    validateInput() {
        this.amountInput.value = this.amountInput.value.replace(/[^\d.]/g, '');
    }

    displayResult(amount, fromCurrency, convertedAmount, toCurrency) {
        this.resultElement.innerText = 
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }

    handleError(error) {
        console.error('Error:', error);
        this.resultElement.innerText = `Error: ${error.message}`;
    }
}

// Initialize the converter
const converter = new CurrencyConverter();

// Global function to handle conversion (called from HTML)
function handleConversion() {
    converter.handleConversion();
}
