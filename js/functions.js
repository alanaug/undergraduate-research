var engine = {
    "cores": ['panela','tesoura','castelo','janela','buzina','dente','martelo','presente','vassoura','cola','bola','piscina'],
    "hexadecimais":{
      'panela':'url(https://cdn-icons-png.flaticon.com/512/2728/2728648.png)',
      'tesoura':'url(https://cdn-icons-png.flaticon.com/512/124/124818.png)',
      'castelo': 'url(https://cdn-icons-png.flaticon.com/512/2228/2228433.png)',
      'janela':'url(https://cdn-icons-png.flaticon.com/512/1670/1670079.png)',
      'buzina':'url(https://cdn-icons-png.flaticon.com/512/6647/6647080.png)',
      'dente':'url(https://cdn-icons-png.flaticon.com/512/4866/4866258.png)',
      'martelo':'url(https://cdn-icons-png.flaticon.com/512/1815/1815742.png)',
      'presente':'url(https://cdn-icons-png.flaticon.com/512/4530/4530656.png)',
      'vassoura':'url(https://cdn-icons-png.flaticon.com/512/1669/1669005.png)',
      'cola':'url(https://cdn-icons-png.flaticon.com/512/1685/1685426.png)',
      'bola':'url(https://cdn-icons-png.flaticon.com/512/53/53283.png)',
      'piscina':'url(https://cdn-icons-png.flaticon.com/512/2570/2570723.png)',
    },
    "moedas":0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearCor(){
  var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
  var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
  var nomeCorSorteada = engine.cores[indexCorSorteada];

  legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

  return engine.hexadecimais[nomeCorSorteada];
}


function aplicarCorNaCaixa(nomeDaCor){
  var caixaDasCores = document.getElementById('cor-atual');
  
  caixaDasCores.style.backgroundImage = nomeDaCor
  caixaDasCores.style.backgroundSize = "100%";
  caixaDasCores.style.margin = "30px";

}


function atualizaPontuacao(valor){
  var pontuacao = document.getElementById('pontuacao-atual');

  engine.moedas += valor;

  if(valor < 0){
    audioErrou.play();
  }else{
    audioMoeda.play();
  }

  pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())
//API DE RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = "pt-BR";


  gravador.onstart = function(){
    btnGravador.innerText = "Estou Ouvindo";
    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";
  }

  gravador.onend = function(){
    btnGravador.innerText = "Responder";
    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
  }

  gravador.onresult = function(event){
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

    if(transcricaoAudio ===  respostaCorreta){
      atualizaPontuacao(1);
    }else{
      atualizaPontuacao(-1);
    }

    aplicarCorNaCaixa(sortearCor());

  }


}else{
  alert('não tem suporte');
}


btnGravador.addEventListener('click', function(e){
  gravador.start();
})











































































