
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumerosSecretos = [];
let totalDeNumerosSecretosGerados = 50;
let numeroAleatorio = numeroSecreto();
let tentativas = 1;
exibirMensagemNaTela();

console.log(numeroAleatorio);

function numeroSecreto(){
    let numeroAleatorio = parseInt(Math.random() *totalDeNumerosSecretosGerados +1);
    let totalDeElementosDaLista = listaNumerosSecretos.length;
    
    if (totalDeElementosDaLista == 3){
        listaNumerosSecretos=[];
    }

    if(listaNumerosSecretos.includes(numeroAleatorio)){
        return numeroSecreto();
    } else{
        listaNumerosSecretos.push(numeroAleatorio);
        console.log(listaNumerosSecretos);
        return numeroAleatorio;
    }
}    

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroAleatorio){
        atualizaPalavra = tentativas == 1 ? 'tentativa' : 'tentativas'
        atualizaMensagem = `Você descobriu o número secreto em ${tentativas} ${atualizaPalavra}`;
        
        atualizaTextoNaTela('h1', 'Acertou !!!');
        atualizaTextoNaTela('p', atualizaMensagem);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if(chute > numeroAleatorio){
        atualizaTextoNaTela('p', 'O número secreto é menor !');
    } else {
        atualizaTextoNaTela('p', 'O número secreto é maior !');
    }
    tentativas++;
    limpaCampo();
    console.log(chute == numeroAleatorio);
}

function atualizaTextoNaTela(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
   
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function limpaCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo(){
    numeroAleatorio = numeroSecreto();
    limpaCampo();
    tentativas = 1;
    exibirMensagemNaTela();
   
}   

function exibirMensagemNaTela(){
    atualizaTextoNaTela('h1', 'Jogo do número Secreto');
    atualizaTextoNaTela('p', `Escolha um número entre 1 e ${totalDeNumerosSecretosGerados}`);
}

