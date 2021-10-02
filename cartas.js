
var divCartasJogadores = document.getElementsByClassName("cartaSorteada");
var cartasDiv = document.getElementById("cartasDisplayID");

class CARTAS {
    constructor(){
        this.baralho = new Array();
        this.cartaJogadores = new Array();
    }

    getCartaJogadores(){
        return this.cartaJogadores;
    };

    addCartaAoBaralho(nomeP, ataqueP, defesaP, magiaP, imagemP){
        var carta = {
            nome: nomeP,
            imagem: imagemP,
            atributos: {
                ataque: ataqueP,
                defesa: defesaP,
                magia: magiaP
            }
        }
        this.baralho.push(carta);
    };

    sortearCartasJogadores(){
        var numeroCartaSorteada = parseInt(Math.random() * this.baralho.length);
        this.cartaJogadores[0] = this.baralho[numeroCartaSorteada];

        do{
            numeroCartaSorteada = parseInt(Math.random() * this.baralho.length);
            this.cartaJogadores[1] = this.baralho[numeroCartaSorteada]; 
        }while(this.cartaJogadores[0] == this.cartaJogadores[1]);
    };

    desenharCarta(carta, idAtaque, idDefesa, idMagia, idLabelMagia, nomeInputs, classeDiv){
        var div = document.createElement("div");

        div.className = classeDiv;

        div.innerHTML = `<p>` + carta.nome + "<br><br><br><br><br><br></p>";
        
        div.innerHTML +=    `<input type="radio" class="inputAtaque" id=${idAtaque} name=${nomeInputs}>` + 
                            `<label for=${idAtaque}>Ataque: ${carta.atributos.ataque}</label><br>` +
                            `<input type="radio" class="inputDefesa" id=${idDefesa} name=${nomeInputs}>` + 
                            `<label for=${idDefesa}>Defesa: ${carta.atributos.defesa}</label><br>` +
                            `<input type="radio" class="inputMagia" id=${idMagia} name=${nomeInputs}>` + 
                            `<label for=${idMagia} id = ${idLabelMagia} >Magia: ${carta.atributos.magia}</label><br>`;
        
        div.style.backgroundImage = `url(${carta.imagem})`;
        cartasDiv.append(div);
    };

    addEventListenersAtributosCartasJogadores(classeAtaque, classeDefesa, classeMagia){
        var inputAtaque = document.getElementsByClassName(classeAtaque);
        var inputDefesa = document.getElementsByClassName(classeDefesa);
        var inputMagia  = document.getElementsByClassName(classeMagia);

        for(var X = 0 ; X < this.cartaJogadores.length ; X++){
            inputAtaque[X].addEventListener("click", criarDisplayDoAtributoAtaque);
            inputDefesa[X].addEventListener("click", criarDisplayDoAtributoDefesa);
            inputMagia[X] .addEventListener("click", criarDisplayDoAtributoMagia);
        }
    };
}