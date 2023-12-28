import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  //tagInput va a ser la referencia al html
  //El not null operator es el simbolo !, el cual expresa que siempre va a haber un valor
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService,
  ) { }

  searchTag(){
    const newTag  = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    //Limpiamos el input
    this.tagInput.nativeElement.value = '';

  }
}
