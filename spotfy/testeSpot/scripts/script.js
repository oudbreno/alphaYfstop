document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Função para adicionar animação de borda e cor
    function addActiveClass(event) {
        event.target.classList.add('active');
    }

    // Função para adicionar uma cor diferente ao digitar
    function onTyping(event) {
        if (event.target.value !== '') {
            event.target.classList.add('typing');
        } else {
            event.target.classList.remove('typing');
        }
    }

    // Função para remover a animação quando o campo perde foco
    function removeActiveClass(event) {
        event.target.classList.remove('active');
    }

    // Adicionar eventos nos campos
    usernameInput.addEventListener('focus', addActiveClass);
    passwordInput.addEventListener('focus', addActiveClass);

    usernameInput.addEventListener('blur', removeActiveClass);
    passwordInput.addEventListener('blur', removeActiveClass);

    usernameInput.addEventListener('input', onTyping);
    passwordInput.addEventListener('input', onTyping);
});
