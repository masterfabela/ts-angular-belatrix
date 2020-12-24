export {};

type dni = number;

interface Persona {
  altura?: number;
  edad: number;
  nombre: string;
  apellido: string;
  dni: dni;
}

const persona: Persona = {
  edad: 18,
  nombre: 'Jose',
  apellido: 'Vieites',
  dni: 324
}