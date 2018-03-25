import { Component, ElementRef, NgZone} from '@angular/core';
import 'slick-carousel';

@Component({
  selector: 'slick-carousel',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./slick-carousel.component.css']
})
export class SlickCarouselComponent {
  constructor(private el: ElementRef, private zone: NgZone) {
  }

  $carousel: JQuery | any;

  ngAfterViewInit() {
    this.zone.runOutsideAngular(()=>{
     this.$carousel = $(this.el.nativeElement).slick({
       autoplay: true,
       autoplaySpeed: 3000,
       dots: false,
       slidesToShow: 4,
       slidesToScroll: 2,
     });
    });
  }
}
