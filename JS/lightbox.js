// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', function () {

    const modal = document.getElementById('lightbox-modal');
    const imgAmpliada = document.getElementById('img-ampliada');
    const btnFechar = document.querySelector('.lightbox-fechar');

    // Pega todas as imagens que estão dentro da div da solução
    const imagens = document.querySelectorAll('.solucao-content img');

    // Para cada imagem encontrada, adiciona o evento de clique
    imagens.forEach(function (img) {
        // Adiciona a classe CSS para o mouse virar uma lupa
        img.classList.add('img-clicavel');

        // Quando clicar na imagem...
        img.addEventListener('click', function () {
            modal.style.display = 'flex'; // Mostra o fundo escuro
            imgAmpliada.src = this.src;   // Copia a imagem clicada para o modal
        });
    });

    // Fecha o lightbox se clicar no botão "X"
    btnFechar.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Fecha o lightbox se clicar fora da imagem (no fundo escuro)
    modal.addEventListener('click', function (evento) {
        if (evento.target === modal) {
            modal.style.display = 'none';
        }
    });
});