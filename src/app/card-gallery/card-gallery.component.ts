import { Component, OnInit } from '@angular/core';
import { CardModel, CardsService } from '../service/cards.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-gallery',
  templateUrl: './card-gallery.component.html',
  styleUrls: ['./card-gallery.component.scss']
})
export class CardGalleryComponent implements OnInit {
  cards: Observable<CardModel[]>;

  constructor(private cardSvc: CardsService) { }

  ngOnInit() {
    this.cards = this.cardSvc.getCards();
  }

  handleLiked(id: string) {
    this.cardSvc.likedCard(id);
  }
}
