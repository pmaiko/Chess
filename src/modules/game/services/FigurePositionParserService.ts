export class FigurePositionParserService {
  static parse (data: string): { color: string; name: string; number: string } {
    const [color, name, number] = data.split('.')

    return {
      color,
      name,
      number,
    }
  }
}
