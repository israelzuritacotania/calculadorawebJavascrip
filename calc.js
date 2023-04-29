let pantalla = document.querySelector(".pantalla input");
pantalla.value='';

let numeros = document.querySelectorAll(".numero");
numeros.forEach((numero) => {
  numero.addEventListener("click", () => {
    pantalla.value += numero.textContent;
  });
});

let operadores = document.querySelectorAll(".operador");
operadores.forEach((operator) => {
  operator.addEventListener("click", () => {
    let ultimoCaracter = pantalla.value[pantalla.value.length - 1];
    if (!isNaN(ultimoCaracter) || ultimoCaracter === ".") {
      pantalla.value += operator.textContent;
    }
  });
});

let decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  let ultimoNumero = pantalla.value.split(/[\+\-\*\/]/).pop();
  if (!ultimoNumero.includes(".")) {
    pantalla.value += ".";
  }
});

let igual = document.querySelector(".igual");
igual.addEventListener("click", () => {
  let ecuacion = pantalla.value;
  let primerCaracter = ecuacion.charAt(0)
  console.log(primerCaracter);
  let meSave="";
  if (isNaN(primerCaracter) ||ecuacion.includes("\u005E")||ecuacion.includes("E")) 
  {
   
    console.log(primerCaracter);
    let soloResultado=false;
    console.log(ecuacion);
    if(ecuacion.includes("√"))
    {
      ecuacion = ecuacion.replace(/√/g, "Math.sqrt(");
      meSave="raiz"
    }
    if(ecuacion.includes("log"))
    {
      ecuacion = ecuacion.replace(/log/g, "Math.log10(");
      meSave="log"
    }
    
    
    console.log(ecuacion);
    if(ecuacion.includes("\u005E"))
    {
      ecuacion = ecuacion.replace(/\u005E/g, "-");
      console.log(ecuacion);
      let listaNumeros = ecuacion.split("-");
      console.log(listaNumeros);
      ecuacion="Math.pow("+listaNumeros[0]+","+listaNumeros[1];
      console.log(ecuacion);
      meSave="pow"
    }
    
    if(ecuacion.includes("sin") || ecuacion.includes("cos") || ecuacion.includes("tan"))
    {
      if(ecuacion.includes("sin"))
      {
        meSave="sin"
      }
      if(ecuacion.includes("cos"))
      {
        meSave="cos"
      }
      if(ecuacion.includes("tan"))
      {
        meSave="tan"
      }

      ecuacion = ecuacion.replace(/sin/g, "Math.sin(");
      ecuacion = ecuacion.replace(/cos/g, "Math.cos(");
      ecuacion = ecuacion.replace(/tan/g, "Math.tan(");
      ecuacion = ecuacion+"* (Math.PI / 180)";
      
    }

    if(ecuacion.includes("E"))
    {
      ecuacion = ecuacion.replace(/E/g, "-");
      console.log(ecuacion);
      let listaNumeros = ecuacion.split("-");
      console.log(listaNumeros);
      ecuacion=listaNumeros[0]*Math.pow(10,listaNumeros[1]);
      soloResultado=true;
      console.log(ecuacion);
      meSave="E"
    }
 
    if(soloResultado)
    {
      ecuacion =ecuacion;
    }
    else
    {
      ecuacion =ecuacion+") ";
    }
      
    
    
    console.log(ecuacion);
  }
  else
  {
    meSave="ope"
  }
  
  try {
    let result = eval(ecuacion);
    
    console.log(result);
    if(Number.isInteger(result))
    {
      pantalla.value =(result);
    }
    else{
      
      if (result % 1 === 0) {
        
        pantalla.value =(result);
      } else {
        truncado = parseFloat(result.toFixed(10));
        pantalla.value =truncado;
      }

    }
    
    console.log(meSave);
    
    localStorage.setItem(meSave, result);
  } catch (error) {
    pantalla.value = "Error";
  }
});

let raizCuadrada = document.querySelector(".raiz-cuadrada");
raizCuadrada.addEventListener("click", () => {
  pantalla.value += "√";
});

let pi = document.querySelector(".pi");
pi.addEventListener("click", () => {
  pantalla.value="";
  pantalla.value =Math.PI;
});

let logaritmo = document.querySelector(".logaritmo");
logaritmo.addEventListener("click", () => {
  pantalla.value += "log";
});

let seno = document.querySelector(".seno");
seno.addEventListener("click", () => {
  pantalla.value += "sin";
});

let coseno = document.querySelector(".coseno");
coseno.addEventListener("click", () => {
  pantalla.value += "cos";
});

let tangente = document.querySelector(".tangente");
tangente.addEventListener("click", () => {
  pantalla.value += "tan";
});

let potencia = document.querySelector(".potencia");
potencia.addEventListener("click", () => {
  pantalla.value += "\u005E";
});

let factorial = document.querySelector(".xi");
factorial.addEventListener("click", () => {
  let ecuacion = pantalla.value;
      console.log(ecuacion);
      let resultado = 1;
      for (let i = ecuacion; i > 0; i--) {
        resultado *= i;
      }
      ecuacion=resultado.toString();
      pantalla.value=ecuacion;
      console.log(ecuacion);
      localStorage.setItem("xi", ecuacion);
});

let x2 = document.querySelector(".x2");
x2.addEventListener("click", () => {
  let ecuacion = pantalla.value;
  console.log(ecuacion);
      let resultado = ecuacion*ecuacion
      pantalla.value =resultado;
      console.log(ecuacion);
      localStorage.setItem("x2", resultado);
});

let exp = document.querySelector(".exp");
exp.addEventListener("click", () => {
  pantalla.value += "E";
});

let e = document.querySelector(".e");
e.addEventListener("click", () => {
  pantalla.value="";
  pantalla.value =Math.E;
});

let limpiar = document.querySelector(".limpiar");
limpiar.addEventListener("click", () => {
  pantalla.value = "";
});

var indiceActual = 0;
var claves = Object.keys(localStorage);
document.getElementById("mostrarDatos").addEventListener("click", function() {
  if (indiceActual < claves.length) {
    var clave = claves[indiceActual];
    var valor = localStorage.getItem(clave);
    pantalla.value=valor;
    indiceActual++;
  } else {
    pantalla.value="No hay más datos";
    location.reload()
  }
});