export{}

function log(target, key){
  let _val = target[key];
  const getter = () => {
    console.log(`Get: ${key} => ${_val}`)
    return _val;
  }
  const setter = (newValue) => {
    console.log(`Set: ${key} => ${newValue}`);
    _val = newValue;
  }

  const objectProperty = {
    get: getter,
    set: setter
  }

  Object.defineProperty(target, key, objectProperty);
}

class Persona {
  @log
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const p = new Persona('Jose');
p.name = 'Platzi';
const nameFromClass = p.name;