export function signal(value) {

    let followers = [];
    
    let signalValue = value;

    const signalFunction = () => signalValue;

    signalFunction.set = (newValue) => signalValue = newValue;
   
    signalFunction.update = (updateFunction) => signalValue = updateFunction(signalValue);

    return signalFunction;
}

export function effect(effectFunction) {
    
}

