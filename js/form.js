//* REMOVER PACIENTE
var pacientes = document.querySelectorAll(".paciente");

var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event){    event.target.parentNode.classList.add("fadeOut");
  setTimeout(function(){
    event.target.parentNode.remove();
  },500);
 
});

//FILTRAR PACIENTE

var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function(){
  console.log(this.value);
  var pacientes = document.querySelectorAll(".paciente");
  if(this.value.length >0){
    for(var i = 0; i < pacientes.length; i++){
      var paciente = pacientes[i];
      var tdNome = paciente.querySelector(".info-nome");
      var nome = tdNome.textContent;
      var expressao = new RegExp(this.value, "i");
        if(!expressao.test(nome)){
          paciente.classList.add("invisivel");
        }else{
          paciente.classList.remove("invisivel");
        }
      }
  }else{
    for(var i = 0; i < pacientes.length; i++){
      var paciente = pacientes[i];
      paciente.classList.remove("invisivel");
   }
  }
});

