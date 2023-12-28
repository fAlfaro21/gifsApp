import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  @Input()
  public gifs: Gif[] = [];  //Este componente va a estar obligado a recibir gifs en formato Gif.
  // Este "gifs" es el que vamos a enviar desde el home-page.component.ts (padre)

}
