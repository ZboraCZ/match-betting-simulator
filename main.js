import intervaly, { cisloKolaSouteze, kdeSeHraje, stupniceVah } from './system';
import { 
    createMatrix, 
    normalizujDataVzajemnePro, 
    normalizujKriterialniVahy, 
    calcSkalarSoucin
} from './normalize';

//input fnc
const vahy = [
    [1,   2,   5,   7],
    [0.5, 1,   3,   5],
    [0.2, 0.3, 1,   2],
    [0.1, 0.2, 0.5, 1]
]

//výpočet kurzů jednotlivých týmů
export const vstupniFunkce = (kdeSeHraje, tym1, tym2) => {
    let normedFormatTable = createMatrix(2, 0);
    for(let i = 0; i < 2; i++) {
        normedFormatTable[i].push(
            normalizujDataVzajemnePro(tym1.getPoradiVTabulce(), tym2.getPoradiVTabulce(), intervaly.intervalPoradiVTabulce, true)[i],
            normalizujDataVzajemnePro(tym1.getGolovaUspesnost(), tym2.getGolovaUspesnost(), intervaly.intervalGolovaUspesnost)[i],
            normalizujDataVzajemnePro(tym1.getVyhryVRade(), tym2.getVyhryVRade(), intervaly.intervalVyhryVRade)[i],
            normalizujDataVzajemnePro(tym1.getNemocnyTym(), tym2.getNemocnyTym(), intervaly.intervalNemocnyVTymu)[i]
        )
    }

    const normalizovaneVahy = normalizujKriterialniVahy(vahy);

    const [kurzTymu1, kurzTymu2] = calcSkalarSoucin(
                                        normedFormatTable,
                                        normalizovaneVahy.map(r => r.reduce((acc, val) => acc + val, 0) / r.length)
                                    );

    //Straight úprava kurzů jestli se hraje u týmu1/týmu2 (1/2)

    if(kdeSeHraje == 1){
        return [kurzTymu1*0.9, kurzTymu2*1.1];
    }
    else if(kdeSeHraje == 2) {
        return [kurzTymu1*1.1, kurzTymu2*0.9];
    } else {
        return [kurzTymu1, kurzTymu2];
    }
}

export const prechodovaFunkce = (zapas, akceZapasu = null) => {
    let tym1 = [];
    let tym2 = [];
    if(!akceZapasu){   //Samostatna simulace bez zadané konfigurace
        let output = '';

        zapas.prepocitejKurzyVZapase();
        for(let i=1; i<=60; i++){
            let vystreliloSe = Math.random();
            
            if(vystreliloSe <= 0.09) {

                let sanceGoluTymu1 = 1/zapas.kurzTymu1;
                let sanceGoluTymu2 = 1/zapas.kurzTymu2;
                let golZeStrely = Math.random();

                // golZeStrely = (0; sanceGoluTymu1> -> Tym1 dal gol
                if(golZeStrely <= sanceGoluTymu1) {     
                    zapas.pridejSkoreTymu1();
                    zapas.prepocitejKurzyVZapase();
                    
                    output += vystupniFunkce(
                        `Tým 1 dal gól v ${zapas.getMinuta()} minutě. `,
                        zapas
                    );

                    tym1.push({minuta: zapas.getMinuta(), kurz: zapas.kurzTymu1});
                }
                // golZeStrely = <1-sanceGoluTymu2; 1) -> Tym2 dal gol
                else if(golZeStrely >= sanceGoluTymu2){
                    zapas.pridejSkoreTymu2();
                    zapas.prepocitejKurzyVZapase();
                    output += vystupniFunkce(
                        `Tým 2 dal gól v ${zapas.getMinuta()} minutě. `,
                        zapas
                    );

                    tym2.push({minuta: zapas.getMinuta(), kurz: zapas.kurzTymu2});
                }
            }
            zapas.pridejMinutu();
        }
        output += vystupniFunkce("Konec zapasu. ", zapas);
        return {
            output,
            tym1,
            tym2
        }
    } else {    //simulace zapasu zadanym konfigem
        let output = '';
        akceZapasu.forEach(goly => {
            const {timeStamp, selectedTym} = goly;
            if(selectedTym.tym == 'tym1') {
                zapas.pridejSkoreTymu1();
                zapas.prepocitejKurzyVZapase();

                output += vystupniFunkce(
                    `Tým1 dal gól v ${timeStamp} minutě`,
                    zapas
                )

                tym1.push({minuta: timeStamp, kurz: zapas.kurzTymu1});
            } else if(selectedTym.tym == 'tym2') {

                zapas.pridejSkoreTymu2();
                zapas.prepocitejKurzyVZapase();

                output += vystupniFunkce(
                    `Tým2 dal gól v ${timeStamp} minutě`,
                    zapas
                )

                tym2.push({minuta: timeStamp, kurz: zapas.kurzTymu2});
            }       
        });
        return {
            output,
            tym1,
            tym2
        }
    }

}

// akceStr bude string s oznámením o vyvolané akce, 
// co za událost v zápase vyvolalo výstupní funkci
const vystupniFunkce = (akceStr, zapas) => {
    if(!zapas) 
        return `<li>${akceStr}</li>`;
    
    return `<li>${akceStr + zapas.vypisStavZapasu()}</li>`
}
