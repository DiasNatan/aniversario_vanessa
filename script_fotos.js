document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const verifyButton = document.getElementById('verifyButton');
    const captchaMessage = document.getElementById('captchaMessage');
    const targetPhotosSpan = document.getElementById('targetPhotos');

    // Nomes de arquivo das imagens que devem ser selecionadas (as corretas)
    const correctImageNames = ['image1.jpg', 'image3.jpg', 'image5.jpg'];
    const allImageNames = [
        'image1.jpg', 'image2.jpg', 'image3.jpg',
        'image4.jpg', 'image5.jpg', 'image6.jpg'
    ]; // Todas as imagens disponíveis

    let selectedImages = new Set(); // Para armazenar as imagens selecionadas pelo usuário

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeCaptcha() {
        imageGrid.innerHTML = ''; // Limpa a grade de imagens
        selectedImages.clear();
        captchaMessage.textContent = '';
        captchaMessage.classList.remove('success', 'error');
        verifyButton.disabled = false;

        // Embaralha a ordem das imagens para cada vez
        shuffleArray(allImageNames);

        // Exibe as fotos que devem ser selecionadas
//        targetPhotosSpan.textContent = correctImageNames.map(name => `"${name.split('.')[0]}"`).join(', ');

        allImageNames.forEach(imageName => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-item');

            const img = document.createElement('img');
            img.src = `images/${imageName}`; // Assumindo que as imagens estão na pasta 'images'
            img.alt = imageName.split('.')[0]; // Nome da imagem sem extensão
            img.dataset.name = imageName; // Armazena o nome original para verificação

            imgContainer.appendChild(img);
            imageGrid.appendChild(imgContainer);

            imgContainer.addEventListener('click', () => {
                imgContainer.classList.toggle('selected');
                if (imgContainer.classList.contains('selected')) {
                    selectedImages.add(imageName);
                } else {
                    selectedImages.delete(imageName);
                }
            });
        });
    }

    function verifyCaptcha() {
        const selectedCorrectCount = Array.from(selectedImages).filter(name => correctImageNames.includes(name)).length;
        const totalCorrectNeeded = correctImageNames.length;

        // Verifica se todas as imagens corretas foram selecionadas E nenhuma imagem incorreta foi selecionada
        const allCorrectSelected = selectedCorrectCount === totalCorrectNeeded;
        const noIncorrectSelected = selectedImages.size === totalCorrectNeeded; // O número de selecionadas deve ser igual ao número de corretas

        if (allCorrectSelected && noIncorrectSelected) {
            captchaMessage.textContent = 'Correto! Avançando para sua mensagem! ✅';
            captchaMessage.classList.remove('error');
            captchaMessage.classList.add('success');
            verifyButton.disabled = true; // Desabilita o botão para evitar cliques múltiplos
            setTimeout(() => {
                window.location.href = 'parabens.html';
            }, 1000);
        } else {
            captchaMessage.textContent = 'Seleção incorreta. Tente novamente. ❌';
            captchaMessage.classList.remove('success');
            captchaMessage.classList.add('error');
            // Opcional: Desselecionar tudo para um novo começo ou permitir que o usuário corrija
            document.querySelectorAll('.image-item.selected').forEach(item => item.classList.remove('selected'));
            selectedImages.clear();
        }
    }

    verifyButton.addEventListener('click', verifyCaptcha);

    initializeCaptcha();
});