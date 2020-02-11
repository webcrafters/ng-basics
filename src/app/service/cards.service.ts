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
    const affectedCard = this.cards.find(card => card.id === id);
    if (affectedCard.likedByMe) {
      this.tryRemoveLike(affectedCard);
    } else {
      this.tryApplyLike(affectedCard);
    }
  }

  private tryApplyLike(card: CardModel) {
    // optimistic update
    this._likeLocally(card);
    // ensure backend consistency
    this.cardsBackendSvc.updateCard(card).subscribe((successful: boolean) => {
      if (!successful) {
        this._unlikeLocally(card);
        // show user error notification
      }
    });
  }

  private tryRemoveLike(card: CardModel) {
    // optimistic update
    this._unlikeLocally(card);
    // ensure backend consistency
    this.cardsBackendSvc.updateCard(card).subscribe((successful: boolean) => {
      if (!successful) {
        this._likeLocally(card);
        // show user error notification
      }
    });
  }

  private _likeLocally(card: CardModel) {
    card.likes++;
    card.likedByMe = true;
  }

  private _unlikeLocally(card: CardModel) {
    card.likes--;
    card.likedByMe = false;
  }
}
