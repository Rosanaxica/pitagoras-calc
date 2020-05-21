var campoSelecionado = '';
var catetoOposto = '';
var catetoAdjacente = '';
var resultadoOposto = ''
var resultadoFinal = ''

var resultadoFinal = document.getElementById('resultadoFinal');
var resultadoOposto = document.getElementById('resultadoCatetoOposto')
var resultadoAdjacente = document.getElementById('resultadoCatetoAdjacente')

function pegaCampoClicado(campo) {
    campoSelecionado = campo.id;

}

function pegaValor(botao) {
    let clicado = botao.innerHTML;
    mostraValor(clicado);
}

function pegaValorDigitado() {
    let txt;

    if (campoSelecionado != '') {
        if (campoSelecionado == 'catetoOposto') {
            catetoOposto = '';
        } else { catetoAdjacente = ''; }
        txt = document.getElementById(campoSelecionado).value;//<<<<<pega o valor do campo selecionado
        if (txt != '') {

            mostraValor(txt)//<<<<<envia valor como parametro
        }
        else {
            limpaCampos()
        }

    }

}

function mostraValor(valor) {

    let campoTxt = document.getElementById(campoSelecionado)//<<<pega campo de texto

    if (campoSelecionado == 'catetoOposto') {
        catetoOposto = catetoOposto + valor; ///pega a varivel preenchida
        campoTxt.value = catetoOposto////e coloca no campo de texto o valor da variavel
        resultadoOposto.innerText = retornaValorCalculado(catetoOposto)//coloca o resutado ao quadrado no campo  de resultado
        resultadoOposto.classList.add("bottom")//
    } else {
        catetoAdjacente = catetoAdjacente + valor;
        campoTxt.value = catetoAdjacente;
        resultadoAdjacente.innerText = retornaValorCalculado(catetoAdjacente)
        resultadoAdjacente.classList.add("bottom")
    }

    if (catetoOposto != '' && catetoAdjacente != '') {

        enviaDados(catetoOposto, catetoAdjacente);

    }
}

function retornaValorCalculado(valorCateto) {
    let resultado = Math.pow(valorCateto, 2)
    return resultado
}

function limpaCampos() {
    document.getElementById(campoSelecionado).value = "";
    resultadoFinal.innerText = '';
    resultadoFinal.classList.remove("bottom");

    if (campoSelecionado == 'catetoOposto') {
        catetoOposto = '';
        resultadoOposto.innerText = '';
        resultadoOposto.classList.remove("bottom")

    } else {
        catetoAdjacente = '';
        resultadoAdjacente.innerText = '';
        resultadoAdjacente.classList.remove("bottom")

    }

}

function enviaDados(cateto1, cateto2) {
    let resultado = 0;
    let dado = {
        "cat_op": parseInt(cateto1),
        "cat_adj": parseInt(cateto2),
    }
    console.log(JSON.stringify(dado))
    fetch('https://atlas-231814.appspot.com/calcula',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dado)
        }).then(function (response) {
            return response.json();

        }).then(function (data) {
            resultado = data.hip;

            resultadoFinal.innerText = resultado.toFixed(5)
            resultadoFinal.classList.add("bottom");

        });

}
function changeColor() {

}