import { signal, effect } from "./signal.js";

const pippo = signal("pippo ha caldo");

effect(() => console.log("valore dentro il signal", pippo()));

console.log("valore dentro il signal", pippo());

pippo.set("leonardo sente la mancanza di copilot");

console.log("valore dentro il signal", pippo());

pippo.update((value) => value + " e ha fame");

console.log("valore dentro il signal", pippo());