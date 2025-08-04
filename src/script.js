
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
const imagemDefault = "../img/bravoure.png"; //LEMBRAR DE CONSERTAR A IMAGEM PADRAO

function adicionarAoCarrinho(idProduto, nome, preco) {
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      const existe = carrinho.find(p => p.id === idProduto);
      if (existe) {
        existe.quantidade += 1;
      } else {
        carrinho.push({ id: idProduto, quantidade: 1, nome: nome, preco: preco });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
    }

async function carregarProdutos() {
  const wrapper1 = document.getElementById("swiper-wrapper-1");
  const wrapper2 = document.getElementById("swiper-wrapper-2");
  const snapshot = await db.collection("Produtos").get();

  if (snapshot.empty) {
    wrapper1.innerHTML = "<p style='color: white;'>Nenhum produto encontrado.</p>";
    wrapper2.innerHTML = "<p style='color: white;'>Nenhum produto encontrado.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const produto = doc.data();
    const id = doc.id;

    const nome = produto.nome || "Produto sem nome";
    const preco = typeof produto.preco === 'number' ? produto.preco : '0,00';
    const imagem = imagemDefault;

    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <a href="pagproduto.html?id=${id}" style="text-decoration: none; color: inherit;">
        <img src="${imagem}" alt="${nome}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
        <h3 style="margin:12px 0 4px;">${nome}</h3>
        <span style="color:#A78BFA; font-weight:bold;">R$ ${preco}</span>
      </a>
      <button style="margin-top:8px; padding:8px 16px; border:none; background:#A78BFA; color:white; border-radius:6px; cursor:pointer;" onclick="adicionarAoCarrinho('${id}', '${nome}', ${preco})">
        Adicionar ao carrinho
      </button>
    `;

    // Clona para evitar conflitos
    wrapper1.appendChild(slide.cloneNode(true));
    wrapper2.appendChild(slide);
  });

  // Inicia os dois carrosséis separadamente
  new Swiper(".swiper1", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-1",
      prevEl: ".swiper-button-prev-1"
    },
    pagination: {
      el: ".swiper-pagination-1",
      clickable: true,
    },
  });

  new Swiper(".swiper2", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-2",
      prevEl: ".swiper-button-prev-2"
    },
    pagination: {
      el: ".swiper-pagination-2",
      clickable: true,
    },
  });
}

window.onload = carregarProdutos;




