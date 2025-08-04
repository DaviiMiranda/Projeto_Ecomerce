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

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function carregarProduto() {
  const id = getProductIdFromURL();
  const container = document.getElementById("detalhes-produto");
  

  if (!id) {
    container.innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  try {
    const doc = await db.collection("Produtos").doc(id).get();
    if (!doc.exists) {
      container.innerHTML = "<p>Produto não encontrado2.</p>";
      return;
    }

    const produto = doc.data();
    container.innerHTML = ` <div class="produto-detalhe">
        
        <div class="produto-info">
          <h2>${produto.nome}</h2>
          <h1>Avaliações: 4.5/5</h1>
          <p class="produto-info">${produto.descricao}</p>
          <h1>Especificações</h1>
          <p>Categoria: ${produto.categoria || "Não especificada"}</p> 
          <p>Tamanho: ${produto.tamanho || "Não especificado"}</p>
          <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
          <button onclick="adicionarAoCarrinho('${id}')">Adicionar ao Carrinho</button>
        </div>
      </div>
    `;
  } catch (e) {
    console.error("Erro ao carregar produto:", e);
    container.innerHTML = "<p>Erro ao carregar o produto.</p>";
  }

}

// ✅ Chama a função automaticamente ao carregar a página
window.onload = carregarProduto;

function adicionarAoCarrinho(idProduto) {
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      const existe = carrinho.find(p => p.id === idProduto);
      if (existe) {
        existe.quantidade += 1;
      } else {
        carrinho.push({ id: idProduto, quantidade: 1 });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
    }
