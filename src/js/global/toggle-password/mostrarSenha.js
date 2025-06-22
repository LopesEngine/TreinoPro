// Cria e exporta a função de alternar a senha entre text e password
export function mostrarSenha(){
    
    const toggle = document.querySelectorAll('.toggle-password');

    toggle.forEach(function(toggle) {
        toggle.addEventListener('click', function(){
            const input = this.previousElementSibling;
            if(input.type === 'password'){
                input.type = 'text';
                this.classList.remove('bi-eye');
                this.classList.add('bi-eye-slash');
            }else{
                input.type = 'password';
                this.classList.remove('bi-eye-slash');
                this.classList.add('bi-eye');
            }
        });
    });
};
