const resultDisplay = document.querySelector('#value');
let textDisplay = '';

window.addEventListener("load", () => toggleDarkMode(getDarkModePreferences()));

window.addEventListener("keydown", async (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        textDisplay += key;
        updateDisplay();
    } else if (key === '.' || key === ',' || key === 'Decimal') {
        textDisplay += '.';
        updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        textDisplay += `<span class='sinal'>${key}</span>`;
        updateDisplay();
    } else if (key === 'Backspace' || key === 'Delete') {
        textDisplay = textDisplay.slice(0, -1);
        updateDisplay();
    } else if (key === 'Enter' || key === 'Return') {
        calcResult();
    } else if (key === 'Escape') {
        textDisplay = '0';
        calcResult();
        textDisplay = '';
        updateDisplay();
    } else if ((event.ctrlKey || event.metaKey) && key === 'v') {
        const clipboardData = await navigator.clipboard.readText();
        console.log(await navigator.clipboard.readText())
        if (clipboardData) {
            const pastedText = clipboardData.toString();
            if (/^\d+$/.test(pastedText)) {
                textDisplay += pastedText.replace(',', '.');
                updateDisplay();
            }
        }
    }
});

function addCaracter(caracter) {
    if (Number.isInteger(parseInt(caracter))) {
        if (textDisplay === '0' && caracter === '0') return;
        if (textDisplay === '0') textDisplay = '';
        textDisplay += caracter;
    } else if (textDisplay.length > 0 && !isNaN(textDisplay[textDisplay.length - 1])) {
        if (caracter === '.') {
            textDisplay += '.';
        } else textDisplay += `<span class='sinal'>${caracter}</span>`;
    }
    updateDisplay();
}

function updateDisplay() {
    document.querySelector('.operation').innerHTML = textDisplay;
}

function calcResult() {
    let res = removeSpanTags(textDisplay);
    while (res[res.length - 1] === '*' || res[res.length - 1] === '-' || res[res.length - 1] === '+' || res[res.length - 1] === '/') {
        res = res.slice(0, -1);
    }
    res = eval(res);
    if (res === undefined) res = 'error';
    textDisplay = res;
    resultDisplay.innerHTML = res;
}

function toggleDarkMode(dark) {
    document.querySelector('body').classList.toggle('darkActive', dark);
    document.querySelector('.darkMode').classList.toggle('light', !dark);
    document.querySelector('.darkMode').classList.toggle('dark', dark);
    document.querySelector('svg.light').classList.toggle('hidden', dark);
    document.querySelector('svg.dark').classList.toggle('hidden', !dark);
    document.querySelector('svg.backspaceLight').classList.toggle('hidden', dark);
    document.querySelector('svg.backspaceDark').classList.toggle('hidden', !dark);
}

function getDarkModePreferences() {
    const darkModeSavedPreferences = JSON.parse(window.localStorage.getItem('darkMode'));

    if (!darkModeSavedPreferences) {
        let systemPreferences = false;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) systemPreferences = true;
        window.localStorage.setItem('darkMode', JSON.stringify({ value: systemPreferences }));
        return systemPreferences;
    } else {
        if (darkModeSavedPreferences.value) return true;
    }    
    
    return false;
}

function toggleDarkModePreferences() {
    const darkModeSavedPreferences = JSON.parse(window.localStorage.getItem('darkMode'));
    window.localStorage.setItem('darkMode', JSON.stringify({ value: !darkModeSavedPreferences.value }));
}

function removeSpanTags(inputString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;
    const spans = tempElement.getElementsByTagName('span');
  
    for (let i = spans.length - 1; i >= 0; i--) {
        const span = spans[i];
        const spanConteudo = span.innerHTML;
        span.parentNode.replaceChild(document.createTextNode(spanConteudo), span);
    }

    return tempElement.innerHTML;
}