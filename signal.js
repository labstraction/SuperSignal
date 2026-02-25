export function signal(value) {

    let followers = [];
    
    let signalValue = value;

    const signalFunction = () => signalValue;

    const notify = () => {
        for (const followerFunction of followers) {
            followerFunction()
        }
    }

    signalFunction.set = (newValue) => {
        signalValue = newValue;
        notify()
    };
   
    signalFunction.update = (updateFunction) => {
        signalValue = updateFunction(signalValue);
        notify()
    };

    signalFunction.addFollower = (follwerFunction) => followers.push(follwerFunction);



    return signalFunction;
}
// effectFunction =>() => console.log("valore dentro il signal", pippo())
// signals => [pippo]
export function effect(effectFunction, signals = []) {

    for (const signal of signals) {
        signal.addFollower(effectFunction);
        effectFunction()
    }

}

//computedFunction => () => pippo().length
//signals => [pippo]

export function computed(computedFunction, signals = []) {

    let computedValue = computedFunction();

    const followers = [];

    const notify = () => {
        for (const followerFunction of followers) {
            followerFunction()
        }
    }

    const signalFunction = () => computedValue;

    signalFunction.addFollower = (follower) => followers.push(follower);

    for (const signal of signals) {
        signal.addFollower(() => {
            computedValue = computedFunction();
            notify()
        })
    }

    return signalFunction;
}