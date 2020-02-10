import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsBackendService } from './cards-backend.service';

export interface CardModel {
  id: string;
  name: string;
  url: string;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards: CardModel[];

  constructor(private cardsBackendSvc: CardsBackendService) { }

  public getCards(): Observable<CardModel[]> {
    return this.cardsBackendSvc.getCards();
  }
}
