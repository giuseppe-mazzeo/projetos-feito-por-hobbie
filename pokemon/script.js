let equipeJogador = [
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', icon:'', hpAtual:'', hpMax:'', ataques: { ataque1: { nome:'', dano:'', tipo:'', alcance:''}, ataque2: { nome:'', dano:'', tipo:'', alcance:''}, ataque3: { nome:'', dano:'', tipo:'', alcance:''}, ataque4: { nome:'', dano:'', tipo:'', alcance:''} } },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', icon:'', hpAtual:'', hpMax:'', ataques: { ataque1: { nome:'', dano:'', tipo:'', alcance:''}, ataque2: { nome:'', dano:'', tipo:'', alcance:''}, ataque3: { nome:'', dano:'', tipo:'', alcance:''}, ataque4: { nome:'', dano:'', tipo:'', alcance:''} } },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', icon:'', hpAtual:'', hpMax:'', ataques: { ataque1: { nome:'', dano:'', tipo:'', alcance:''}, ataque2: { nome:'', dano:'', tipo:'', alcance:''}, ataque3: { nome:'', dano:'', tipo:'', alcance:''}, ataque4: { nome:'', dano:'', tipo:'', alcance:''} } },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', icon:'', hpAtual:'', hpMax:'', ataques: { ataque1: { nome:'', dano:'', tipo:'', alcance:''}, ataque2: { nome:'', dano:'', tipo:'', alcance:''}, ataque3: { nome:'', dano:'', tipo:'', alcance:''}, ataque4: { nome:'', dano:'', tipo:'', alcance:''} } },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', icon:'', hpAtual:'', hpMax:'', ataques: { ataque1: { nome:'', dano:'', tipo:'', alcance:''}, ataque2: { nome:'', dano:'', tipo:'', alcance:''}, ataque3: { nome:'', dano:'', tipo:'', alcance:''}, ataque4: { nome:'', dano:'', tipo:'', alcance:''} } },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', icon:'', hpAtual:'', hpMax:'', ataques: { ataque1: { nome:'', dano:'', tipo:'', alcance:''}, ataque2: { nome:'', dano:'', tipo:'', alcance:''}, ataque3: { nome:'', dano:'', tipo:'', alcance:''}, ataque4: { nome:'', dano:'', tipo:'', alcance:''} } },
];
const bolsaJogador = [
    { nome:'dinheiro', quantidade:'1000' },
    { nome:'pokeball', quantidade:'100' },
    { nome:'greatball', quantidade:'0' },
    { nome:'ultraball', quantidade:'0' }
];
let pokemonEmCombateAtual = 0;

let equipeAdversario = [    
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', hpAtual:'', hpMax:'' },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', hpAtual:'', hpMax:'' },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', hpAtual:'', hpMax:'' },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', hpAtual:'', hpMax:'' },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', hpAtual:'', hpMax:'' },
    { nome:'', id:'', altura:'', sexo:'', tipoBall:'', img:'', hpAtual:'', hpMax:'' }
];


const nomePokemonJogador = document.querySelector('.nome_pokemon_jogador');
const vidaMaximaPokemonJogador = document.querySelector('.vida_maxima_pokemon_jogador');
const vidaAtualPokemonJogador = document.querySelector('.vida_atual_pokemon_jogador');
const sexoPokemonJogador = document.querySelector('.sexo_pokemon_jogador');
const imagemPokemonJogador = document.querySelector('.imagem_pokemon_jogador');
const ataque1Jogador = document.querySelector('.ataque1Jogador');
const ataque2Jogador = document.querySelector('.ataque2Jogador');
const ataque3Jogador = document.querySelector('.ataque3Jogador');
const ataque4Jogador = document.querySelector('.ataque4Jogador');

const nomePokemonAdversario = document.querySelector('.nome_pokemon_adversario');
let vidaMaximaPokemonAdversario = 0;
let vidaAtualPokemonAdversario = 0;
const sexoPokemonAdversario = document.querySelector('.sexo_pokemon_adversario');
const imagemPokemonAdversario = document.querySelector('.imagem_pokemon_adversario');



function aleatorizarSexoPokemon() {
    const numero = Math.floor(Math.random() * 2);
    return (numero == 0) ? 'F' : 'M';
}

function ajustarTamanhoPokemon(alturaPokemon, jogador) {
    if (jogador) {
        imagemPokemonJogador.onload = () => {
            imagemPokemonJogador.style.height = `${imagemPokemonJogador.naturalHeight*2.47 + alturaPokemon}px`;
        };
        return;
    }

    imagemPokemonAdversario.onload = () => {
        imagemPokemonAdversario.style.height = `${imagemPokemonAdversario.naturalHeight + alturaPokemon}px`;
    }
}

async function procurarPokemon(pokemon) {
    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const dados = await respostaAPI.json();
    return dados;
}

async function renderizarPokemon(pokemonNome, pokemonJogador, pokemonAdversario) {
    if (pokemonJogador !== null) {
        const dadosJogador = await procurarPokemon(pokemonNome);

        pokemonJogador.nome = dadosJogador.name;
        pokemonJogador.id = dadosJogador.id;
        pokemonJogador.altura = dadosJogador.height;
        pokemonJogador.sexo = aleatorizarSexoPokemon();
        pokemonJogador.img = dadosJogador['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
        pokemonJogador.icon = dadosJogador['sprites']['versions']['generation-vii']['icons']['front_default'];
        pokemonJogador.hpMax = dadosJogador.stats['0']['base_stat'];
        pokemonJogador.hpAtual = pokemonJogador.hpMax;

        if (pokemonJogador.tipoBall === '') pokemonJogador.tipoBall = 'pokeball';

        pokemonJogador.ataques.ataque1.nome = 'fraco';
        pokemonJogador.ataques.ataque2.nome = 'mais ou menos';
        pokemonJogador.ataques.ataque3.nome = 'forte';
        pokemonJogador.ataques.ataque4.nome = 'muito forte';

        pokemonJogador.ataques.ataque1.dano = '5';
        pokemonJogador.ataques.ataque2.dano = '10';
        pokemonJogador.ataques.ataque3.dano = '20';
        pokemonJogador.ataques.ataque4.dano = '50';
        return;
    }

    const dadosAdversario = await procurarPokemon(pokemonNome);

    pokemonAdversario.nome = dadosAdversario.name;
    pokemonAdversario.id = dadosAdversario.id;
    pokemonAdversario.altura = dadosAdversario.height;
    pokemonAdversario.sexo = aleatorizarSexoPokemon();
    pokemonAdversario.img = dadosAdversario['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonAdversario.hpMax = dadosAdversario.stats['0']['base_stat'];
    pokemonAdversario.hpAtual = pokemonAdversario.hpMax;
}

function pokemonAleatorio() {
    return Math.floor(Math.random() * 150) + 1;
}

function entrarEmCombate(pokemonAtual, jogador) {
    if (jogador) {
        nomePokemonJogador.textContent = equipeJogador[pokemonAtual].nome;
        sexoPokemonJogador.textContent = equipeJogador[pokemonAtual].sexo;
        vidaMaximaPokemonJogador.textContent = equipeJogador[pokemonAtual].hpMax;
        vidaAtualPokemonJogador.textContent = equipeJogador[pokemonAtual].hpAtual;
        imagemPokemonJogador.src = equipeJogador[pokemonAtual].img;

        ataque1Jogador.textContent = equipeJogador[pokemonAtual].ataques.ataque1.nome;
        ataque2Jogador.textContent = equipeJogador[pokemonAtual].ataques.ataque2.nome;
        ataque3Jogador.textContent = equipeJogador[pokemonAtual].ataques.ataque3.nome;
        ataque4Jogador.textContent = equipeJogador[pokemonAtual].ataques.ataque4.nome;

        ajustarTamanhoPokemon(equipeJogador[pokemonAtual].altura, true);
        
        let contador = 0;
        equipeJogador.some((elemento) => {
            if (elemento.nome === '') return true;
            mostradorPokemonEquipe(elemento.tipoBall, contador);
            contador++;
        });

        return;
    }
    
    nomePokemonAdversario.textContent = equipeAdversario[pokemonAtual].nome;
    sexoPokemonAdversario.textContent = equipeAdversario[pokemonAtual].sexo;
    vidaMaximaPokemonAdversario.textContent = equipeAdversario[pokemonAtual].hpMax;
    vidaAtualPokemonAdversario.textContent = equipeAdversario[pokemonAtual].hpAtual;
    imagemPokemonAdversario.src = equipeAdversario[pokemonAtual].img;
    
    ajustarTamanhoPokemon(pokemonAtual.altura, false);
}

document.getElementById('bulbasaur').addEventListener('click', async () => {
    await renderizarPokemon('1', equipeJogador[0], null);
    entrarEmCombate(pokemonEmCombateAtual, true);

    await renderizarPokemon(pokemonAleatorio(), null, equipeAdversario[0]);
    entrarEmCombate(0, false);
});





const botaoLutar = document.querySelector('.botao_lutar');
const botaoBolsa = document.querySelector('.botao_bolsa');
const botaoFugir = document.querySelector('.botao_fugir');
const botaoPokemons = document.querySelector('.botao_pokemons');
const botaoVoltar = document.querySelector('.botao_voltar');

const caixa_bolsa = document.querySelector('.caixa_bolsa');
const caixa_lutar = document.querySelector('.caixa_lutar');
const caixa_pokemon = document.querySelector('.caixa_pokemons');

 
const barraVidaPokemonJogador = document.querySelector('.barra_vida_pokemon_jogador');

const barraVidaPokemonAdversario = document.querySelector('.barra_vida_pokemon_adversario');

const pixelBarraVida = getComputedStyle(barraVidaPokemonAdversario).width.slice(0, -2);

async function alterarBarraVidaPokemon(dano, jogadorAtacando) {

    if (!jogadorAtacando) {
        const pixelVidaAtualJogador = Math.round(((equipeJogador[pokemonEmCombateAtual].hpAtual - dano) / equipeJogador[pokemonEmCombateAtual].hpMax)*pixelBarraVida);

        barraVidaPokemonJogador.style.width = `${pixelVidaAtualJogador}px`;
    
        if((equipeJogador[pokemonEmCombateAtual].hpAtual - dano) <= 0) {
            //renderizarPokemon(pokemonAleatorio(), null, equipeAdversario[0]);
            barraVidaPokemonJogador.style.width = `${pixelBarraVida}px`;
            barraVidaPokemonJogador.style.backgroundColor = 'green';
            return;
        }

        const porcentagemVidaJogador = Math.round(((equipeJogador[pokemonEmCombateAtual].hpAtual - dano) / equipeJogador[pokemonEmCombateAtual].hpMax)*100);
    
        if (porcentagemVidaJogador > 20 && porcentagemVidaJogador <= 50) {
            barraVidaPokemonJogador.style.backgroundColor = 'yellow';
        }
        if (porcentagemVidaJogador <= 20) {
            barraVidaPokemonJogador.style.backgroundColor = 'red';
        }
        
        equipeJogador[pokemonEmCombateAtual].hpAtual -= dano;
        return;
    }

    const pixelVidaAtualAdversario = Math.round(((equipeAdversario[0].hpAtual - dano) / equipeAdversario[0].hpMax)*pixelBarraVida);

    barraVidaPokemonAdversario.style.width = `${pixelVidaAtualAdversario}px`;

    if((equipeAdversario[0].hpAtual - dano) <= 0) {
        await renderizarPokemon(pokemonAleatorio(), null, equipeAdversario[0]);
        entrarEmCombate(0, false);
        barraVidaPokemonAdversario.style.width = `${pixelBarraVida}px`;
        barraVidaPokemonAdversario.style.backgroundColor = 'green';
        return;
    }

    const porcentagemVidaAdversario = Math.round(((equipeAdversario[0].hpAtual - dano) / equipeAdversario[0].hpMax)*100);

    if (porcentagemVidaAdversario > 20 && porcentagemVidaAdversario <= 50) {
        barraVidaPokemonAdversario.style.backgroundColor = 'yellow';
    }
    if (porcentagemVidaAdversario <= 20) {
        barraVidaPokemonAdversario.style.backgroundColor = 'red';
    }

    equipeAdversario[0].hpAtual -= dano;
}

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

const iconPokemon1Jogador = document.querySelector('.icon_pokemon1_jogador');
const nomePokemon1Jogador = document.querySelector('.nome_pokemon1_jogador');
const sexoPokemon1Jogador = document.querySelector('.sexo_pokemon1_jogador');
const iconPokemon2Jogador = document.querySelector('.icon_pokemon2_jogador');
const nomePokemon2Jogador = document.querySelector('.nome_pokemon2_jogador');
const sexoPokemon2Jogador = document.querySelector('.sexo_pokemon2_jogador');

function mostrarPokemonBolsa() {
    iconPokemon1Jogador.src = equipeJogador[0].icon;
    nomePokemon1Jogador.textContent = equipeJogador[0].nome;
    sexoPokemon1Jogador.textContent = equipeJogador[0].sexo;

    iconPokemon2Jogador.src = equipeJogador[1].icon;
    nomePokemon2Jogador.textContent = equipeJogador[1].nome;
    sexoPokemon2Jogador.textContent = equipeJogador[1].sexo;
}

botaoLutar.addEventListener('click', () => {
    caixa_lutar.style.display = 'flex';
    esconderBotoesAcoes();
});
botaoBolsa.addEventListener('click', () => {
    caixa_bolsa.style.display = 'flex';
    dinheiroJogador.textContent = bolsaJogador[0].quantidade;
    numPokeballJogador.textContent = bolsaJogador[1].quantidade;
    numGreatballJogador.textContent = bolsaJogador[2].quantidade;
    numUltraballJogador.textContent = bolsaJogador[3].quantidade;
    esconderBotoesAcoes();
});
botaoFugir.addEventListener('click', async () => {
    await renderizarPokemon(pokemonAleatorio(), null, equipeAdversario[0]);
    entrarEmCombate(0, false);
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







function ataquePokemon(escolhaAtaque, jogador) {
    if (jogador) {
        const ataqueAtual = equipeJogador[pokemonEmCombateAtual].ataques[`ataque${escolhaAtaque}`];

        if (ataqueAtual.dano === '') {
            console.log('fudeu');
            return;
        }

        alterarBarraVidaPokemon(ataqueAtual.dano, true);
    }
}

ataque1Jogador.addEventListener('click', () => {
    ataquePokemon(1, true);
});
ataque2Jogador.addEventListener('click', () => {
    ataquePokemon(2, true);
});
ataque3Jogador.addEventListener('click', () => {
    ataquePokemon(3, true);
});
ataque4Jogador.addEventListener('click', () => {
    ataquePokemon(4, true);
});







const todosPokemonsBallJogador = [
    document.querySelector('.pokemon1_ball_jogador'),
    document.querySelector('.pokemon2_ball_jogador'),
    document.querySelector('.pokemon3_ball_jogador'),
    document.querySelector('.pokemon4_ball_jogador'),
    document.querySelector('.pokemon5_ball_jogador'),
    document.querySelector('.pokemon6_ball_jogador')
];

const dinheiroJogador = document.querySelector('.dinheiro_jogador');
const numPokeballJogador = document.querySelector('.num_pokeball_jogador');
const numGreatballJogador = document.querySelector('.num_greatball_jogador');
const numUltraballJogador = document.querySelector('.num_ultraball_jogador');

const botaoUsarPokeball = document.querySelector('.pokeball');
const botaoUsarGreatball = document.querySelector('.greatball');
const botaoUsarUltraball = document.querySelector('.ultraball');

const botaoComprarPokeballs = document.querySelector('.botao_comprar_pokeball');
const botaoComprarGreatballs = document.querySelector('.botao_comprar_greatball');
const botaoComprarUltraballs = document.querySelector('.botao_comprar_ultraball');



function mostradorPokemonEquipe(tipoBall, pokemonAtual) {
    todosPokemonsBallJogador[pokemonAtual].textContent = 'O';

    switch (tipoBall) {
        case 'pokeball':
            todosPokemonsBallJogador[pokemonAtual].style.color = 'red';
            break;
        case 'greatball':
            todosPokemonsBallJogador[pokemonAtual].style.color = 'blue';
            break;
        case 'ultraball':
            todosPokemonsBallJogador[pokemonAtual].style.color = 'yellow';
            break;
    }
}


async function capturarPokemon(tipoBall, quantidadeBall) {
    if (quantidadeBall <= 0) return;

    const numeroAleatorio = Math.floor(Math.random() * 101);
    let probabilidadeCapturar = 0;

    switch (tipoBall) {
        case 'pokeball':
            probabilidadeCapturar = 50;
            bolsaJogador[1].quantidade--;
            break;
        case 'greatball':
            probabilidadeCapturar = 70;
            bolsaJogador[2].quantidade--;
            break;
        case 'ultraball':
            probabilidadeCapturar = 100;
            bolsaJogador[3].quantidade--;
            break;
    }
    
    if (probabilidadeCapturar < numeroAleatorio) return;

    let espacoDesocupadoEquipe = 0;
    equipeJogador.some((elemento) => {
        if (elemento.nome !== '') espacoDesocupadoEquipe++;
    });

    if (espacoDesocupadoEquipe !== 6) {
        await renderizarPokemon(equipeAdversario[0].id, equipeJogador[espacoDesocupadoEquipe], null);
        mostradorPokemonEquipe(tipoBall, espacoDesocupadoEquipe);
    }
    console.log(espacoDesocupadoEquipe)
    console.log(equipeJogador)

    await renderizarPokemon(pokemonAleatorio(), null, equipeAdversario[0]);
    entrarEmCombate(0, false);
}


botaoUsarPokeball.addEventListener('click', () => {
    capturarPokemon('pokeball', bolsaJogador[1].quantidade);
    numPokeballJogador.textContent = bolsaJogador[1].quantidade;
});
botaoUsarGreatball.addEventListener('click', () => {
    capturarPokemon('greatball', bolsaJogador[2].quantidade);
    numGreatballJogador.textContent = bolsaJogador[2].quantidade;

});
botaoUsarUltraball.addEventListener('click', () => {
    capturarPokemon('ultraball', bolsaJogador[3].quantidade);
    numUltraballJogador.textContent = bolsaJogador[3].quantidade;

});

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