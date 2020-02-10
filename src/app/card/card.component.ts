import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from '../service/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardData: CardModel;
  @Output() liked = new EventEmitter<any>();

  get rightIcon(): string {
    return this.cardData.likedByMe ? 'star' : 'star_border';
  }

  constructor() { }

  ngOnInit() {
  }
}
