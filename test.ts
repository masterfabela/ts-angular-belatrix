let a = 'hola';
a = 'Holas';
a = 2;

let b: number = 10;
b = a;
b = 20;
b = 10 + 10;

const num1 = 10;
const num2 = 20;
b = num1 + num2;

function suma(num1: number, num2: number): number{
  return num1 + num2;
}

let anuValue: any = 10;
anuValue = 'hola';

suma(1,3);
suma(1,'3');


function sumaJavascriptVanilla(num1, num2) {
  return num1 + num2;
}

sumaJavascriptVanilla(1,3);
sumaJavascriptVanilla(1,'6');

type dni = number;

let dniNumber: dni = 342342;
let dniNumber2: dni = 342342;

