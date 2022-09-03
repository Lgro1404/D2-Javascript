var data
var questao = -1;
var respondido = false;
var pontos = 0;
function mostrarQuestao() {
    for(i = 0; i < document.getElementsByName("resposta").length; i++){
        if(document.getElementsByName("resposta")[i].checked){
            respondido = true;
            pontos += data[questao].options[i].value;
            console.log(pontos);
        }
    }
    if(respondido || questao < 0){
        var xObj = new XMLHttpRequest();
        xObj.open('GET', 'https://quiz-trainee.herokuapp.com/questions', true);
        xObj.onload = function(){
            data = JSON.parse(xObj.responseText);
            if(questao >= data.length){
                finalizarQuiz(data.length*3);
                return;
            }
            document.getElementById("titulo").innerHTML = data[questao].title;
            for(i = 1; i <= document.getElementsByName("resposta").length; i++){
                document.getElementById("q" + i).innerHTML = data[questao].options[i-1].answer;
            }
        }
        xObj.send();
        for(i = 0; i < document.getElementsByName("resposta").length; i++){
            document.getElementsByName("resposta")[i].checked = false;
            respondido = false;
        }
        questao++;
        document.getElementById("confirmar").innerHTML = "Próximo";
        document.getElementById("listaRespostas").classList.remove("hide");
    }
}

function finalizarQuiz(maxpts) {
    document.getElementById("confirmar").innerHTML="Refazer Quiz";
    document.getElementById("confirmar").onclick = reset;
    document.getElementById("listaRespostas").classList.add("hide");
    document.getElementById("resultBg").classList.remove("hide");
    document.getElementById("titulo").innerHTML = "Resultado:";
    document.getElementById("resultado").innerHTML = pontos*100/(maxpts) + "%";
    document.getElementById("resultBar").style.width = pontos*100/(maxpts) + "%";
}

function reset(){
    questao = -1;
    respondido = false;
    pontos = 0;
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultBg").classList.add("hide");
    document.getElementById("confirmar").innerHTML="Começar";
    document.getElementById("confirmar").onclick = mostrarQuestao;
    document.getElementById("titulo").innerHTML = "QUIZ DOS VALORES DA GTI";
}