// variaveis que faram calculo do placar
let numAcertos = 0;
let numErros = 0;
let arrRespostas = [];
let arrForStorage = [arrRespostas];

// Verifica se ja tem storage salvo para preencher os campos
verificarStorage();

// Coloca fundo laranja a alternativa selecionada antes da confirmação
let alternativas = document.querySelectorAll('input[type=radio]');
alternativas.forEach((alternativa)=>{
    alternativa.addEventListener('change',selecionar);
});

// Adicionar funções aos botões principais
let btnConferir = document.querySelector("#conferir");
btnConferir.addEventListener('click',conferir);
let btnRefazer = document.querySelector("#refazer");
btnRefazer.addEventListener('click',resetLocalStorage);

function selecionar() {
    var alternativas = event.target.parentElement.parentElement.parentElement.querySelectorAll(".alternativa");
    alternativas.forEach(alternativa => {
        if(alternativa.firstElementChild != event.target){
            alternativa.classList.remove("selecionada");
        }
    });
    event.target.parentElement.classList.add("selecionada");
}

// Confere se todas as perguntas foram respondidas
function conferir() {
    let forms = document.querySelectorAll('form');
    let todosMarcados = true;
    
    let unidade = document.querySelector("#unidade").innerHTML;
    let sessao = document.querySelector("#sessao").innerHTML;
    let pagina = `${unidade}${sessao}`;
    
    forms.forEach(form => {
        if(form.querySelector('input[type=radio]:checked') == undefined) {
            todosMarcados = false;
        };
    });
    if(todosMarcados) {
        forms.forEach(form => {
            validarRespostas(form);
        });
        placar();
        adicionarElementoAoEstorage(pagina, JSON.stringify(arrForStorage));
        document.querySelector("#conferir").disabled = true;
        document.querySelector("#refazer").disabled = false;
    } else {
        alert("Marque todas as alternativas");
    }
}

// Verifica quais respostas estão corretas ou não
function validarRespostas(form) {
    let nodesTodasAsAlternativas = form.querySelectorAll('input[type=radio]');
    let nodeRespostaCerta = form.querySelector('input[value=certa]');
    let nodeRespostaSelecionada = form.querySelector('input[type=radio]:checked');
    // Desabilita altenativas após tentativa
    nodesTodasAsAlternativas.forEach(resposta => {
        resposta.disabled = true;
        // Remove o efeito laranja do mouse antes da seleção de todas as alternativas para um efeito neutro
        resposta.parentElement.classList.add("no-hover-effect");
        /// Muda cursor de pointer para default quando a pergunta ja foi respondida
        resposta.parentElement.parentElement.style.cursor = "default";
    });
    // Adiciona classe de estilo as respostas certas
    nodeRespostaCerta.parentElement.classList.add("certo");
    // remove efeito transparente para dar lugar ao efeito de resposta certa
    nodeRespostaCerta.parentElement.classList.remove("no-hover-effect");
    // Acrescenta placar e classe de estilo as respostas erradas
    if(nodeRespostaCerta == nodeRespostaSelecionada){
        numAcertos++;
    } else {
        numErros++;
        nodeRespostaSelecionada.parentElement.classList.add("errado");
        // remove efeito transparente para dar lugar ao efeito de resposta errada
        nodeRespostaSelecionada.parentElement.classList.remove("no-hover-effect");
    }
    arrRespostas.push(nodeRespostaSelecionada.value);
}


// Gera a tabela com o gabarito final
function placar(){
    let tablePlacar = document.querySelector(".placar");
    let tableCellTotal = document.querySelector("#total");
    let tableCellAcertos = document.querySelector("#acertos");
    let tableCellErros = document.querySelector("#erros");
    let objPlacar = {
        placar: {
            total: numAcertos + numErros,
            acertos: numAcertos,
            erros: numErros
        }
    }
    tableCellTotal.innerHTML = objPlacar.placar.total;
    tableCellAcertos.innerHTML = objPlacar.placar.acertos;
    tableCellErros.innerHTML = objPlacar.placar.erros;
    arrForStorage.push(objPlacar);
    tablePlacar.classList.remove("esconder-placar");
}

/**
 * codigos referente a storage 
 */

// Adiciona o nome de cada pagina no localstorage em um objeto com as respostas dadas dela
function adicionarElementoAoEstorage(key, item) {
    localStorage.setItem(key, item);
}
// Verificar e agregar storage
function verificarStorage() {
    let unidade = document.querySelector("#unidade").innerHTML;
    let sessao = document.querySelector("#sessao").innerHTML;
    let pagina = `${unidade}${sessao}`;
    let storageAlternativas = JSON.parse(localStorage.getItem(pagina));
    
    
    if(storageAlternativas) {
        document.querySelector("#conferir").disabled = true;
        // Seleciona todas as perguntas
        let perguntas = document.querySelectorAll("form");
        // Faz loop em cada uma e adiciona checked a resposta que esta igual no storage
        for (let index = 0; index < perguntas.length; index++) {
            // Seleciona todas as alternativas da pergunta corrente
            let arrAlternativas = perguntas.item(index).querySelectorAll("input[type=radio]");
            arrAlternativas.forEach(alternativa => {
                if(alternativa.value == storageAlternativas[0][index]) {
                    alternativa.checked = true;
                }
            });
        }
        // Efetua a correcao das perguntas
        conferir();
    } else if (storageAlternativas == null){
        document.querySelector("#refazer").disabled = true;
    }
}

// Reinicia o localstorege da pagina atual
function resetLocalStorage() {
    let unidade = document.querySelector("#unidade").innerHTML;
    let sessao = document.querySelector("#sessao").innerHTML;
    let pagina = `${unidade}${sessao}`;
    localStorage.removeItem(pagina);
    let alternativas = document.querySelectorAll("input[type=radio]");
    
    alternativas.forEach(alternativa => {
        alternativa.parentElement.classList.add("resetar-opcoes");
    });
    setTimeout(() => {
        location.reload();
    },200);
}
