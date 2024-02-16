import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SlideshowComponent implements OnInit {
  @Input() slides: any;
  currentSlide = 0;
  autoNextSlideAfter = 6;

  interval = setInterval(() => {
    this.next();
  }, 1000 * this.autoNextSlideAfter);

  ngOnInit(): void {
    this.currentSlide = Math.round(Math.random() * (this.slides.length - 1));
    console.log(this.currentSlide);
  }

  prev() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    this.resetInterval();
    console.log(this.currentSlide);
  }

  next() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    this.resetInterval();
    console.log(this.currentSlide);
  }

  // INTERVAL
  resetInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.next();
    }, 1000 * this.autoNextSlideAfter);
  }
}
