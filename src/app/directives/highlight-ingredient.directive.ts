import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highlightIngredient]'
})
export class HighlightIngredientDirective {

  private _content: string;
  private _ingredient: any[]; // [qty, unit, name, raw]

  spanStart = '<span class="text-highlight">';
  spanEnd = '</span>';

  @Input('content')
  set content(content: string){
    this._content = content;
  }
  get content(): string { return this._content; }

  @Input('ingredient')
  set ingredient(ingredient: any[]){
    this._ingredient = ingredient;
    this.highlight();
  }
  get ingredient(): any[] { return this._ingredient; }

  constructor(private el: ElementRef) { }

  highlight() {
    const searchTerm = this._ingredient[2];
    const splitFlags = 'i';
    const matchFlags = 'gi';
    const searchPattern = new RegExp(searchTerm, splitFlags);
    const matchPattern =  new RegExp(searchTerm, matchFlags);
    let final = '';

    if (searchTerm !== undefined && searchTerm != null && searchTerm.length > 0 ) {
      let separatedText = this._content.split(searchPattern);
      let separatedSearchedText = this._content.match(matchPattern);

      if (separatedSearchedText != null && separatedSearchedText.length > 0) {
        for (let i = 0; i < separatedText.length; i++) {
          if ( i <= separatedSearchedText.length - 1 ) {
            final += separatedText[i] + this.spanStart + separatedSearchedText[i] + this.spanEnd;
          } else {
            final += separatedText[i];
          }
        }
        if (final.length > 0) {
          this.el.nativeElement.innerHTML = final;
        } else {
          this.el.nativeElement.innerText = this._content;
        }
      } else {
        this.el.nativeElement.innerText = this._content;
      }
    }
  }

}
