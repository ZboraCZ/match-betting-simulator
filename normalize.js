import { stupniceVah } from './system';

const createMatrix = (row, cols, isFilled = false) => {
    if(isFilled)
        return [...Array(row)].map(() => Array(cols).fill(0));
    
    return [...Array(2)].map(() => Array(0));
}

const normalizujKriterialniVahy = (vahy) => {
    let clonedMatrix = createMatrix(vahy.length, vahy[0].length, true);

    let normedMatrix = clonedMatrix;

    for(let j = 0; j < vahy.length; j++) {
        for(let i = 0; i < vahy[j].length; i++) {
            let sum = 0;

            for(let k = 0; k < vahy[j].length; k++) {
                sum += vahy[k][j]
            }
            normedMatrix[i][j] = (Math.round((vahy[i][j] / sum) * 100) / 100);
        } 
    }
    return normedMatrix;
}


const normalizujDataVzajemnePro = (tym1Atribut, tym2Atribut, interval, max = false) => {
    let y = Math.round((Math.max(...stupniceVah) * Math.abs(tym1Atribut - tym2Atribut)) / interval.max);

    if(y == 0) {
        y = 1;
    }

    if(max) {
        const temp = tym1Atribut;
        tym1Atribut = tym2Atribut;
        tym2Atribut = temp;
    }

    let m = [
        [1, 0],
        [0, 1]
    ];

    if(tym1Atribut < tym2Atribut) {
        m[0][1] = 1 / y; 
        m[1][0] = y;
    } else if(tym1Atribut > tym2Atribut) {
        m[0][1] = y;
        m[1][0] = (1 / y);
    } else {
        m[0][1] = 1;
        m[1][0] = 1;
    }

    //console.log(m);

    let clonedMatrix = [...m];
    
    let newMatrix = [
        [0, 0],
        [0, 0]
    ]

    //normalize matrix
    for(let j = 0; j < m.length;j++) {
        for(let i = 0; i < m[j].length;i++) {
            let sum = 0;
            for(let k = 0; k < m[j].length; k++) {
                sum += clonedMatrix[k][i]
            }
            newMatrix[j][i] = clonedMatrix[j][i] / sum
        }
    }
    return [
        newMatrix[0][0], newMatrix[1][0]
    ];
} 

//vypocet skalarniho soucinu
const calcSkalarSoucin = (normedFormatTable, normalizovaneRadkovePrumery) => {
    let finalsResults = [];
    normedFormatTable.forEach(row =>
        finalsResults = [
            ...finalsResults, 
            row.reduce((acc, val, i) => acc += normalizovaneRadkovePrumery[i] * val, 0)
        ]
    );
    return finalsResults;
}

export {
    createMatrix,
    normalizujKriterialniVahy,
    normalizujDataVzajemnePro,
    calcSkalarSoucin
}