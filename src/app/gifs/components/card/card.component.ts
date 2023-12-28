import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {

  //El símbolo ! nos dice que garantizamos que siempre vamos a recibir un valor
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if( !this.gif ) throw new Error('Gif property is required');
  }
}
