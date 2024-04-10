document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há uma âncora na URL
    if (window.location.hash) {
        // Remove a âncora da URL sem recarregar a página
        history.replaceState(null, null, ' ');
    }

    // Obtém uma referência para a caixa de menu
    var itens = document.getElementById('itens');

    // Verifica se há um estado salvo no armazenamento local
    var menuState = localStorage.getItem('menuState');

    // Se houver um estado salvo, aplica-o ao menu
    if (menuState) {
        itens.style.display = menuState;
    }

    function clickMenu() {
        if (window.innerWidth >= 768 && window.innerWidth <= 991.98) {
            var menu = document.getElementById('itens');
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                menu.classList.add('closed');
                itens.style.display = 'none';
                // Salva o estado do menu no armazenamento local
                localStorage.setItem('menuState', 'none');
            } else {
                menu.classList.remove('closed');
                menu.classList.add('open');
                // Salva o estado do menu no armazenamento local
                itens.style.display = 'block';
                // Salva o estado do menu no armazenamento local
                localStorage.setItem('menuState', 'block');
            }
        } else {
            if (itens.style.display == 'block') {
                itens.style.display = 'none';
                // Salva o estado do menu no armazenamento local
                localStorage.setItem('menuState', 'none');
            } else {
                itens.style.display = 'block';
                // Salva o estado do menu no armazenamento local
                localStorage.setItem('menuState', 'block');
            }
        } 
    }

    // Adiciona um evento de clique ao span
    document.getElementById('burger').addEventListener('click', clickMenu);

    function mudouTamanho() {
        if (window.innerWidth >= 991.98) {
            itens.style.display = 'block'
            localStorage.setItem('menuState', 'block');
        } else {
            itens.style.display = 'none'
            localStorage.setItem('menuState', 'none');
        }
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