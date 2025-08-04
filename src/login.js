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
const formLogin = document.getElementById('loginForm');

// Verifica se o usuário já está logado
formLogin.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('username').value;
  const senha = document.getElementById('senha').value;

  // Usa a função do Firebase para fazer o login
  auth.signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Login bem-sucedido!
      console.log('Usuário logado:', userCredential.user);
      alert('Login efetuado com sucesso!');
      // Aqui você pode redirecionar o usuário para outra página, ex:
      window.location.href = "inicio.html";
    })
    .catch((error) => {
      // Ocorreu um erro
      console.error('Erro no login:', error);
      alert('Erro ao fazer login: ' + error.message);
    });
});