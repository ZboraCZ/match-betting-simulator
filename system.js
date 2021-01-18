//define objects
class Tym {
    constructor(poradiVTabulce, golovaUspesnost, vyhryVRade, nemocnyTym){
        this.poradiVTabulce = Number(poradiVTabulce);
        this.golovaUspesnost = Number(golovaUspesnost);
        this.vyhryVRade = Number(vyhryVRade);
        this.nemocnyTym = this.prevedNemocnyTym(Number(nemocnyTym));
    };

    prevedNemocnyTym(nemocnyTym) {
        return Math.round(nemocnyTym / 20 * 100) / 100;
    }

    getPoradiVTabulce(){
        return this.poradiVTabulce;
    }

    getGolovaUspesnost(){
        return this.golovaUspesnost;
    }
    
    getVyhryVRade(){
        return this.vyhryVRade;
    }

    getNemocnyTym(){
        return this.nemocnyTym;
    }
    
}


class StavZapasu {
    constructor(kurzTymu1, kurzTymu2, startKurzTym1, startKurzTym2){
        this.minuta = 0;
        this.skoreTymu1 = 0;
        this.skoreTymu2 = 0;

        this.kurzTymu1 = kurzTymu1;
        this.kurzTymu2 = kurzTymu2;

        this.startKurzTym1 = startKurzTym1;
        this.startKurzTym2 = startKurzTym2;
    }

    pridejMinutu(){
        this.minuta++;
    }

    pridejSkoreTymu1(){
        this.skoreTymu1++;
    }

    pridejSkoreTymu2(){
        this.skoreTymu2++;
    }

    setMinuta(minuta){
        this.minuta = minuta;
    }

    setKurzTymu1(kurzTymu1){
        this.kurzTymu1 = kurzTymu1;
    }

    setKurzTymu2(kurzTymu2){
        this.kurzTymu2 = kurzTymu2;
    }

    getMinuta(){
        return this.minuta;
    }

    getSkoreTymu1(){
        return this.skoreTymu1;
    }

    getSkoreTymu2(){
        return this.skoreTymu2
    }

    getKurzTymu1(){
        return this.kurzTymu1;
    }

    getKurzTymu2(){
        return this.kurzTymu2;
    }

    prepocitejKurzyVZapase(){
        let rozdilSkore = Math.abs(this.skoreTymu1-this.skoreTymu2);
        if(this.skoreTymu1 < this.skoreTymu2) {
            this.kurzTymu1 = 1 + (this.startKurzTym1 * (1.1 * rozdilSkore) * (1 + (0.3/60 * this.minuta)) );
            this.kurzTymu2 = 1 + (this.startKurzTym2 * (1/(rozdilSkore*2)) * (1 - (0.3/60 * this.minuta)) );
        } else if(this.skoreTymu2 < this.skoreTymu1) {
            this.kurzTymu2 = 1 + (this.startKurzTym2 * (1.1 * rozdilSkore) * (1 + (0.3/60 * this.minuta)) );
            this.kurzTymu1 = 1 + (this.startKurzTym1 * (1/(rozdilSkore*2)) * (1 - (0.3/60 * this.minuta)) );
        }
        // Když vyrovnáno, vezmou se startovací kurzy. Čím později jsme v zápase,
        // tím větší konstantou se kurzy násobí od 1.0(zač. zápasu) do 1.5(konec zápasu)
        else {
            this.kurzTymu1 = this.startKurzTym1 * (1+ ((0.5/60) * this.minuta));
            this.kurzTymu2 = this.startKurzTym2 * (1+ ((0.5/60) * this.minuta));
        } 
    }

    vypisStavZapasu() {
        return `Stav zápasu je ${this.getSkoreTymu1()}:${this.getSkoreTymu2()}
        Kurzy týmů jsou ${this.getKurzTymu1().toFixed(2)} : ${this.getKurzTymu2().toFixed(2)}`
    }
}


//declare inputs

const cisloKolaSouteze = 1;   // 1..52
const kdeSeHraje = 1;         // Hraje se 1: u týmu1      2: u týmu2 


const tym1 = new Tym(14, 0.5, 3, 0.5);  //Vyškov
const tym2 = new Tym(5, 0.7, 1, 0.0);   //Kometa


const stupniceVah = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const intervalPoradiVTabulce = {
    min: 1,
    max: 14
}

const intervalGolovaUspesnost = {
    min: 0,
    max: 1,
}

const intervalVyhryVRade = {
    min: 0,
    max: 1  
}

const intervalNemocnyVTymu = {
    min: 0,
    max: 1
}

export default {
    intervalPoradiVTabulce,
    intervalGolovaUspesnost,
    intervalVyhryVRade,
    intervalNemocnyVTymu
} 

export {
    cisloKolaSouteze, 
    kdeSeHraje, 
    Tym,
    stupniceVah,
    StavZapasu
}

