document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[name="cadastro"]');

    function validateField(id, regex, minLength, errorMessage, successMessage) {
        const input = document.getElementById(id);
        const value = input.value.trim();
        let isValid = true;
        let message = '';

        if (value.length === 0) {
             isValid = false;
             message = 'Campo obrigatório.';
        } else if (minLength && value.length < minLength) {
            isValid = false;
            message = `Deve ter no mínimo ${minLength} caracteres.`;
        } else if (regex && !new RegExp(regex).test(value)) {
            isValid = false;
            message = errorMessage;
        } else {
            message = successMessage;
        }

        selecionarFeedback(id, message, !isValid);
        return isValid;
    }
    
    function validateName() {
         const nameRegex = /^[A-Za-z\s]+$/;
         return validateField('nome', nameRegex, 5, 'Nome inválido. Use apenas letras (min 5 caracteres).', 'Nome OK!');
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validateField('email', emailRegex, null, 'O formato do e-mail não é válido.', 'E-mail OK!');
    }
    
    function validatePasswordFields() {
        const senhaInput = document.getElementById('senha');
        const confirmacaoInput = document.getElementById('confirmacao-senha');
        const senhaConteudo = senhaInput.value;
        const confirmacaoValue = confirmacaoInput.value;
        const passwordMinLength = 8;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        
        let senhaValida = true;
        let validConfirmacao = true;

        if (senhaConteudo.length === 0) {
            selecionarFeedback('senha', 'A senha é obrigatória.', true);
            senhaValida = false;
        } else if (!passwordRegex.test(senhaConteudo)) {
            selecionarFeedback('senha', 'A senha deve seguir o padrão de segurança (min. 8, maiúscula, minúscula, número e símbolo).', true);
            senhaValida = false;
        } else {
            selecionarFeedback('senha', 'Senha forte e válida.', false);
        }

        if (confirmacaoValue.length === 0) {
            selecionarFeedback('confirmacao-senha', 'A confirmação de senha é obrigatória.', true);
            validConfirmacao = false;
        } else if (senhaConteudo !== confirmacaoValue) {
            selecionarFeedback('confirmacao-senha', 'As senhas não conferem.', true);
            validConfirmacao = false;
            // Se a confirmação falhar, a senha original é marcada com erro para indicar o problema.
            if (senhaValida) {
                selecionarFeedback('senha', 'As senhas não conferem.', true);
            }
        } else if (senhaValida) { // Só mostra sucesso se a senha original também estiver válida
            selecionarFeedback('confirmacao-senha', 'Senhas conferem!', false);
        }
        
        return senhaValida && validConfirmacao;
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const arePasswordsValid = validatePasswordFields();

        if (isNameValid && isEmailValid && arePasswordsValid) {
            alert('✅ Cadastro realizado com sucesso!');
            form.reset(); 
        } else {
            alert('⚠️ Por favor, corrija os erros no formulário.');
        }
    });
});