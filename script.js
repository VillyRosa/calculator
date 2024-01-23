const resultDisplay = document.querySelector('#value');
let textDisplay = '';

function updateDisplay() {
    document.querySelector('.operation').innerHTML = textDisplay;
}

function calcResult() {
    let res = eval(removerTagsSpan(textDisplay));
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

function removerTagsSpan(inputString) {
    // Cria um elemento temporário para inserir a string e manipular o DOM
    const tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;
  
    // Obtém todas as tags <span> dentro do elemento temporário
    const spans = tempElement.getElementsByTagName('span');
  
    // Itera sobre as tags <span> e substitui cada uma pelo seu conteúdo interno
    for (let i = spans.length - 1; i >= 0; i--) {
      const span = spans[i];
      const spanConteudo = span.innerHTML;
      span.parentNode.replaceChild(document.createTextNode(spanConteudo), span);
    }
  
    // Retorna a string modificada
    return tempElement.innerHTML;
}