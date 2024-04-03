document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há uma âncora na URL
    if (window.location.hash) {
        // Remove a âncora da URL sem recarregar a página
        history.replaceState(null, null, ' ');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Selecione todos os links que começam com "#"
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Adicione um evento de clique a cada link
        anchor.addEventListener('click', function(e) {
            // Impedir o comportamento padrão do link
            e.preventDefault();
            
            // Obter o elemento de destino do link
            const target = document.querySelector(this.getAttribute('href'));
            
            // Verificar se o elemento de destino existe
            if (target) {
                // Calcular o deslocamento do topo da página até o elemento de destino
                const offset = target.offsetTop - 160; // Ajuste esse valor conforme necessário
                
                // Rolar suavemente para o elemento de destino com um deslocamento
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});