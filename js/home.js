document.addEventListener('DOMContentLoaded',preenchePlacares);

function preenchePlacares() {
    let total = 0;
    let acertos = 0;
    let erros = 0; 
    let encontrouStorage = false;
    let placar = document.querySelector(".placar");
    let unidades = document.querySelectorAll(".unidade");
    unidades.forEach(unidade => {
        let quadros = unidade.querySelectorAll(".quadro");
        quadros.forEach(quadro => {
            let titUnidade = unidade.firstElementChild.innerHTML;
            let numSessao = quadro.firstElementChild.innerHTML;
            let pagina = titUnidade + numSessao;
            let storageAlternativas = JSON.parse(localStorage.getItem(pagina));
            if(storageAlternativas) {
                encontrouStorage = true;
                var alternativa = innerHTML = storageAlternativas[1];
                quadro.querySelector(".total").innerHTML = alternativa.placar.total;
                quadro.querySelector(".acertos").innerHTML = alternativa.placar.acertos;
                quadro.querySelector(".erros").innerHTML = alternativa.placar.erros;
                quadro.querySelector(".table").style.display = "block";
                total += alternativa.placar.total;
                acertos += alternativa.placar.acertos;
                erros += alternativa.placar.erros;
            }
        });
    });
    if(encontrouStorage){
        document.querySelector(".esconder-placar").classList.remove("esconder-placar");
        placar.querySelector("#total").innerHTML = total;
        placar.querySelector("#acertos").innerHTML = acertos;
        placar.querySelector("#erros").innerHTML = erros;
    } else {
        document.querySelector(".esconder-placar").classList.add("esconder-placar");
    }
}