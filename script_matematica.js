document.addEventListener('DOMContentLoaded', () => {
    const captchaQuestionElement = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captchaInput');
    const verifyButton = document.getElementById('verifyButton');
    const captchaMessage = document.getElementById('captchaMessage');
    const refreshButton = document.getElementById('refreshButton');

    let num1, num2, correctAnswer = 34; // O resultado fixo é 34

    function generateCaptcha() {
        num1 = Math.floor(Math.random() * 30) + 1; // Ajuste os limites para facilitar a soma até 34
        num2 = correctAnswer - num1; // Garante que a soma sempre será 34

        // Se num2 for negativo ou zero, gere novamente (para evitar problemas de visualização)
        if (num2 <= 0) {
            generateCaptcha();
            return;
        }

        captchaQuestionElement.textContent = `${num1} + ${num2} = ?`;
        captchaInput.value = '';
        captchaMessage.textContent = '';
        captchaMessage.classList.remove('success', 'error');
        refreshButton.style.display = 'none';
        verifyButton.style.display = 'block';
        captchaInput.disabled = false;
    }

    function verifyCaptcha() {
        const userAnswer = parseInt(captchaInput.value, 10);

        if (userAnswer === correctAnswer) {
            captchaMessage.textContent = 'Correto! Avançando... ✅';
            captchaMessage.classList.remove('error');
            captchaMessage.classList.add('success');
            // Redireciona para a próxima página após um pequeno atraso
            setTimeout(() => {
                window.location.href = 'captcha_fotos.html';
            }, 1000);
        } else {
            captchaMessage.textContent = `Ops! A resposta deve ser ${correctAnswer}. Tente novamente. ❌`;
            captchaMessage.classList.remove('success');
            captchaMessage.classList.add('error');
            refreshButton.style.display = 'block';
            verifyButton.style.display = 'none'; // Esconde o botão de avançar para evitar múltiplos cliques em erro
            captchaInput.disabled = true; // Desabilita o input até que um novo CAPTCHA seja gerado ou a página recarregue
        }
    }

    verifyButton.addEventListener('click', verifyCaptcha);
    refreshButton.addEventListener('click', generateCaptcha);

    generateCaptcha();
});