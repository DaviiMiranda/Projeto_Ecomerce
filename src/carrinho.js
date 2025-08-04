const firebaseConfig = {
  apiKey: "AIzaSyD6uRrXqu1vHxubWW-tRTOZMl7q8wAJ_kw",
  authDomain: "projeto-bravoure.firebaseapp.com",
  projectId: "projeto-bravoure",
  storageBucket: "projeto-bravoure.firebasestorage.app",
  messagingSenderId: "625968924323",
  appId: "1:625968924323:web:553e2d43df5f04b6fda116",
  measurementId: "G-WCY0X2FERQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para carregar e exibir o carrinho
function carregarCarrinhoNaPagina() {
  const lista = document.getElementById("carrinho-lista");
  const totalSpan = document.getElementById("carrinho-total");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<p style='color:white;'>Seu carrinho está vazio.</p>";
    totalSpan.textContent = "0,00";
    return;
  }

  lista.innerHTML = ""; // Limpa antes de inserir

  carrinho.forEach((produto, index) => {
    const subtotal = produto.preco * produto.quantidade;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "item-carrinho";
    item.innerHTML = `
      <h3 style="color:white;">${produto.nome}</h3>
      <p style="color:white;">Preço: R$ ${produto.preco}</p>
      <p style="color:white;">Quantidade: ${produto.quantidade}</p>
      <p style="color:white;">Subtotal: R$ ${subtotal}</p>
      <button onclick="removerItemDoCarrinho(${index})">Remover</button>
      <hr>
    `;
    lista.appendChild(item);
  });

  const valorFinal = calcularValorFinal();
 // -> 3. E AQUI ATUALIZAMOS O VALOR DENTRO DO SEU SPAN
  // O seu HTML já tem "R$ ". Então, vamos formatar o número e remover o "R$ " que o `toLocaleString` adiciona para não duplicar.
  if (totalSpan) {
    totalSpan.textContent = valorFinal.toLocaleString('pt-BR', {
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    }).replace('.', ','); // Garante a vírgula como separador decimal
  }


 
}

// Função para remover item por índice
function removerItemDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (index >= 0 && index < carrinho.length) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinhoNaPagina(); // Atualiza a tela
  }
}

function calcularValorFinal() {
  // 1. Pega o carrinho do localStorage. Se não existir, usa um array vazio [].
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // 2. Se o carrinho estiver vazio, o total é 0.
  if (carrinho.length === 0) {
    return 0;
  }

  // 3. Usa o método `reduce` para somar o subtotal de cada item.
  // `reduce` é a forma mais moderna e limpa de transformar um array em um único valor (a soma total, neste caso).
  const valorTotal = carrinho.reduce((acumulador, produto) => {
    
    // Verificação de segurança: garante que preço e quantidade são números válidos.
    const precoItem = typeof produto.preco === 'number' ? produto.preco : 0;
    const qtdItem = typeof produto.quantidade === 'number' ? produto.quantidade : 0;

    // Soma o subtotal do item atual (preço * quantidade) ao valor já acumulado.
    return acumulador + (precoItem * qtdItem);

  }, 0);
  
  // Formata o total para duas casas decimais.

  return valorTotal;
}

// Inicia o carregamento ao abrir a página
window.onload = carregarCarrinhoNaPagina;

