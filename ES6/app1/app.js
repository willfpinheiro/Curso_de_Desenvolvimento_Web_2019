class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano;
		this.mes = mes;
		this.dia = dia;
		this.tipo = tipo;
		this.descricao = descricao;
		this.valor = valor;
	}

	validarDados() {
		//percorre todos os atributos do objeto despesa
		for (const atributosDespesas in this) {
			if (
				this[atributosDespesas] == undefined ||
				this[atributosDespesas] == "" ||
				this[atributosDespesas] == null
			) {
				return false;
			}
			return true;
		}
	}
}

class Bd {
	//contruindo a sequncia de ids no momento da criação da classe BD
	constructor() {
		let id = localStorage.getItem("id");

		if (id === null) {
			localStorage.setItem("id", 0);
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem("id");
		return parseInt(proximoId) + 1;
	}
	gravar(d) {
		let id = this.getProximoId();

		//cadastra a despesa no local storage
		localStorage.setItem(id, JSON.stringify(d));

		//seta informaçao da chave id
		localStorage.setItem("id", id);
	}

	recuperarTodosRegistros() {
		//ARRAY DESPESAS
		let despesas = Array();

		let id = localStorage.getItem("id");
		//recuperar todas as despesas cadastradas em localstorege

		for (let varrerID = 1; varrerID <= id; varrerID++) {
			//recuperar a despesa
			const despesa = JSON.parse(localStorage.getItem(varrerID));

			//verificar se possui itens que foram pulados/removidos
			if (despesa === null) {
				//para o laço nese momento e recomeça
				continue;
			}

			despesa.id = varrerID;
			despesas.push(despesa);
		}

		return despesas;
	}
	// para economizar codigo, usamos a classe que ja busca todos os registros
	pesquisar(despesa) {
		let despesasFiltradas = Array();
		despesasFiltradas = this.recuperarTodosRegistros();

		console.log(despesa);

		console.log(despesasFiltradas);

		// ano
		// Coloca a informação novamente no despesas, para somar com os novos filtros
		if (despesa.ano != "") {
			despesasFiltradas = despesasFiltradas.filter(
				(d) => d.ano == despesa.ano
			);
		}

		// mes
		if (despesa.mes != "") {
			despesasFiltradas = despesasFiltradas.filter(
				(d) => d.mes == despesa.mes
			);
		}

		// dia
		if (despesa.dia != "") {
			despesasFiltradas = despesasFiltradas.filter(
				(d) => d.dia == despesa.dia
			);
		}

		// tipo
		if (despesa.tipo != "") {
			despesasFiltradas = despesasFiltradas.filter(
				(d) => d.tipo == despesa.tipo
			);
		}

		// descricao
		if (despesa.descricao != "") {
			despesasFiltradas = despesasFiltradas.filter(
				(d) => d.descricao == despesa.descricao
			);
		}

		// valor
		if (despesa.valor != "") {
			despesasFiltradas = despesasFiltradas.filter(
				(d) => d.valor == despesa.valor
			);
		}
		return despesasFiltradas;
	}

	remover(id) {
		localStorage.removeItem(id);
	}
}

let bd = new Bd();

function cadastrarDespesa() {
	let ano = document.getElementById("ano");
	let mes = document.getElementById("mes");
	let dia = document.getElementById("dia");
	let tipo = document.getElementById("tipo");
	let descricao = document.getElementById("descricao");
	let valor = document.getElementById("valor");

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	);
	function mudaModal(
		textoTitulo,
		textoModal,
		corTitulo,
		corBotao,
		textoBotao
	) {
		$("#modalRegistraDespesa").modal("show"); // para chamar seu modal

		$("#tituloModal").html(textoTitulo); //muda conteudo do titulo
		document.getElementById("tituloDivModal").className = corTitulo; //muda cor do texto

		$("#conteudoModal").html(textoModal); //muda conteudo do texto

		document.getElementById("botaoVoltar").className = corBotao; //muda cor do botão
		$("#botaoVoltar").html(textoBotao); // muda o texto do botão
	}
	if (despesa.validarDados()) {
		bd.gravar(despesa);

		mudaModal(
			"Registro inserido com sucesso",
			"Despesa foi cadastrada com sucesso",
			"modal-header text-success",
			"btn btn-success",
			"Voltar"
		);
		// Limpa os Campos
		ano.value = "";
		mes.value = "";
		dia.value = "";
		tipo.value = "";
		descricao.value = "";
		valor.value = "";
	} else {
		//chamar a função modal que foi traga do bootstrap
		mudaModal(
			"Erro na inclusão do registro",
			"Erro na gravação, verifique se todos os campos foram inseridos corretamente",
			"modal-header text-danger",
			"btn btn-danger",
			"Voltar e corrigir"
		);
	}
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
	if (despesas.length == 0 && filtro == false) {
		despesas = bd.recuperarTodosRegistros();
	}

	// selecionando o elemento tbady da tabela
	var listaDespesas = document.getElementById("listaDespesas");
	listaDespesas.innerHTML = "";

	// percorrer o array despesas, listando cada despesa de forma dinamica
	despesas.forEach(function (d) {
		// criando a linha (tr)
		let linha = listaDespesas.insertRow();

		// criar as colunas (td) iniciando em 0
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

		//ajustar o tipo
		switch (d.tipo) {
			case "1":
				d.tipo = "Alimentação";
				break;
			case "2":
				d.tipo = "Educação";
				break;
			case "3":
				d.tipo = "Lazer";
				break;
			case "4":
				d.tipo = "Saúde";
				break;
			case "5":
				d.tipo = "Transporte";
				break;
		}
		linha.insertCell(1).innerHTML = d.tipo;

		linha.insertCell(2).innerHTML = `${d.descricao}`;
		linha.insertCell(3).innerHTML = `R$ ${d.valor}`;

		// Criar botão exclusao
		let btnExclusao = document.createElement("button");
		btnExclusao.className = "btn btn-danger";
		btnExclusao.innerHTML = '<i class="fas fa-times"></i>';
		btnExclusao.id = `idDespesa_${d.id}`;
		btnExclusao.onclick = function () {
			// limpar campo antes, para mandar somente a id para o banco
			let id = this.id.replace("idDespesa_", "");

			// remover da base
			bd.remover(id);
			window.location.reload();

			alert(`Despesa referente a ${d.tipo} excluída`);
		};
		linha.insertCell(4).append(btnExclusao);

		console.log(d);
	});
}

function pesquisarDespesa() {
	let ano = document.getElementById("ano").value;
	let mes = document.getElementById("mes").value;
	let dia = document.getElementById("dia").value;
	let tipo = document.getElementById("tipo").value;
	let descricao = document.getElementById("descricao").value;
	let valor = document.getElementById("valor").value;

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

	let despesas = bd.pesquisar(despesa);

	carregaListaDespesas(despesas, true);
}
