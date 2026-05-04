import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective {
  @Input() lazySrc: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    const img = this.el.nativeElement;
    if (this.lazySrc && img.getAttribute('src') !== this.lazySrc) {
      img.src = this.lazySrc;
    }
  }
}
