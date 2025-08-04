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
const auth = firebase.auth();

const formCadastro = document.getElementById('cadastroForm');

formCadastro.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o recarregamento da página

  const email = document.getElementById('username').value;
  const senha = document.getElementById('senha').value;
  const senha2 = document.getElementById('senha2').value;
  
  if (senha !== senha2) {
        // Se forem diferentes, mostra uma mensagem de erro e para a execução da função
        mensagemErro.textContent = "As senhas não coincidem. Por favor, tente novamente.";
        return; // O 'return' aqui é crucial para parar o processo
    }

  // Usa a função do Firebase para criar um usuário
  auth.createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Cadastro bem-sucedido!
      console.log('Usuário cadastrado com sucesso:', userCredential.user);
      alert('Conta criada com sucesso! Você já pode fazer o login.');
      formCadastro.reset(); // Limpa o formulário
    })
    .catch((error) => {
      // Ocorreu um erro
      console.error('Erro no cadastro:', error);
      // Pega a mensagem de erro e mostra ao usuário
      alert('Erro ao criar conta: ' + error.message);
    });
});