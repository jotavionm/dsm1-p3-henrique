document.addEventListener('DOMContentLoaded', function() {

    //capturando as informações do input e colocando em variável
    const form = document.querySelector('form[name="cadastro"]');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmacaoSenhaInput = document.getElementById('confirmacao-senha');

    //capturando os <small> que eu criei pra botar as msg na tela
    const nomeFeedback = document.getElementById('nome-feedback');
    const emailFeedback = document.getElementById('email-feedback');
    const senhaFeedback = document.getElementById('senha-feedback');
    const senhaConfirmFeedback = document.getElementById('senha-confirm-feedback');

    //o teste do regex
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function exibirFeedback(inputElement, feedbackElement, isValid, message) { //não entendi onde eu tava errando, então pedi pro chagpt conectar tudo e ele criou essa função que eu não entendi. Parece que ele faz a leitura do isValid pra limpar as mensagens? Ainda estou em dúvida
        if (isValid) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
            feedbackElement.textContent = '';
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
            feedbackElement.textContent = message;
            feedbackElement.style.color = '#92140C';
        }
    }

    // testa com o regex se a senha tá certa e adiciona no isValid pra enviar a mensagem
    function validarForcaSenha() {
        const senha = senhaInput.value;
        const isValid = senhaRegex.test(senha);

        let mensagem = '';
        if (!isValid) {
            mensagem = 'A senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 símbolo (@$!%*?&).';
        }

        exibirFeedback(senhaInput, senhaFeedback, isValid, mensagem);

        return isValid;
    }

    function validarConfirmacaoSenha() { // esse foi chatgpt, não descobri como fazer sozinho mas entendi a lógica
        const senha = senhaInput.value;
        const confirmacao = confirmacaoSenhaInput.value;
        const isValid = senha === confirmacao && confirmacao !== '';

        let mensagem = '';
        if (confirmacao === '') { // vê se está vazio
             mensagem = 'Por favor, confirme sua senha.';
        } else if (senha !== confirmacao) { // vê se as duas strings estão iguais
            mensagem = 'As senhas não conferem.';
        } else if (!validarForcaSenha()){ //confirma se a senha original passou no teste
            mensagem = 'A senha original não atende aos requisitos de segurança.';
        }

        exibirFeedback(confirmacaoSenhaInput, senhaConfirmFeedback, isValid, mensagem);
        return isValid;
    }

    emailInput.addEventListener('input', function() {
        const isValid = emailInput.checkValidity(); //validando o email com o item do html
        let mensagem = '';
        if (!isValid && emailInput.value.length > 0) {
            mensagem = 'Por favor, insira um endereço de email válido.';
        }

        exibirFeedback(emailInput, emailFeedback, isValid, mensagem);
    });

    senhaInput.addEventListener('input', function() {
        validarForcaSenha();
        validarConfirmacaoSenha();
    }); //fica rodando os dois da senha ao mesmo tempo pra confirmar que ambos estão iguais

    confirmacaoSenhaInput.addEventListener('input', validarConfirmacaoSenha);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        //valida de novo pra ver se tá tudo certo
        const isNomeValid = nomeInput.checkValidity() && nomeInput.value.length >= 3;
        const isEmailValid = emailInput.checkValidity();
        const isSenhaForcaValid = validarForcaSenha();
        const isConfirmacaoValid = validarConfirmacaoSenha();

        // confirmando se tá tudo escrito
        if (nomeInput.value === '') {
            exibirFeedback(nomeInput, nomeFeedback, false, 'O nome completo é obrigatório.');
        }

        if (emailInput.value === '') {
            exibirFeedback(emailInput, emailFeedback, false, 'O email é obrigatório.');
        }

        if (senhaInput.value === '') {
             exibirFeedback(senhaInput, senhaFeedback, false, 'A senha é obrigatória.');
        }

        if (confirmacaoSenhaInput.value === '') {
            exibirFeedback(confirmacaoSenhaInput, senhaConfirmFeedback, false, 'A confirmação de senha é obrigatória.');
        }

        // Se todas as validações customizadas passarem...
        if (isNomeValid && isEmailValid && isSenhaForcaValid && isConfirmacaoValid) {
            // Se tudo estiver certo pode enviar o formulário
            // form.submit();
            console.log('Formulário Válido! Pronto para enviar.');
            alert('Cadastro realizado com sucesso! (Simulação)');
        } else {
            // Se houver erros, exibe uma mensagem geral e foca no primeiro campo inválido.
            console.log('Formulário Inválido! Corrija os erros.');
        }
    });

});