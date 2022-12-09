import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightIngredient]'
})
export class HighlightIngredientDirective {

  private _content: string;
  private _ingredient: any[]; // [qty, unit, name, raw]

  @Input()
  set content(content: string) {
    this._content = content;
  }
  get content(): string { return this._content; }

  @Input()
  set ingredient(ingredient: any[]) {
    this._ingredient = ingredient;
    const qty = this.toQty(ingredient[0]);
    const units = this.toUnit(ingredient[1]);
    const ingName = ingredient[2];

    this.highlight(ingName, 'text-highlight-name');
    this.highlight(qty, 'text-highlight-qty');
    this.highlight(`(?:${units})(?:es\\b|s\\b|\\b)`, 'text-highlight-units');
  }
  get ingredient(): any[] { return this._ingredient; }

  constructor(private el: ElementRef) { }

  highlight(searchTerm: string, cssClass: string) {
    const splitFlags = 'i';
    const matchFlags = 'gi';
    const searchPattern = new RegExp('<.*?>.*?>|(?:' + searchTerm + ')', splitFlags);
    const matchPattern =  new RegExp('<.*?>.*?>|(?:' + searchTerm + ')', matchFlags);
    const spanStart = '<span class="' + cssClass + '">';
    const spanEnd = '</span>';
    let final = '';

    if (searchTerm !== undefined && searchTerm != null && searchTerm.length > 0 ) {
      const separatedText = this._content.split(searchPattern);
      const separatedSearchedText = this._content.match(matchPattern);

      if (separatedSearchedText != null && separatedSearchedText.length > 0) {
        for (let i = 0; i < separatedText.length; i++) {
          if ( i <= separatedSearchedText.length - 1 ) {
            if (separatedSearchedText[i][0] !== '<') {
              final += separatedText[i] + spanStart + separatedSearchedText[i] + spanEnd;
            } else {
              final += separatedText[i] + separatedSearchedText[i];
            }
          } else {
            final += separatedText[i];
          }
        }
        if (final.length > 0) {
          this._content = final;
        }
      }
    }

    this.el.nativeElement.innerHTML = this._content;
  }

  toUnit(rawUnit: string) {
    switch (rawUnit) {
      case 'drop': return 'drop|dr|gt|gtt';
      case 'smidgen': return 'smidgen|smdg|smi';
      case 'pinch': return 'pinch|pn';
      case 'dash': return 'dash|ds';
      case 'saltspoon': return 'saltspoon|ssp|scruple';
      case 'coffeespoon': return 'coffeespoon|csp';
      case 'dram': return 'dram|dr';
      case 'teaspoon': return 'teaspoon|tsp|t';
      case 'tablespoon': return 'tablespoon|Tbsp|T';
      case 'ounce': return 'ounce|oz|fl.oz';
      case 'wineglass': return 'wineglass|wgf';
      case 'teacup': return 'teacup|tcf|gill';
      case 'cup': return 'cup|C';
      case 'pint': return 'pint|pt';
      case 'quart': return 'quart|qt';
      case 'pottle': return 'pottle|pot';
      case 'gallon': return 'gallon|gal';
      case 'pound': return 'pound|lb';
      case 'gram': return 'gram|g';
      case 'kilogram': return 'kilogram|kg';
      default: return rawUnit;
    }
  }

  toQty(rawQty: string|number) {
    if (typeof rawQty === 'string') {
      return rawQty;
    } else if (typeof rawQty === 'number') {
      let final = rawQty.toString().split('.')[0];
      if (final === '0') {
        final = '';
      }
      switch ((rawQty % 1).toFixed(3)) {
        case '0.000': break;
        case '0.250': final += ' ?¼'; break;
        case '0.500': final += ' ?½'; break;
        case '0.750': final += ' ?¾'; break;
        case '0.142': final += ' ?⅐'; break;
        case '0.111': final += ' ?⅑'; break;
        case '0.100': final += ' ?⅒'; break;
        case '0.333': final += ' ?⅓'; break;
        case '0.666': final += ' ?⅔'; break;
        case '0.200': final += ' ?⅕'; break;
        case '0.400': final += ' ?⅖'; break;
        case '0.600': final += ' ?⅗'; break;
        case '0.800': final += ' ?⅘'; break;
        case '0.166': final += ' ?⅙'; break;
        case '0.833': final += ' ?⅚'; break;
        case '0.125': final += ' ?⅛'; break;
        case '0.375': final += ' ?⅜'; break;
        case '0.625': final += ' ?⅝'; break;
        case '0.875': final += ' ?⅞'; break;
      }
      return final;
    } else {
      return rawQty;
    }
  }

}
