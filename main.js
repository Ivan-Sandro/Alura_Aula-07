

var classeCartas = new CARTAS();
var classeSistema = new SISTEMA(20, 20);

classeCartas.addCartaAoBaralho("Charmander"  , 6, 6, 6, "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f484215b-4e9a-42b5-9feb-77c3dec3a385/dala92b-9ecf2fc6-d8aa-4c90-b728-ef6509eebd90.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvaS9mNDg0MjE1Yi00ZTlhLTQyYjUtOWZlYi03N2MzZGVjM2EzODUvZGFsYTkyYi05ZWNmMmZjNi1kOGFhLTRjOTAtYjcyOC1lZjY1MDllZWJkOTAucG5nIn1dXX0.Z-SzfzJX39W98-GuoipoZ1XoYSjm3sNU-N6YYQQyxdU");
classeCartas.addCartaAoBaralho("Bulbassauro" , 6, 5, 7, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F974-9746413_how-to-draw-bulbasaur-pokemon-anime-easy-step.png&f=1&nofb=1");
classeCartas.addCartaAoBaralho("Squirtle"    , 6, 7, 5, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse154%2F17sp%2Fsection%2Fsect04%2Fcode%2Fimages%2Fsquirtle2.png&f=1&nofb=1");
classeCartas.addCartaAoBaralho("Pikachu"     , 7, 5, 6, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png");
classeCartas.addCartaAoBaralho("Caterpie"    , 7, 4, 7, "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.pokemonpets.com%2Fimages%2Fmonsters-images-300-300%2F10-Caterpie.png&f=1&nofb=1");
classeCartas.addCartaAoBaralho("Weedle"      , 7, 6, 5, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F9d%2F8f%2Ff5%2F9d8ff5b37f155e608a7ece166e9e82a6.png&f=1&nofb=1");
classeCartas.addCartaAoBaralho("Pidove"      , 7, 6, 5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/519.png");

var botaoSortearCartas = document.getElementById("buttonSortearCartaID");
var botoesAgirDiv = document.getElementById("botoesDisplayID");

botaoSortearCartas.addEventListener("click", clickSorteandoCartas);

function clickSorteandoCartas(){
    classeCartas.sortearCartasJogadores();

    classeCartas.desenharCarta(classeCartas.getCartaJogadores()[0], "ataquePlayer", "defesaPlayer", "magiaPlayer", "labelMagiaPlayerUm", "cartaJogador", "cartaSorteada");
    classeCartas.desenharCarta(classeCartas.getCartaJogadores()[1], "ataqueMaquina", "defesaMaquina", "magiaMaquina", "labelMagiaPlayerDois", "cartaMaquina", "cartaSorteada");

    classeCartas.addEventListenersAtributosCartasJogadores("inputAtaque", "inputDefesa", "inputMagia");

    classeSistema.atualizarDisplayHpPlayers();
    classeSistema.atualizarDivsDosJogadores(divCartasJogadores);

    botaoSortearCartas.disabled = true;
}

function criarDisplayDoAtributoAtaque(){

    botoesAgirDiv.innerHTML = "";
    var botaoAtacar = document.createElement("button");
    botaoAtacar.id = "botaoAtacar";
    botaoAtacar.type = "button";
    botaoAtacar.innerHTML = "ATACAR";
    
    botaoAtacar.onclick = function (){
        classeSistema.onClickBotaoAtributo(eventoAtaque, classeSistema.getJogadorTurnoAtual()); 
        controleDosHounds();
        
        botaoAtacar.disabled = true;
    }

    botoesAgirDiv.append(botaoAtacar);
}
function criarDisplayDoAtributoDefesa() {
    botoesAgirDiv.innerHTML = "";
    var botaoBloquear = document.createElement("button");
    
    botaoBloquear.id = "botaoBloquear";
    botaoBloquear.type = "button";
    botaoBloquear.innerHTML = "BLOQUEAR";

    botaoBloquear.onclick = function (){
        classeSistema.onClickBotaoAtributo(eventoDefesa, classeSistema.getJogadorTurnoAtual());
        controleDosHounds();

        botaoBloquear.disabled = true;
    }
    
    botoesAgirDiv.append(botaoBloquear);
}
function criarDisplayDoAtributoMagia() {
    botoesAgirDiv.innerHTML = "";
    var botaoAtacarMagia = document.createElement("button");
    var botaoBloquearMagia = document.createElement("button");
    
    botaoAtacarMagia.id = "botaoAtacarMagia";
    botaoAtacarMagia.type = "button";
    botaoAtacarMagia.innerHTML = "ATAQUE MAGICO";

    botaoBloquearMagia.id = "botaoBloquearMagia";
    botaoBloquearMagia.type = "button";
    botaoBloquearMagia.innerHTML = "BLOQUEIO MAGICO";

    botaoAtacarMagia.onclick = function (){
        classeSistema.onClickBotaoAtributo(eventoAtaqueMagico, classeSistema.getJogadorTurnoAtual());
        controleDosHounds();

        botaoAtacarMagia.disabled = true;
        botaoBloquearMagia.disabled = true;
    }
    
    botaoBloquearMagia.onclick = function (){
        classeSistema.onClickBotaoAtributo(eventoDefesaMagica, classeSistema.getJogadorTurnoAtual());
        controleDosHounds();

        botaoAtacarMagia.disabled = true;
        botaoBloquearMagia.disabled = true;
    }
    
    botoesAgirDiv.append(botaoAtacarMagia);
    botoesAgirDiv.append(botaoBloquearMagia);   
}

function controleDosHounds(){
    classeSistema.calculoDeDanoBloqueio(classeCartas.getCartaJogadores());
    classeSistema.somarTurno();
    classeSistema.atualizarDivsDosJogadores(divCartasJogadores);
    classeSistema.atualizarDisplayHpPlayers();
    classeSistema.seGameOver(divCartasJogadores);
}
