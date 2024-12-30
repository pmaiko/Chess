export const GRID_SIZE = 8
// export const MATRIX = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))

export enum COLOR {
  black = 'black',
  white = 'white'
}

export const COLOR_REVERSE = {
  black: 'white',
  white: 'black',

}

export enum FIGURE {
  rook = 'rook', // Ладья
  knight = 'knight', // Конь
  bishop = 'bishop', // Слон
  queen = 'queen', // Ферзь
  king = 'king', // Король
  pawn = 'pawn' // Пешка
}

export const FIGURES_POSITIONS_KEYS = [
  [
    `${COLOR.black}.${FIGURE.rook}.000`,
    `${COLOR.black}.${FIGURE.knight}.000`,
    `${COLOR.black}.${FIGURE.bishop}.000`,
    `${COLOR.black}.${FIGURE.queen}.000`,
    `${COLOR.black}.${FIGURE.king}.000`,
    `${COLOR.black}.${FIGURE.bishop}.001`,
    `${COLOR.black}.${FIGURE.knight}.001`,
    `${COLOR.black}.${FIGURE.rook}.001`,
  ],
  [
    `${COLOR.black}.${FIGURE.pawn}.000`,
    `${COLOR.black}.${FIGURE.pawn}.001`,
    `${COLOR.black}.${FIGURE.pawn}.002`,
    `${COLOR.black}.${FIGURE.pawn}.003`,
    `${COLOR.black}.${FIGURE.pawn}.004`,
    `${COLOR.black}.${FIGURE.pawn}.005`,
    `${COLOR.black}.${FIGURE.pawn}.006`,
    `${COLOR.black}.${FIGURE.pawn}.007`,
  ],
  Array(GRID_SIZE).fill(null),
  Array(GRID_SIZE).fill(null),
  Array(GRID_SIZE).fill(null),
  Array(GRID_SIZE).fill(null),
  [
    `${COLOR.white}.${FIGURE.pawn}.000`,
    `${COLOR.white}.${FIGURE.pawn}.001`,
    `${COLOR.white}.${FIGURE.pawn}.002`,
    `${COLOR.white}.${FIGURE.pawn}.003`,
    `${COLOR.white}.${FIGURE.pawn}.004`,
    `${COLOR.white}.${FIGURE.pawn}.005`,
    `${COLOR.white}.${FIGURE.pawn}.006`,
    `${COLOR.white}.${FIGURE.pawn}.007`,
  ],
  [
    `${COLOR.white}.${FIGURE.rook}.000`,
    `${COLOR.white}.${FIGURE.knight}.000`,
    `${COLOR.white}.${FIGURE.bishop}.000`,
    `${COLOR.white}.${FIGURE.queen}.000`,
    `${COLOR.white}.${FIGURE.king}.000`,
    `${COLOR.white}.${FIGURE.bishop}.001`,
    `${COLOR.white}.${FIGURE.knight}.001`,
    `${COLOR.white}.${FIGURE.rook}.001`,
  ],
]
