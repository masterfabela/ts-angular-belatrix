
function init(target){
  return class extends target {
    nombre = 'Alan';
    apellido = 'Buscaglia';

    sayMyName() {
      return `${this.nombre} ${this.apellido}`
    }
  }
}

@init
class P {
  constructor(){}

  sayMyName(){}
}

const p = new P();
console.log(p.sayMyName());