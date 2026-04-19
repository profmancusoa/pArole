import { writable } from 'svelte/store';

const wordlist = [
    'AMICO', 'AMORE', 'ANCHE', 'ANIMA', 'APICE', 'APRII', 'AROMA', 'ASINO', 'ASTRO', 'AUDIO',
    'AUREO', 'AVERE', 'BACIO', 'BAGNO', 'BALLO', 'BANCA', 'BARCA', 'BASSO', 'BELLA', 'BELLO',
    'BIRRA', 'BOCCA', 'BOSCO', 'BOTTA', 'BRAVA', 'BRAVO', 'BREVE', 'BRINA', 'BRUNO', 'BURRO',
    'CALDO', 'CALMA', 'CALZA', 'CAMPO', 'CANTO', 'CAPRA', 'CARNE', 'CARRO', 'CASCO', 'CASSA',
    'CASTO', 'CENNO', 'CENSO', 'CERTO', 'CESTO', 'CIELO', 'CILIO', 'CINTO', 'CITTA', 'CLIMA',
    'COLLA', 'COLPA', 'COLPO', 'CONCA', 'CONTO', 'COPIA', 'CORDA', 'CORNO', 'CORPO', 'CORSA',
    'COSMO', 'COSTA', 'CREMA', 'CROCE', 'CUORE', 'CURVA', 'DANNO', 'DAREI', 'DELTA', 'DENSO',
    'DENTE', 'DIETA', 'DITTA', 'DONNA', 'DORSO', 'DRAGO', 'DUOMO', 'ELICA', 'EPOCA', 'ESAME',
    'ESITO', 'ESTRO', 'ETERE', 'FATTO', 'FAUNA', 'FEUDO', 'FESTA', 'FIABA', 'FIATO', 'FIBRA',
    'FIORE', 'FIRMA', 'FISCO', 'FOLLA', 'FOLLE', 'FONDA', 'FONDO', 'FORMA', 'FORNO', 'FORTE',
    'FOSSA', 'FRASE', 'FRANA', 'FRENO', 'FUNGO', 'FURTO', 'GATTO', 'GEMMA', 'GESSO', 'GHIRO',
    'GIOIA', 'GIOCO', 'GLOBO', 'GOMMA', 'GONNA', 'GRADO', 'GRANO', 'GRIDO', 'GUADO', 'GUIDA',
    'IGLOO', 'INDIO', 'IRIDE', 'LAMPO', 'LARGO', 'LASER', 'LATTE', 'LEGGE', 'LEGNO', 'LEMBO',
    'LENTO', 'LEPRE', 'LIETO', 'LIMBO', 'LINEA', 'LISCA', 'LITRO', 'LUOGO', 'LUSSO', 'MADRE',
    'MAGIA', 'MAGRO', 'MALTO', 'MANIA', 'MANTO', 'MARMO', 'MARZO', 'MATTO', 'MAZZA', 'MELMA',
    'MERLO', 'MEZZO', 'MIELE', 'MIRTO', 'MISTO', 'MONDO', 'MONTE', 'MORSA', 'MORTE', 'MOSCA',
    'MOSSA', 'MOTTO', 'MUCCA', 'MUSEO', 'NERBO', 'NERVO', 'NESSO', 'NETTO', 'NITRO', 'NORMA',
    'NOTTE', 'NOZZA', 'NUORA', 'NUOTO', 'NUOVO', 'OMBRA', 'ONERE', 'OPERA', 'ORATA', 'ORMAI',
    'OVILE', 'PADRE', 'PALCO', 'PALMA', 'PANCA', 'PANNO', 'PAPPA', 'PARCO', 'PARTE', 'PASTA',
    'PATTO', 'PAURA', 'PENNA', 'PESCA', 'PIANO', 'PICCO', 'PIEDE', 'PIENA', 'PIENO', 'PIETA',
    'PILLA', 'PINNA', 'PIOLO', 'PISTA', 'PIZZA', 'POETA', 'POLPA', 'POLSO', 'PONTE', 'PORTA',
    'POSTA', 'PRATO', 'PREDA', 'PRESA', 'PRETE', 'PRIMA', 'PRIMO', 'PROLE', 'PRORA', 'PROSA',
    'PUGNO', 'PULCE', 'PUNTA', 'QUASI', 'QUOTA', 'RADAR', 'RADIO', 'RAMPA', 'RANGO', 'RAZZA',
    'REGIA', 'REGNO', 'RENNA', 'RESTO', 'RETTA', 'RETRO', 'RICCO', 'RISMA', 'RITMO', 'ROCCA',
    'ROMBO', 'RONDA', 'ROSSO', 'ROTTA', 'RUOTA', 'SALDO', 'SALMA', 'SALSA', 'SALTO', 'SALVA',
    'SANTO', 'SASSO', 'SCALA', 'SCAVO', 'SCENA', 'SCOPA', 'SCUDO', 'SENNO', 'SENTO', 'SERBO',
    'SERIE', 'SERIO', 'SERPE', 'SERRA', 'SERVE', 'SETTA', 'SFIDA', 'SIGLA', 'SOAVE', 'SOGNO',
    'SOLCO', 'SOLDI', 'SOLDO', 'SONDA', 'SONNO', 'SORBO', 'SORDO', 'SORGO', 'SOTTO', 'SPADA',
    'SPAGO', 'SPESA', 'SPIGA', 'SPINA', 'SPIRA', 'SPORT', 'STIVA', 'STOFA', 'STOLA', 'STUFA',
    'SUONO', 'TAPPA', 'TARDA', 'TASSA', 'TATTO', 'TEMPO', 'TENDA', 'TENUE', 'TERZO', 'TESTA'
];

export function createGrid() {
    const grid = [];

    for(let r = 0; r < 6; r++) {
        grid.push([]);
        for(let c = 0; c < 5; c++) 
            grid[r][c] = '';
    }

    return grid;
}

export function getRandomWord() {
    return wordlist[Math.floor(Math.random() * wordlist.length)];
}

export const board = writable(createGrid());
export const gameInfo = writable({
    char: 0,
    attempt: 0
});

export const GAME_WORD = writable(getRandomWord());
export const guess = writable("");
export const colors = writable(createGrid());
export const keyboardColors = writable({});
export const gameOver = writable(false);
