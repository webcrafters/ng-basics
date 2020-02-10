import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CardsBackendService } from './cards-backend.service';
import { tap } from 'rxjs/operators';

export interface CardModel {
  id: string;
  name: string;
  url: string;
  likes: number;
  likedByMe: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards: CardModel[];

  constructor(private cardsBackendSvc: CardsBackendService) { }

  public getCards(): Observable<CardModel[]> {
    return !!this.cards
      ? of(this.cards)
      : this.cardsBackendSvc.getCards().pipe(
        tap(cards => this.cards = cards)
      );
  }

  public likedCard(id: string) {
    // optimistic update
    const affectedCard = this.cards.find(card => card.id === id);
    affectedCard.likes++;
    affectedCard.likedByMe = true;
    // ensure backend consistency
    this.cardsBackendSvc.updateCard(affectedCard).subscribe((successful: boolean) => {
      if (!successful) {
        affectedCard.likes--;
        affectedCard.likedByMe = false;
        // show user error notification
      }
    });
  }
}
