
var mensagemDosTurnos = document.getElementById("turnoIndicador");

const eventoAtaque = "ATACAR";
const eventoDefesa = "BLOQUEIO";
const eventoDefesaMagica = "BLOQUEIOMAGICO";
const eventoAtaqueMagico = "ATAQUEMAGICO";

class SISTEMA{
    constructor(HpPlayerUmP, HpPlayerDoisP){
        this.hpPlayers = [HpPlayerUmP, HpPlayerDoisP];
        this.turno = 1;
        this.movimentoPlayers = [];
    }

    getJogadorTurnoAtual(){
        if(this.turno == 1 || this.turno == 4)
            return 0;
        else
            return 1;
    }
    
    onClickBotaoAtributo(atributoTipo, jogador){
        this.movimentoPlayers[jogador] = atributoTipo;
    }
    
    somarTurno(){
        this.turno++;
        if(this.turno > 4)
            this.turno = 1;
    }

    calculoDeDanoBloqueio(cartaJogadores){
        if(this.turno % 2 == 0){
            var mpAtribuidoPlayers = [0.3, 0.3];

            var danoAtaquePlayers = [0, 0];
            var danoBloqueadoPlayers = [0, 0];
            var danoRecebidoPlayers = [0, 0];

            var documentLabelMagiaPlayers = [document.getElementById("labelMagiaPlayerUm"), document.getElementById("labelMagiaPlayerDois")];

            var rollPlayers = [(parseInt(Math.random() * 100) + 1)/5, (parseInt(Math.random() * 100) + 1)/5]
            
            var XOposto;

            for(var X = 0 ; X < 2 ; X++){
                XOposto = 1 - (X % 2);

                if(this.movimentoPlayers[X] == eventoAtaqueMagico || this.movimentoPlayers[X] == eventoDefesaMagica){
                    mpAtribuidoPlayers[X] = parseInt(Math.random() * 3) + 1;

                    if(mpAtribuidoPlayers[X] > cartaJogadores[X].atributos.magia){
                        mpAtribuidoPlayers[X] = cartaJogadores[X].atributos.magia;
                        cartaJogadores[X].atributos.magia = 0;
                    }
                    else{
                        cartaJogadores[X].atributos.magia -= mpAtribuidoPlayers[X];
                    } 
                    documentLabelMagiaPlayers[X].innerHTML = "Magia: " + cartaJogadores[X].atributos.magia;
                    mpAtribuidoPlayers[X] /= 3;
                }

                if(this.movimentoPlayers[X] == eventoAtaque || this.movimentoPlayers[X] == eventoAtaqueMagico)
                    danoAtaquePlayers[X] = (rollPlayers[X] * mpAtribuidoPlayers[X] * cartaJogadores[X].atributos.ataque) / cartaJogadores[XOposto].atributos.defesa;
                
                if(this.movimentoPlayers[X] == eventoDefesa || this.movimentoPlayers[X] == eventoDefesaMagica)
                    danoBloqueadoPlayers[X] = (rollPlayers[X] * mpAtribuidoPlayers[X] * cartaJogadores[X].atributos.defesa) / cartaJogadores[XOposto].atributos.ataque;
            }

            for(var X = 0 ; X < 2 ; X++){
                XOposto = 1 - (X % 2);

                danoRecebidoPlayers[X] = danoAtaquePlayers[XOposto] - danoBloqueadoPlayers[X];
                
                if(danoRecebidoPlayers[X] < 0)danoRecebidoPlayers[X] = 0;
                
                this.movimentoPlayers[X] = [];
                this.hpPlayers[X] -= danoRecebidoPlayers[X];
            }
        }
    }
    atualizarDisplayHpPlayers(){
        var displayHpPlayers = document.getElementById("hpCartasDisplayID");
        displayHpPlayers.innerHTML = "";
        var divPlayerUm = document.createElement("div");
        var divPlayerDois = document.createElement("div");

        divPlayerUm.id = "hpDisplayPlayerUm";
        divPlayerUm.className = "displayHp";
        divPlayerUm.innerHTML = `<h2>HP: ${this.hpPlayers[0].toFixed(2)}</h2>`;

        divPlayerDois.id = "hpDisplayPlayerDois";
        divPlayerDois.className = "displayHp";
        divPlayerDois.innerHTML = `<h2>HP: ${this.hpPlayers[1].toFixed(2)}</h2>`;
        
        displayHpPlayers.append(divPlayerUm);
        displayHpPlayers.append(divPlayerDois);
    }
    seGameOver(divsJogadores){
        var playerVencedor = -1;
        if(this.hpPlayers[0] <= 0)
            playerVencedor = 0;
        
        if(this.hpPlayers[1] <= 0)
            playerVencedor = 1;
        
        if(this.hpPlayers[0] <= 0 && this.hpPlayers[1] <= 0)
            playerVencedor = 2;
        
        if(playerVencedor != -1){
            divsJogadores[0].className = "cartaSorteada disabledDiv";
            divsJogadores[1].className = "cartaSorteada disabledDiv";
        }

        switch(playerVencedor)
        {
            case 0:
                mensagemDosTurnos.innerHTML = "JOGADOR DOIS VENCEU!";  
            break;
                
            case 1:        
                mensagemDosTurnos.innerHTML = "JOGADOR UM VENCEU!";
            break;

            case 2:
                mensagemDosTurnos.innerHTML = "EMPATE!";
            break;
        }
    }
    atualizarDivsDosJogadores(divsJogadores){
        if(this.turno == 1 || this.turno == 4){
            divsJogadores[0].className = "cartaSorteada";
            divsJogadores[1].className = "cartaSorteada disabledDiv";
            if(this.turno == 1)
                mensagemDosTurnos.innerHTML = "Vez do Jogador 1";
            else
                mensagemDosTurnos.innerHTML = "Contra ataque do Jogador 1"
        }else{
            divsJogadores[0].className = "cartaSorteada disabledDiv";
            divsJogadores[1].className = "cartaSorteada";
            if(this.turno == 2)
                mensagemDosTurnos.innerHTML = "Contra ataque do Jogador 2"
            else
                mensagemDosTurnos.innerHTML = "Vez do Jogador 2";
        }
    }
}