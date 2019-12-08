var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var tempoMobile = 0;
var criaMosquitoTempo = 1500;

// verificar se é mobile
function detectarMobile() {
	if (
		navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	) {
		tempoMobile = 250;
	}
}
detectar_mobile();

// recuperar o nivel
var nivel = window.location.search;
// limpar o '?'
nivel = nivel.replace("?", "");
if (nivel === "normal") {
	criaMosquitoTempo = 1500 - tempoMobile;
} else if (nivel === "dificil") {
	criaMosquitoTempo = 1000 - tempoMobile;
} else if (nivel === "chucknoris") {
	criaMosquitoTempo = 750 - tempoMobile;
}
{
}
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight;
	largura = window.innerWidth;

	console.log(altura, largura);
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(() => {
	tempo -= 1;

	if (tempo < 0) {
		clearInterval(cronometro);
		clearInterval(criaMosquito);
		window.location.href = "./vitoria.html";
	} else {
		// seta o tempo restante para o cronometro
		document.getElementById("cronometro").innerHTML = tempo;
	}
}, 1000);
// Criado uma função apra ser chamada depois, pois se deixar no title não tem body para ser chamado
function posicaoRandomica() {
	// remover mosquito anterior (caso exista)
	if (document.getElementById("mosquito")) {
		document.getElementById("mosquito").remove();

		if (vidas > 3) {
			window.location.href = "./fim_de_jogo.html";
		} else {
			// pegando a img pelo id e modificando o src
			document.getElementById("vida" + vidas).src =
				"./imagens/coracao_vazio.png";
			vidas++;
		}
	}

	// randomizar a aparição dos mosquitos com o limitar da pagina subtraindo -90
	//  para não ultrapassar, ja que a contagem da img é do ponto esquerto superior
	var posicaoX = Math.floor(Math.random() * largura) - 90;
	var posicaoY = Math.floor(Math.random() * altura) - 90;
	// Evitar que fique negativa a posição
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	console.log(posicaoX, posicaoY);

	// criar elemento html
	var mosquito = document.createElement("img");
	mosquito.src = "./imagens/mosca.png";
	mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
	// definir posição
	mosquito.style.left = posicaoX + "px";
	mosquito.style.top = posicaoY + "px";
	mosquito.style.position = "absolute";
	mosquito.id = "mosquito";
	mosquito.onclick = function() {
		this.remove();
	};

	document.body.appendChild(mosquito);
}

// função para fazer o mosquito ficar de varios tamanhos
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3);
	// Nao precisa colocar break pois a funçao return ja é a ultima decisao
	switch (classe) {
		case 0:
			return "mosquito1";
		case 1:
			return "mosquito2";
		case 2:
			return "mosquito3";
	}
}

//  função para fazer o mosquito virar para o lado esquerdo e direito
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2);
	// Nao precisa colocar break pois a funçao return ja é a ultima decisao
	switch (classe) {
		case 0:
			return "ladoA";
		case 1:
			return "ladoB";
	}
}
