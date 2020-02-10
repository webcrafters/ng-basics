import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardModel } from './cards.service';
import { HttpClient } from '@angular/common/http';

export interface CardsResponseModel {
  cards: CardModel[];
}

@Injectable({
  providedIn: 'root'
})
export class CardsBackendService {

  constructor(private httpClient: HttpClient) {}

  getCards(): Observable<CardModel[]> {
    return this.httpClient.get<CardsResponseModel>('/assets/cards.json').pipe(
      map((response => response.cards))
    );
  }

  updateCard(card: CardModel): Observable<boolean> {
    return of(true); // predent it was successful
  }
}
