// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Iniciação das variáveis globais:
//          - equipe do Jogador (6 pokemons)
//          - equipe do Adversario (1 pokemon)
//          - itens da bolsa (dinheiro, pokeball, greatball, ultraball)
//
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

const equipeJogador = Array.from({length: 6}, () => criarPokemon());

let equipeAdversario = criarPokemon();

const bolsaJogador = [
    { nome:'dinheiro', quantidade:'1000' },
    { nome:'pokeball', quantidade:'100' },
    { nome:'greatball', quantidade:'0' },
    { nome:'ultraball', quantidade:'0' }
];

let pokemonJogadorAtualCombate = 0;





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Criação da estrutura das estastísticas de um pokemon e dos seus ataques.
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

function criarAtaque() {
    return { nome: '', dano: '', tipo: '', alcance: '' };
}

function criarPokemon() {
    return {
        nome: '',
        id: '',
        nivel: '',
        altura: '',
        sexo: '',
        tipoBall: '',
        img: '',
        icon: '',
        hpAtual: '',
        hpMax: '',
        ataques: {
            ataque1: criarAtaque(),
            ataque2: criarAtaque(),
            ataque3: criarAtaque(),
            ataque4: criarAtaque(),
        }
    };
}


renderizarPokemon('1', equipeAdversario, false);
renderizarPokemon('1', equipeJogador[0], true).then(() =>entrarEmCombate(0));





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// "Damos vida" a um pokemon:
//          - aleatorizarSexoPokemon -> 50% de ser fêmea, 50% de ser macho
//          - ajustarTamanhoPokemon -> ajusta o tamanho do pokemon para obter um efeito de perspectiva
//          - procurarPokemon -> pesquisamos o id ou o nome de um determinado pokemon na API online na Internet e guardamos os dados, obtidos em JSON
//          - renderizarPokemon -> usamos os dados obtidos anteriormente em JSON para salvá-los em uma das variáveis globais
//          - pokemonAleatorio -> obter um dos 151 pokemons da primeira geração
//          - entrarEmCombate -> mostrar visualmente os pokemons e outros atributos também
//          - criarHTMLMostradorBalls -> cria os elementos HTML para aparecer visualmente as pokebolas dos pokemons da equipe do jogador
//          - mostradorBallsEquipe -> adiona informações dentro dos elementos HTML para poder serem vistos visualmente
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

function aleatorizarSexoPokemon() {
    const numero = Math.floor(Math.random() * 2);
    return (numero == 0) ? 'F' : 'M';
}

function ajustarTamanhoPokemon(alturaPokemon, imagemPokemon, eJogador) {
    let pixelImagem;

    pixelImagem = eJogador ? alturaPokemon + 95 : alturaPokemon + 60;

    imagemPokemon.onload = () => {
        imagemPokemon.style.height = `${pixelImagem}px`
    }
}

async function procurarPokemon(pokemon) {
    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const dados = await respostaAPI.json();
    return dados;
}

async function renderizarPokemon(pokemonId, pokemon, eJogador) {
    const dados = await procurarPokemon(pokemonId);

    pokemon.nome = dados.name;
    pokemon.id = dados.id;
    pokemon.nivel = 0;
    pokemon.altura = dados.height;
    pokemon.sexo = aleatorizarSexoPokemon();
    if (eJogador) {
        pokemon.img = dados['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
    } else {
        pokemon.img = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    pokemon.icon = dados['sprites']['versions']['generation-vii']['icons']['front_default'];
    pokemon.hpMax = dados.stats['0']['base_stat'];
    pokemon.hpAtual = pokemon.hpMax;
    pokemon.tipoBall = 'pokeball';

    pokemon.ataques.ataque1.nome = 'fraco';
    pokemon.ataques.ataque2.nome = 'mais ou menos';
    pokemon.ataques.ataque3.nome = 'forte';
    pokemon.ataques.ataque4.nome = 'muito forte';

    pokemon.ataques.ataque1.dano = '5';
    pokemon.ataques.ataque2.dano = '10';
    pokemon.ataques.ataque3.dano = '20';
    pokemon.ataques.ataque4.dano = '50';
}


function pokemonAleatorio() {
    return Math.floor(Math.random() * 150) + 1;
}

function entrarEmCombate(pokemonJogador) {
    const nomeJogador = document.querySelector('.pokemon_jogador .nome');
    const vidaMaximaJogador = document.querySelector('.pokemon_jogador .contador_vida_maxima');
    const vidaAtualJogador = document.querySelector('.pokemon_jogador .contador_vida_atual');
    const sexoJogador = document.querySelector('.pokemon_jogador .sexo');
    const imagemJogador = document.querySelector('.pokemon_jogador .imagem');

    const nomeAdversario = document.querySelector('.pokemon_adversario .nome');
    let vidaMaximaAdversario = 0;
    let vidaAtualAdversario = 0;
    const sexoAdversario = document.querySelector('.pokemon_adversario .sexo');
    const imagemAdversario = document.querySelector('.pokemon_adversario .imagem');

    if (pokemonJogador !== null) {
        nomeJogador.textContent = equipeJogador[pokemonJogador].nome;
        sexoJogador.textContent = equipeJogador[pokemonJogador].sexo;
        vidaMaximaJogador.textContent = equipeJogador[pokemonJogador].hpMax;
        vidaAtualJogador.textContent = equipeJogador[pokemonJogador].hpAtual;
        imagemJogador.src = equipeJogador[pokemonJogador].img;
    
        ajustarTamanhoPokemon(equipeJogador[pokemonJogador].altura, imagemJogador, true);

        pokemonJogadorAtualCombate = pokemonJogador;
    }
    mostradorBallsEquipe();
    
    nomeAdversario.textContent = equipeAdversario.nome;
    sexoAdversario.textContent = equipeAdversario.sexo;
    vidaMaximaAdversario.textContent = equipeAdversario.hpMax;
    vidaAtualAdversario.textContent = equipeAdversario.hpAtual;
    imagemAdversario.src = equipeAdversario.img;
    
    ajustarTamanhoPokemon(equipeAdversario.altura, imagemAdversario, false);
}


function criarHTMLMostradorBalls() {
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let div5 = document.createElement('div');
    let div6 = document.createElement('div');

    return {pokemon1: div1, pokemon2: div2, pokemon3: div3, pokemon4: div4, pokemon5: div5, pokemon6: div6};
}

function mostradorBallsEquipe() {
    let divMostrador = document.querySelector('.mostrador_balls_equipe');
    let {pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6} = criarHTMLMostradorBalls();
    let pokemons = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6];
    
    divMostrador.innerHTML = '';

    for(let i = 0; i < equipeJogador.length; i++) {
        pokemons[i].textContent = 'O';

        switch (equipeJogador[i].tipoBall) {
            case 'pokeball':
                pokemons[i].style.color = 'red';
                break;
            case 'greatball':
                pokemons[i].style.color = 'blue';
                break;
            case 'ultraball':
                pokemons[i].style.color = 'yellow';
                break;
            default:
                pokemons[i].textContent = '';
        }

        divMostrador.appendChild(pokemons[i]);
    }
}





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Interações que o jogador tem:
//          - mostrarBotoesAcoes -> mostrado sempre que está no menu (com todos os botões para poder ser interagidos)
//          - esconderBotoesAcoes -> esconde todos os botões para serem interagidos, porém, o botão de voltar se torna visível
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

const botaoLutar = document.querySelector('.botao_lutar');
const botaoBolsa = document.querySelector('.botao_bolsa');
const botaoFugir = document.querySelector('.botao_fugir');
const botaoPokemons = document.querySelector('.botao_pokemons');
const botaoVoltar = document.querySelector('.botao_voltar');

const caixa_bolsa = document.querySelector('.caixa_bolsa');
const caixa_lutar = document.querySelector('.caixa_lutar');
const caixa_pokemon = document.querySelector('.caixa_pokemons');

function mostrarBotoesAcoes() {
    botaoLutar.style.display = 'block';
    botaoBolsa.style.display = 'block';
    botaoFugir.style.display = 'block';
    botaoPokemons.style.display = 'block';
    botaoVoltar.style.display = 'none';
}
function esconderBotoesAcoes() {
    botaoLutar.style.display = 'none';
    botaoBolsa.style.display = 'none';
    botaoFugir.style.display = 'none';
    botaoPokemons.style.display = 'none';
    botaoVoltar.style.display = 'block';
}

botaoLutar.addEventListener('click', () => {
    caixa_lutar.style.display = 'flex';
    atacarPokemon(equipeJogador[pokemonJogadorAtualCombate], true);
    esconderBotoesAcoes();
});
botaoBolsa.addEventListener('click', () => {
    caixa_bolsa.style.display = 'flex';
    mostrarItensBolsa();
    esconderBotoesAcoes();
});
botaoFugir.addEventListener('click', async () => {
    await renderizarPokemon(pokemonAleatorio(), equipeAdversario, false);
    entrarEmCombate(null);
});
botaoPokemons.addEventListener('click', () => {
    caixa_pokemon.style.display = 'flex';
    mostrarPokemonBolsa();
    esconderBotoesAcoes();
});
botaoVoltar.addEventListener('click', () => {
    caixa_bolsa.style.display = 'none';
    caixa_lutar.style.display = 'none';
    caixa_pokemon.style.display = 'none';
    mostrarBotoesAcoes();
});





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Ações quando acessada a bolsa de pokemons do jogador:
//          - criarHTMLPokemonBolsa -> cria elementos HMTL para serem mostrados visualmente posteriormente
//          - mostrarPokemonBolsa -> mostra visualmente os pokemons da party do jogador
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

function criarHTMLPokemonBolsa(numPokemonParty) {
    /*
    <button>
        <img src="" alt="" class="icon">
        <div>
            <div>
                Lv.<span class="level"></span>
                <span class="nome"></span>
                <span class="sexo"></span>
            </div>
            <div>
                <div class="barra_vida"></div>
                <div></div>
                <div class="motrar_quantidade_vida">
                    <span class="contador_vida_atual"></span>/<span class="contador_vida_maxima"></span>
                </div>
            </div>
        </div>
    </button>
    */

    let button = document.createElement('button');
    button.classList.add("pokemon_bolsa");
    button.addEventListener('click', () => {
        entrarEmCombate(numPokemonParty);
    });

    let img = document.createElement('img');
    img.src = '';
    img.classList.add("icon");

    let div1 = document.createElement('div');
    let span1 = document.createElement('span');
    span1.classList.add("level");
    let span2 = document.createElement('span');
    span2.classList.add("nome");
    let span3 = document.createElement('span');
    span3.classList.add("sexo");
    div1.appendChild(document.createTextNode('Lv.'));
    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);

    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    div3.classList.add("barra_vida");
    let div4 = document.createElement('div');
    let div5 = document.createElement('div');
    div5.classList.add("motrar_quantidade_vida");
    let span4 = document.createElement('span');
    span4.classList.add("contador_vida_atual");
    let span5 = document.createElement('span');
    span5.classList.add("contador_vida_maxima");
    div5.appendChild(span4);
    div5.appendChild(document.createTextNode('/'));
    div5.appendChild(span5);
    div2.appendChild(div3);
    div2.appendChild(div4);
    div2.appendChild(div5);
    
    button.appendChild(img);
    button.appendChild(div1);
    button.appendChild(div2);

    return button;
}

function mostrarPokemonBolsa() {
    caixa_pokemon.innerHTML = '';

    for(let i = 0; i < equipeJogador.length; i++) {
        let button = criarHTMLPokemonBolsa(i);
        
        if(equipeJogador[i].nome !== '') {
            const icon = button.querySelector('img');
            const nivel = button.querySelector('.level');
            const nome = button.querySelector('.nome');
            const sexo = button.querySelector('.sexo');
            const vidaAtual = button.querySelector('.contador_vida_atual');
            const vidaMaxima = button.querySelector('.contador_vida_maxima');
            
            icon.src = equipeJogador[i].icon;
            nivel.textContent = equipeJogador[i].nivel;
            nome.textContent = equipeJogador[i].nome;
            sexo.textContent = equipeJogador[i].sexo;
            vidaAtual.textContent = equipeJogador[i].hpAtual;
            vidaMaxima.textContent = equipeJogador[i].hpMax;
        }

        caixa_pokemon.appendChild(button);
    }
}





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Ações quando acessada a bolsa de itens do jogador:
//          - criarHTMLItensBolsa -> cria elementos HMTL para serem mostrados visualmente posteriormente
//          - mostrarPokemonBolsa -> mostra visualmente os pokemons da party do jogador
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

function criarHTMLItensBolsa() {
    /*
    <div class="dinheiro">
        Dinheiro <span></span>¥
    </div>
    <button class="pokeball">
        Pokebola <span></span>
    </button>
    <button class="greatball">
        Greatbola <span></span>
    </button>
    <button class="ultraball">
        Ultrabola <span></span>
    </button>
    */

   let div1 = document.createElement('div');
   div1.classList.add('dinheiro');
   div1.appendChild(document.createTextNode('Dinheiro'));
   let span1 = document.createElement('span');
   div1.appendChild(span1);
   div1.appendChild(document.createTextNode('¥'));

   let button1 = document.createElement('button');
   button1.classList.add('pokeball');
   button1.addEventListener('click', () => {
        capturarPokemon('pokeball', bolsaJogador[1].quantidade);
    });
   button1.appendChild(document.createTextNode('Pokebola'));
   let span2 = document.createElement('span');
   button1.appendChild(span2);
   
   let button2 = document.createElement('button');
   button2.classList.add('greatball');
   button2.addEventListener('click', () => {
        capturarPokemon('greatball', bolsaJogador[2].quantidade);
    });
   button2.appendChild(document.createTextNode('Greatbola'));
   let span3 = document.createElement('span');
   button2.appendChild(span3);

   let button3 = document.createElement('button');
   button3.classList.add('ultraball');
   button3.addEventListener('click', () => {
        capturarPokemon('ultraball', bolsaJogador[3].quantidade);
    });
   button3.appendChild(document.createTextNode('Ultrabola'));
   let span4 = document.createElement('span');
   button3.appendChild(span4);

   return {dinheiro: div1, pokeball: button1, greatball: button2, ultraball: button3};
}

function mostrarItensBolsa() {
    if (caixa_bolsa.querySelectorAll('div').length !== 0) {
        return;
    }

    let {dinheiro, pokeball, greatball, ultraball} = criarHTMLItensBolsa();

    dinheiro.querySelector('span').textContent = bolsaJogador[0].quantidade;
    pokeball.querySelector('span').textContent = bolsaJogador[1].quantidade;
    greatball.querySelector('span').textContent = bolsaJogador[2].quantidade;
    ultraball.querySelector('span').textContent = bolsaJogador[3].quantidade;

    caixa_bolsa.appendChild(dinheiro);
    caixa_bolsa.appendChild(pokeball);
    caixa_bolsa.appendChild(greatball);
    caixa_bolsa.appendChild(ultraball);
}





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Ações de luta:
//          - alterarBarraVidaPokemon -> o valor e o comprimento da barra de vida do pokemon são alteradas. Se o pokemon adversário morrer, outro irá aparecer no lugar
//          - atacarPokemon -> ataca o pokemon, tirando vida
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

async function alterarBarraVidaPokemon(dano, pokemon, barraVida, eJogador) {
    const pixelBarraVida = getComputedStyle(barraVida).width.slice(0, -2);

    const pixelVidaAtual = Math.round(((pokemon.hpAtual - dano) / pokemon.hpMax)*pixelBarraVida);

    barraVida.style.width = `${pixelVidaAtual}px`;

    if((pokemon.hpAtual - dano) <= 0) {
        if (!eJogador) {
            await renderizarPokemon(pokemonAleatorio(), equipeAdversario, false);
        }
        barraVida.style.width = `${pixelBarraVida}px`;
        barraVida.style.backgroundColor = 'green';
        return;
    }

    const porcentagemVida = Math.round(((pokemon.hpAtual - dano) / pokemon.hpMax)*100);

    if (porcentagemVida > 20 && porcentagemVida <= 50) {
        barraVida.style.backgroundColor = 'yellow';
    }
    if (porcentagemVida <= 20) {
        barraVida.style.backgroundColor = 'red';
    }
    
    pokemon.hpAtual -= dano;
}

function criarHTMLAtaquesPokemon(pokemon) {
    let button1 = document.createElement('button');
    button1.addEventListener('click', () => {
        const barraVidaAdversario = document.querySelector('.pokemon_adversario .barra_vida');
        alterarBarraVidaPokemon(pokemon.ataques.ataque1.dano, equipeAdversario, barraVidaAdversario, true);
    });
    let span1 = document.createElement('span');
    span1.textContent = pokemon.ataques.ataque1.nome;
    button1.appendChild(span1);

    let button2 = document.createElement('button');
    button2.addEventListener('click', () => {
        const barraVidaAdversario = document.querySelector('.pokemon_adversario .barra_vida');
        alterarBarraVidaPokemon(pokemon.ataques.ataque2.dano, equipeAdversario, barraVidaAdversario, true);
    });
    let span2 = document.createElement('span');
    span2.textContent = pokemon.ataques.ataque2.nome;
    button2.appendChild(span2);

    let button3 = document.createElement('button');
    button3.addEventListener('click', () => {
        const barraVidaAdversario = document.querySelector('.pokemon_adversario .barra_vida');
        alterarBarraVidaPokemon(pokemon.ataques.ataque3.dano, equipeAdversario, barraVidaAdversario, true);
    });
    let span3 = document.createElement('span');
    span3.textContent = pokemon.ataques.ataque3.nome;
    button3.appendChild(span3);

    let button4 = document.createElement('button');
    button4.addEventListener('click', () => {
        const barraVidaAdversario = document.querySelector('.pokemon_adversario .barra_vida');
        alterarBarraVidaPokemon(pokemon.ataques.ataque4.dano, equipeAdversario, barraVidaAdversario, true);
    });
    let span4 = document.createElement('span');
    span4.textContent = pokemon.ataques.ataque4.nome;
    button4.appendChild(span4);

    return {ataque1: button1, ataque2: button2, ataque3: button3, ataque4: button4};
}

function atacarPokemon(pokemon, eJogador) {
    if (eJogador) {
        caixa_lutar.innerHTML = '';

        let {ataque1, ataque2, ataque3, ataque4} = criarHTMLAtaquesPokemon(pokemon);

        caixa_lutar.appendChild(ataque1);
        caixa_lutar.appendChild(ataque2);
        caixa_lutar.appendChild(ataque3);
        caixa_lutar.appendChild(ataque4);

        return;
    }

    const barraVidaJogador = document.querySelector('.pokemon_jogador .barra_vida');
    alterarBarraVidaPokemon(ataque.dano, equipeJogador, barraVidaJogador, false);
}





// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
//
// Ações de captura:
//          - capturarPokemon -> captura um pokemon
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

async function capturarPokemon(tipoBall, quantidadeBall) {
    if (quantidadeBall <= 0) return;

    const numeroAleatorio = Math.floor(Math.random() * 101);
    let probabilidadeCapturar;

    switch (tipoBall) {
        case 'pokeball':
            probabilidadeCapturar = 50;
            bolsaJogador[1].quantidade--;
            document.querySelector('.caixa_bolsa .pokeball span').textContent = bolsaJogador[1].quantidade;
            break;
        case 'greatball':
            probabilidadeCapturar = 70;
            bolsaJogador[2].quantidade--;
            document.querySelector('.caixa_bolsa .greatball span').textContent = bolsaJogador[2].quantidade;
            break;
        case 'ultraball':
            probabilidadeCapturar = 100;
            bolsaJogador[3].quantidade--;
            document.querySelector('.caixa_bolsa .ultraball span').textContent = bolsaJogador[3].quantidade;
            break;
    }
    
    if (probabilidadeCapturar < numeroAleatorio) return;

    let espacoLivre = 0;

    for(espacoLivre; espacoLivre < equipeJogador.length; espacoLivre++) {
        if (equipeJogador[espacoLivre].nome === '') {
            break;
        }
    }

    if (espacoLivre !== 6) {
        await renderizarPokemon(equipeAdversario.id, equipeJogador[espacoLivre], true);
    }

    await renderizarPokemon(pokemonAleatorio(), equipeAdversario, false);
    entrarEmCombate(null);
}



/*
const botaoComprarPokeballs = document.querySelector('.botao_comprar_pokeball');
const botaoComprarGreatballs = document.querySelector('.botao_comprar_greatball');
const botaoComprarUltraballs = document.querySelector('.botao_comprar_ultraball');

botaoComprarPokeballs.addEventListener('click', () => {
    if (bolsaJogador[0].quantidade >= 100) {
        bolsaJogador[0].quantidade -= 100;
        dinheiroJogador.textContent -= 100;
        bolsaJogador[1].quantidade++;
        numPokeballJogador.textContent++;
    }
});
botaoComprarGreatballs.addEventListener('click', () => {
    if (bolsaJogador[0].quantidade >= 150) {
        bolsaJogador[0].quantidade -= 150;
        dinheiroJogador.textContent -= 150;
        bolsaJogador[2].quantidade++;
        numGreatballJogador.textContent++;
    }
});
botaoComprarUltraballs.addEventListener('click', () => {
    if (bolsaJogador[0].quantidade >= 200) {
        bolsaJogador[0].quantidade -= 200;
        dinheiroJogador.textContent -= 200;
        bolsaJogador[3].quantidade++;
        numUltraballJogador.textContent++;
    }
});
*/