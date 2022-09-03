function mostrarQuestao() {
    document.getElementById("confirmar").classList.add("hide");
    document.getElementById("listaRespostas").classList.remove("hide");
}
function loadClass(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "https://quiz-trainee.herokuapp.com/questions", true);
    httpRequest.send(null);
    httpRequest.onload = check(httpRequest);
}
function check(x){
    if (x.readyState === 4){
        alert("js succs");
    }
    else{
        alert(x.readyState);
    }
}
function finalizarQuiz() {
    
}