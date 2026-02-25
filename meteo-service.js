import { computed, signal } from "./signal.js";

export class MeteoService{


    constructor(){
        this.url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&forecast_days=1&temperature_unit=fahrenheit";
        this.tempSignal = signal([]);
        this.celsiusSignal = computed(() => {
            const celsiusArray = [];
            for (const tempObj of this.tempSignal()) {
                const celsiusObj = {time: tempObj.time};
                celsiusObj.temp = (tempObj.temp - 32) / (9/5);
                celsiusArray.push(celsiusObj);
            }
            return celsiusArray;
        }, [this.tempSignal]);
        this.getTemperature();
    }

    getTemperature(){
        fetch(this.url)
        .then(response => response.json())
        .then(data => {
            const temperatures = []
            for (let i = 0; i < data.hourly.time.length; i++) {
                const time  = data.hourly.time[i]
                const temp = data.hourly.temperature_2m[i]
                temperatures.push({time, temp})
            }
            this.tempSignal.set(temperatures);
        })
        .catch(error => console.error('Errore nella richiesta:', error));
    }

}