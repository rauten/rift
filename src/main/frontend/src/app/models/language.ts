export class Language {
  language: string;
  selected: boolean;

  constructor(language: string, selected: boolean) {
    this.language = language;
    this.selected = selected;
  }
}
