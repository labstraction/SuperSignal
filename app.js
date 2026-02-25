//import { signal, effect, computed } from "./signal.js";

// const pippo = signal("pippo ha caldo");
// const pippoLenght = computed(() => pippo().length, [pippo]);

// effect(() => console.log("è partito effect", pippo(), pippoLenght()), [pippo]);

// console.log("valore dentro il signal", pippo());

// pippo.set("leonardo sente la mancanza di copilot");

// console.log("valore dentro il signal", pippo());

// pippo.update((value) => value + " e ha fame");

// console.log("valore dentro il signal", pippo());

import { MeteoService } from "./meteo-service.js";
import { effect } from "./signal.js";

const mServ = new MeteoService();

effect(() => {
    document.body.innerHTML = ''
    for (let i = 0; i < mServ.tempSignal().length; i++) {
        const card = `<div>time: ${mServ.tempSignal()[i].time}, fahrenheit:${mServ.tempSignal()[i].temp}, celsius: ${mServ.celsiusSignal()[i].temp} <div>`
        document.body.innerHTML+=card;
    }
}, [mServ.tempSignal, mServ.celsiusSignal])