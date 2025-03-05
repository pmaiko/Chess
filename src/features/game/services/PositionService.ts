export interface PositionInterface {
  x: number;
  y: number;
  getKey: () => string;
}

export type Direction =
  | '+1'
  | '+2'
  | '+1-right'
  | '+1-left'
  | 'right_top'
  | 'right_bottom'
  | 'left_top'
  | 'left_bottom'
  | 'top_right'
  | 'bottom_right'
  | 'top_left'
  | 'bottom_left'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'

export type MovesByDirection = Partial<Record<Direction, PositionInterface[]>>;

export interface MoveInterface {
  moves: PositionInterface[];
  movesByDirection: MovesByDirection;
}

export class PositionService implements PositionInterface {
  constructor (public readonly x: number, public readonly y: number) {}

  getKey () {
    return `x${this.x}.y${this.y}`
  }
}
