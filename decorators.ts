export {}

function chourizo(target, key){
  console.log(target);
  console.log(key + ' se ha llamado');
}

class Persona {
  private name: string

  constructor(name:string){
    this.name = name;
  }

  @chourizo
  sayMyName(){
    console.log(this.name);
  }

}

const persona: Persona = new Persona('Alan');
persona.sayMyName();