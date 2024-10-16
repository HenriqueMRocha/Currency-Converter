let dolar = 5.67;

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

usdInput.addEventListener("keyup", () => {
    convert('usd-to-brl');
});

brlInput.addEventListener("keyup", () => {
    convert('brl-to-usd');
});

usdInput.addEventListener('blur', () => {
    usdInput.value = formatCurrency(usdInput.value);
});

brlInput.addEventListener('blur', () => {
    brlInput.value = formatCurrency(brlInput.value);
});

usdInput.value = '1000,00';
convert("usd-to-brl");

// FUNCTIONS 
function formatCurrency(value) {
    // Adjust value
    let fixedValue = fixValue(value);
    
    // Use format function
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(fixedValue);
};

function fixValue(value) {
    let fixedValue = value.replace(',', '.');
    let floatValue = parseFloat(fixedValue);
    if (floatValue == NaN) {
        floatValue = 0;
    };
    return floatValue;
};

function convert(type) {
    if (type == "usd-to-brl") {
        // Ajustar a formatação do valor
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue * dolar;
        result = result.toFixed(2);

        // Convert value
        brlInput.value = formatCurrency(result)

        // Show in the real field 
    };
    
    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / dolar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result);
    };
};


// Construir um site que converta moedas

// Colocar as cotações das moedas em variaveis (api)
// Fazer o calculo de conversão
// Retornar os valores