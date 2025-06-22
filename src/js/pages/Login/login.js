//Importa toggle-password
import { mostrarSenha } from "../../global/toggle-password/mostrarSenha.js";

mostrarSenha();

const formLogin = document.getElementById('form-login');
const mensagemLogin = document.getElementById('mensagem-login');
//Previne que a página recarregue após o envio do formulário
formLogin.addEventListener('submit', function (event) {
    event.preventDefault();
    //Confere se os campos foram devidamente preenchidos e retorna uma mensagem de texto
    const email = document.getElementById('form-email').value.trim();
    const senha = document.getElementById('form-senha').value.trim();
    if (email === '' || senha === '') {
        mensagemLogin.textContent = 'Preencha todos os campos!';
        mensagemLogin.style.color = 'red';
        return;
    }
    /*Confirma se os dados inseridos batem com os salvos no localStorage */
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

    if (!usuarioValido) {
        mensagemLogin.textContent = 'E-mail ou senha incorretos!';
        mensagemLogin.style.color = 'red';
        return;
    }

    mensagemLogin.textContent = 'Login realizado com sucesso!';
    mensagemLogin.style.color = 'green';
    formLogin.reset();
    //Redireciona para a pagina de lista de exercícios
    setTimeout(() => {
        window.location.href = 'exerciseList.html';
    }, 2000);


});
//Inicia a página com foco no campo a ser preenchido
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-email").focus();
});
