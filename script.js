// Alterna login/cadastro
const loginCard = document.getElementById("login-card");
const registerCard = document.getElementById("register-card");
const toRegister = document.getElementById("to-register");
const toLogin = document.getElementById("to-login");

toRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginCard.classList.add("hidden");
  registerCard.classList.remove("hidden");
});
toLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerCard.classList.add("hidden");
  loginCard.classList.remove("hidden");
});

// Validação Login
const loginBtn = document.getElementById("login-btn");
const loginUsuario = document.getElementById("login-usuario");
const loginSenha = document.getElementById("login-senha");
const loginError = document.getElementById("login-error");

loginBtn.addEventListener("click", () => {
  if (loginUsuario.value.trim() === "" || loginSenha.value.trim() === "") {
    showError(loginError, "Preencha todos os campos!");
  } else {
    showError(loginError, "");
    localStorage.setItem("logado", "true");
    window.location.href = "dashboard.html";
  }
});

// Validação Cadastro
const regBtn = document.getElementById("register-btn");
const regNome = document.getElementById("reg-nome");
const regEmail = document.getElementById("reg-email");
const regSenha = document.getElementById("reg-senha");
const registerError = document.getElementById("register-error");

regBtn.addEventListener("click", () => {
  if (regNome.value.trim() === "" || regEmail.value.trim() === "" || regSenha.value.trim() === "") {
    showError(registerError, "Todos os campos são obrigatórios!");
  } else if (!validateEmail(regEmail.value)) {
    showError(registerError, "Digite um e-mail válido!");
  } else if (regSenha.value.length < 6) {
    showError(registerError, "A senha deve ter pelo menos 6 caracteres!");
  } else {
    showError(registerError, "");
    localStorage.setItem("logado", "true");
    window.location.href = "dashboard.html";
  }
});

// Funções auxiliares
function showError(element, message) {
  if (message) {
    element.textContent = message;
    element.classList.add("show");
  } else {
    element.textContent = "";
    element.classList.remove("show");
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}