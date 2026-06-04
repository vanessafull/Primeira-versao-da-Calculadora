const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

function adicionar(valor) {
  display.value += valor;
}

function limpar() {
  display.value = "";
}

function apagar() {
  display.value = display.value.slice(0, -1);
}

function calcular() {
  try {
    const operacao = display.value;

    if (operacao.trim() === "") {
      return;
    }

    const resultado = eval(operacao);

    display.value = resultado;

    history.unshift(`${operacao} = ${resultado}`);

    saveHistory();
    renderHistory();

  } catch {
    display.value = "Erro";
  }
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function saveHistory() {
  localStorage.setItem("calculatorHistory", JSON.stringify(history));
}

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
});

renderHistory();