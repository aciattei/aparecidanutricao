var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");



for (var i = 0; i < pacientes.length; i++) {

  var paciente = pacientes[i];

  var tdPeso = paciente.querySelector(".info-peso");
  var peso = tdPeso.textContent;


  var tdAltura = paciente.querySelector(".info-altura");
  var altura = tdAltura.textContent;

  var tdImc = paciente.querySelector(".info-imc");

  var pesoValido = validaPeso(peso);
  var alturaValida = validaAltura(altura);
  if (!pesoValido) {
    console.log("Peso Inválido");
    pesoValido = false;
    tdImc.textContent = ("Peso Inválido");
    paciente.classList.add("paciente-invalido");
  }

  if (!alturaValida) {
    console.log("Altura Inválida");
    alturaValida = false;
    tdImc.textContent("Altura Inválida");
    paciente.classList.add("paciente-invalido");
  }

  if (pesoValido && alturaValida) {
    var imc = calculaImc(peso, altura);
    tdImc.textContent = imc;
  }

}

function validaPeso(peso) {
  return !(peso <= 0 || peso >= 1000)  
}

function validaAltura(altura) {
  return !(altura <= 0 || altura >= 4.0)   
}

function calculaImc(peso, altura) {

  var imc = 0;

  imc = peso / (altura * altura);

  return imc.toFixed(2);

}
var botaoAdicionar = document.querySelector("#adicionar-paciente");


botaoAdicionar.addEventListener("click", function (event) {
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");

  var paciente = obtemInformacoesPacientes(form);

  var pacienteTr = montaTr(paciente);

  var erros = validaPaciente(paciente);
  console.log(erros);
  if (erros.length > 0) {
    exibeMensagensDeErro(erros);
    return false;
  }

  if (!validaPaciente(paciente)) {
    console.log("Peso inválido");
    return;
  }


  var tabela = document.querySelector("#tabela-pacientes");

  tabela.appendChild(pacienteTr);

  form.reset();

  var mensagemErro = document.querySelector("#mensagens-erro");
  mensagemErro.innerHTML = "";

});

function obtemInformacoesPacientes(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value),
  }

  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement("tr")

  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"))
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd(dado, classe) { var td = document.createElement("td"); td.textContent = dado; td.classList.add("classe"); return td; }

function validaPaciente(paciente) {
  console.log(paciente)
  var erros = [];

  if (paciente.nome.length == 0) {
    erros.push("O nome não pode estar em branco");
  }

  if (paciente.peso.length == 0) {
    erros.push("O peso não pode estar em branco");
  }

  if (paciente.gordura.length == 0) {
    erros.push("A gordura não pode estar em branco");
  }

  if (paciente.altura.length == 0) {
    erros.push("A altura não pode estar em branco");
  }

  if (!validaPeso(paciente.peso)) {
    erros.push("Peso é inválido");
  }

  if (!validaAltura(paciente.altura)) {
    erros.push("Altura é inválida");
  }

  return erros;
}

function exibeMensagensDeErro(erros) {
  var ul = document.querySelector("#mensagens-erro"); 
  ul.innerHTML = "";

  erros.forEach(function (erro) {
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });

}
