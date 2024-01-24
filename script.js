const resultDisplay = document.querySelector('#value');
let textDisplay = '';

window.addEventListener("load", () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode();
    }
});

function updateDisplay() {
    document.querySelector('.operation').innerHTML = textDisplay;
}

function calcResult() {
    let res = eval(removeSpanTags(textDisplay));
    if (res === undefined) res = 'error';
    textDisplay = res;
    resultDisplay.innerHTML = res;
}

function toggleDarkMode() {
    document.querySelector('body').classList.toggle('darkActive');
    document.querySelector('.darkMode').classList.toggle('light');
    document.querySelector('.darkMode').classList.toggle('dark');
    document.querySelector('svg.light').classList.toggle('hidden');
    document.querySelector('svg.dark').classList.toggle('hidden');
    document.querySelector('svg.backspaceLight').classList.toggle('hidden');
    document.querySelector('svg.backspaceDark').classList.toggle('hidden');
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