export class Game {
  id: number;
  name: string;
  selected: boolean;

  constructor(id: number, name: string, selected: boolean) {
    this.id = id;
    this.name = name;
    this.selected = selected;
  }
}
