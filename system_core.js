/* 
   SISTEMA DE AUTENTICAÇÃO ORDO REALITAS v4.2
   ATENÇÃO: Este arquivo contém lógica sensível.
*/

// As credenciais estão codificadas em Base64 para não ficarem legíveis.
// Para criar novos usuários, use um site "Base64 Encoder" na internet.
// Exemplo: "Dante" vira "RGFudGU="
const DATABASE_HASH = {
    "RGFudGU=": "SDFKMA=="  // Usuário: Dante | Senha: H1J0
};

function realizarLogin(e) {
    e.preventDefault();
    
    const userInput = document.getElementById('username').value;
    const passInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const loginBox = document.querySelector('.login-box');

    // Codifica o que o usuário digitou para comparar com o banco de dados
    // btoa() é a função do navegador que transforma texto em código Base64
    try {
        const userEncoded = btoa(userInput); 
        const passEncoded = btoa(passInput);

        // Verifica se o Usuário existe E se a Senha bate
        if (DATABASE_HASH[userEncoded] && DATABASE_HASH[userEncoded] === passEncoded) {
            
            // SUCESSO
            errorMsg.style.color = 'var(--accent-gold)';
            errorMsg.innerHTML = '<i class="fas fa-check"></i> ACESSO AUTORIZADO. CARREGANDO...';
            
            // Salva na sessão que o usuário está logado (opcional, para uso futuro)
            sessionStorage.setItem('agente_logado', userInput);

            setTimeout(() => {
                window.location.href = 'arquivos.html';
            }, 1500);

        } else {
            throw new Error('Credenciais inválidas');
        }
    } catch (err) {
        // ERRO
        console.log("Tentativa de intrusão detectada.");
        errorMsg.style.color = 'var(--accent-red)';
        errorMsg.innerHTML = '<i class="fas fa-times"></i> ERRO: DADOS INCORRETOS';
        
        loginBox.style.animation = 'shake 0.4s ease-in-out';
        setTimeout(() => { loginBox.style.animation = ''; }, 400);
    }
}

// Funções de Interface (Abrir/Fechar Modal)
function toggleLogin() {
    const loginOverlay = document.getElementById('login-overlay');
    const errorMsg = document.getElementById('error-msg');
    
    if (getComputedStyle(loginOverlay).display === 'flex') {
        loginOverlay.style.opacity = '0';
        setTimeout(() => { loginOverlay.style.display = 'none'; loginOverlay.classList.remove('active'); }, 300);
    } else {
        loginOverlay.style.display = 'flex';
        setTimeout(() => { loginOverlay.style.opacity = '1'; loginOverlay.classList.add('active'); }, 10);
        document.getElementById('username').focus();
    }
    errorMsg.textContent = '';
    document.getElementById('loginForm').reset();
}
