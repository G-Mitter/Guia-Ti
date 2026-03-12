document.addEventListener('DOMContentLoaded', function() {
    const barraPesquisa = document.getElementById('barra-pesquisa');
    const botoes = document.querySelectorAll('.btn-topico');

    barraPesquisa.addEventListener('input', function() {
        const termoPesquisa = barraPesquisa.value.toLowerCase(); // Pega o que foi digitado em minúsculo

        botoes.forEach(function(botao) {
            const textoBotao = botao.textContent.toLowerCase(); // Pega o texto do botão em minúsculo

            // Se o texto do botão inclui o que foi digitado, mostra o botão. Se não, esconde.
            if (textoBotao.includes(termoPesquisa)) {
                botao.style.display = 'flex'; // Mantém o flexbox para alinhar o texto
            } else {
                botao.style.display = 'none'; // Esconde o botão
            }
        });
    });
});