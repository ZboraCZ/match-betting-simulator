import { vstupniFunkce, prechodovaFunkce } from './main.js';
import { Tym, StavZapasu } from './system.js';
import Chart from 'chart.js';

let tym1, tym2, k1Clean, k2Clean, k1, k2;

const aktualniKoloEl = document.querySelector('#aktualniKoloEl');
const aktualniKoloText = document.querySelector('#aktualniKoloText');

aktualniKoloEl.value = 1;
aktualniKoloText.innerHTML = aktualniKoloEl.value;
aktualniKoloEl.addEventListener('change', () => {
    aktualniKoloText.innerHTML = aktualniKoloEl.value;
})

const tym1Input = document.querySelector('#tym1Input');
const tym1PoradiVTymuEl = document.querySelector('#tym1PoradiVTymu');
const tym1GolovaUspesnostEl = document.querySelector('#tym1GolovaUspesnost');
const tym1VyhryVRadeEl = document.querySelector('#tym1VyhryVRade');
const tym1NemocneVTymuEl = document.querySelector('#tym1NemocneVTymu');

const tym1poradiText = document.querySelector('#tym1poradiText');
const tym1GolyText = document.querySelector('#tym1GolyText');
const tym1VyhryText = document.querySelector('#tym1VyhryText');
const tym1NemocniText = document.querySelector('#tym1NemocniText');

tym1PoradiVTymuEl.addEventListener("change", () => {
    tym1poradiText.innerHTML = tym1PoradiVTymuEl.value;
});

tym1GolovaUspesnostEl.addEventListener("change", () => {
    tym1GolyText.innerHTML = tym1GolovaUspesnostEl.value;
});

tym1VyhryVRadeEl.addEventListener("change", () => {
    tym1VyhryText.innerHTML = tym1VyhryVRadeEl.value;
});

tym1NemocneVTymuEl.addEventListener("change", () => {
    tym1NemocniText.innerHTML = tym1NemocneVTymuEl.value;
});

//---------------- Tým 2 -----------------------------
const tym2Input = document.querySelector('#tym2Input');
const tym2PoradiVTymuEl = document.querySelector('#tym2PoradiVTymu');
const tym2GolovaUspesnostEl = document.querySelector('#tym2GolovaUspesnost');
const tym2VyhryVRadeEl = document.querySelector('#tym2VyhryVRade');
const tym2NemocneVTymuEl = document.querySelector('#tym2NemocneVTymu');

const tym2poradiText = document.querySelector('#tym2poradiText');
const tym2GolyText = document.querySelector('#tym2GolyText');
const tym2VyhryText = document.querySelector('#tym2VyhryText');
const tym2NemocniText = document.querySelector('#tym2NemocniText');

tym2PoradiVTymuEl.addEventListener("change", () => {
    tym2poradiText.innerHTML = tym2PoradiVTymuEl.value;
});

tym2GolovaUspesnostEl.addEventListener("change", () => {
    tym2GolyText.innerHTML = tym2GolovaUspesnostEl.value;
});

tym2VyhryVRadeEl.addEventListener("change", () => {
    tym2VyhryText.innerHTML = tym2VyhryVRadeEl.value;
});

tym2NemocneVTymuEl.addEventListener("change", () => {
    tym2NemocniText.innerHTML = tym2NemocneVTymuEl.value;
});

tym1NemocniText.innerHTML = tym1NemocneVTymuEl.value;
tym1VyhryText.innerHTML = tym1VyhryVRadeEl.value;
tym1GolyText.innerHTML = tym1GolovaUspesnostEl.value;
tym1poradiText.innerHTML = tym1PoradiVTymuEl.value;


tym2NemocniText.innerHTML = tym2NemocneVTymuEl.value;
tym2VyhryText.innerHTML = tym2VyhryVRadeEl.value;
tym2GolyText.innerHTML = tym2GolovaUspesnostEl.value;
tym2poradiText.innerHTML = tym2PoradiVTymuEl.value;


const kdeSeHraje = document.querySelector('#kdeSeHraje');
let mistoHrani = 0;
kdeSeHraje.addEventListener('click', () => {
    mistoHrani = kdeSeHraje.value;
})

const calcInputFncEl = document.querySelector('#calcInputFnc');

const kurz1 = document.querySelector('#kurz1');
const kurz2 = document.querySelector('#kurz2');

const tym1Nazev = document.querySelector('#tym1Nazev');
const tym2Nazev = document.querySelector('#tym2Nazev');

const printError = (message) => {
    const el = document.querySelector('#errorMessage');
 
    el.innerHTML = message;
    el.classList.add('is-visible');
}


const vstupniFncContent = document.querySelector('.input-fnc-content');

calcInputFncEl.addEventListener('click', () => {
    
    prechodyLog = [];
    
    //validation on in prod
    if(tym1PoradiVTymuEl.value === tym2PoradiVTymuEl.value) {
        printError('Pořadí týmů v tabulce nesmí být stejné');
        return;
    } else {
        const el = document.querySelector('#errorMessage');
        const el2 = document.querySelector('.transition-fnc-content')
        el.innerHTML = '';
        el.classList.remove('is-visible');
        el2.classList.add('is-visible');
    }

    vstupniFncContent.classList.add('is-visible');

    if(tym1Input.value == '') {
        tym1Nazev.innerHTML = 'Tým 1';
        tym1RadioText.innerHTML = 'Tým 1';;
    }
    else {
        tym1Nazev.innerHTML = tym1Input.value;
        tym1RadioText.innerHTML = tym1Input.value;
    }

    if(tym2Input.value == '') {
        tym2Nazev.innerHTML = 'Tým 2';
        tym2RadioText.innerHTML = 'Tým 2'
    }
    else {
        tym2Nazev.innerHTML = tym2Input.value;
        tym2RadioText.innerHTML = tym2Input.value;
    }
    
    tym1 = new Tym(tym1PoradiVTymuEl.value, tym1GolovaUspesnostEl.value, tym1VyhryVRadeEl.value, tym1NemocneVTymuEl.value);  
    tym2 = new Tym(tym2PoradiVTymuEl.value, tym2GolovaUspesnostEl.value, tym2VyhryVRadeEl.value, tym2NemocneVTymuEl.value);  
    //tym1 = new Tym(2, 0.7, 2, 0.05); 
    //tym2 = new Tym(4, 0.4, 0, 0); 

    [k1, k2] = vstupniFunkce(mistoHrani, tym1, tym2)
                        .map(h => 5 - (h * 5))
                        .map(h => h * (1.5 - (aktualniKoloEl.value / 52 / 2 )))
                        .map(h => h < 1 ? h = 1 : h);

    [k1Clean, k2Clean] = vstupniFunkce(kdeSeHraje, tym1, tym2)

    kurz1.innerHTML = Math.round(k1 * 100) / 100;
    kurz2.innerHTML = Math.round(k2 * 100) / 100;


    const prubehZapasu = document.querySelector('#prubehZapasu');

    let zapas = new StavZapasu(k1Clean, k2Clean, k1, k2);
    
    const output = prechodovaFunkce(zapas);
    prubehZapasu.innerHTML = output.output;


    //console.log(output.tym1.map(d => d.minuta))
    //console.log(output.tym2.map(d => d.minuta))

    /*
    console.log(
        output.tym1.map(d => ({x: d.minuta, y: d.kurz.toFixed(2)})),
    )
    */

    generateChart(output);
});

const currentTimeText = document.querySelector('#currentTimeText');
const currentTimeEl = document.querySelector('#currentTimeEl');
currentTimeText.innerHTML = currentTimeEl.value;

currentTimeEl.addEventListener('change', () => {
    currentTimeText.innerHTML = currentTimeEl.value;
    

})
//tym1 = new Tym(tym1PoradiVTymuEl.value, tym1GolovaUspesnostEl.value, tym1VyhryVRadeEl.value, tym1NemocneVTymuEl.value);  
//tym2 = new Tym(tym2PoradiVTymuEl.value, tym2GolovaUspesnostEl.value, tym2VyhryVRadeEl.value, tym2NemocneVTymuEl.value);  


const tym1Radio = document.querySelector('#tym1Radio');
const tym2Radio = document.querySelector('#tym2Radio');

const tym1RadioText = document.querySelector('#tym1RadioText');
const tym2RadioText = document.querySelector('#tym2RadioText');


const transFncContent = document.querySelector('transition-fnc-content')

const btnGoal = document.querySelector('#addGoal');

let prechodyLog = [];
btnGoal.addEventListener('click', () => {
    const timeStamp = currentTimeEl.value;

    let selectedTym;
    if(tym1Radio.checked)
        selectedTym = {tym: 'tym1', data: tym1};
    else if(tym2Radio.checked)
        selectedTym = {tym: 'tym2', data: tym2};


    let zapas = new StavZapasu(k1Clean, k2Clean, k1, k2);

    prechodyLog.push({
        timeStamp,
        selectedTym
    })
    
    const output = prechodovaFunkce(zapas, prechodyLog);
   
    prubehZapasu.innerHTML = output.output;

    generateChart(output)
})

const generateChart = (output) => {

    let { tym1, tym2 } = output;
    let data1 = [], data2 = [];

    //console.log(tym2, tym1);
    //console.log(tym1, tym2, tym1.length, tym2.length);
    if(tym1.length <= 0) 
        data1 = [{x: 0, y:0}, {x: 60, y: 0}]
    else 
        data1 = [
            {x: 0, y:0}, 
            ...tym1.map((d) => ({x: d.minuta, y: d.kurz})).sort((a, b) => Number(a.x) - Number(b.x)),
            {x: 60, y: tym1[tym1.length-1].kurz}
        ]

    if(tym2.length <= 0) 
        data2 = [{x: 0, y:0}, {x: 60, y: 0}]
    else
        data2 = [
            {x: 0, y:0}, 
            ...tym2.map((d) => ({x: d.minuta, y: d.kurz})).sort((a, b) => Number(a.x) - Number(b.x)),
            {x: 60, y: tym2[tym2.length-1].kurz}
        ]
    

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...Array(60)].map((t, i) => i),
            datasets: [ {
                label: tym2Nazev.innerText,
                data: data2,
                lineTension: 0,
                fill: false,
                borderColor: 'blue'
            }, {
                label: tym1Nazev.innerText,
                data: data1,
                lineTension: 0,
                fill: false,
                borderColor: 'red'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Změna kurzů v průběhu zápasu'
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 80,
                    fontColor: 'black',
                    responsive: true,
                    maintainAspectRatio: true 
                    }
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Průběh zápasu (čas)'
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Kurz'
                    }
                }]
            }
        }
    });
    
}