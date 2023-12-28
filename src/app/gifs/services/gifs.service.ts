import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'}) //Con el providIn hacemos que el
//servicio esté dispoinible para toda la aplicación y todos
//los módulos que inyecten este servicio.
//De no poner esto, habría que declararlo en el gifs.module.ts como "providers"
export class GifsService {

  public gifList: Gif[] = [];

  //Creo una PROPIEDAD para almacenar todo lo que el usuario
  //va buscando...
  //Lo tengo privado para evitar que el array se actualice
  //por otro lado si lo dejo como público, por lo que dberé
  //crear un getter
  private _tagsHistory: string[] = [];
  private apiKey: string = 'vUbTfOksEIPkyFOM9ll7zLJbEG1cqmtl';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
     this.loadLocalStorage();
     console.log('Gifs Service Ready');
   }

  //getter: para exponer lo que yo quiero
  get tagsHistory(){
    //como los array pasan por referencia, por lo tanto,
    //usaré un spread operator para creaer una copia de los
    //tagsHistory
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    //Para evitar los repetidos
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    //hacemos referencia a la propiedad privada y agregar el tag
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history') ) return;
    //El parse hace la acción contraria del stringify y el símbolo ! nos garantiza que siempre va a
    //existir un datos (así nos quitamos el error a causa de un resultado con valor null)
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0])
  }

  searchTag( tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //También se puede utilizar axios, pero el fecth viene en angular
    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=vUbTfOksEIPkyFOM9ll7zLJbEG1cqmtl&q=Valorant&limit=2')
      .then (response => response.json())
      .then (data => console.log(data));
 */
      //También podríamos hacer esto:
    /* const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=vUbTfOksEIPkyFOM9ll7zLJbEG1cqmtl&q=Valorant&limit=2');
    const data = await resp.json();
    console.log(data); */

    //...pero vamos a utilizar el componente de angular HttpClientModule

    //Definimos el observable asi: "this.http.get"...de tipo "SearchResponse"
    //...y voy a suscribirme para estar a la escucha y recibir la respuesta/resultado en "resp"
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
    })
  }

}
