import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!:string;
  @Input() backButton!:string;
  @Input() isModal!:boolean;
  @Input() isRecipe!:boolean;
  @Input() isSave!:boolean;
  @Input() publication!:Publication

  utilsService = inject(UtilsService);
  router = inject(Router);
  sqliteService = inject(SqliteService);


  favorites:Publication[] = [];

  currentPath: string = '';
  
  ngOnInit() {    
    this.read();
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    });
  }
  
  goSave(){
    this.router.navigate(['/main/save']);
  }
 
  goHome(){
    this.router.navigate(['/main/home']);
  }
 
  dismissModal(){
    this.utilsService.dismisModal();
  }

  showRecipe(){
    return this.isSave || this.isRecipe;
  }

  read(){
    this.sqliteService.read()
    .then((publications:Publication []) =>{
      this.favorites = this.createPublication(publications);
    });    
  }

  createPublication(publications:any[]){
    let newPublicationList:Publication[] = [];
    for(let publication of publications){

      let newPublication:Publication ={
        id: publication.id,
        name: publication.name,
        description: JSON.parse(publication.description),
        time: publication.time,
        ingredient: JSON.parse(publication.ingredient),
        image: publication.image
      };    
      newPublicationList.push(newPublication);
    }
    return newPublicationList
  }

  isFavorite() {
    let item = this.favorites.find(elem => elem.id === this.publication.id);
    let favorite: boolean = !!item;

    return favorite;
  }

  save(){
    this.sqliteService.create(this.publication)
    .then(() => {
      console.log("Creado");
      this.read();
    }).catch(err =>{
      console.log(err);
    });
  }

  delete(){
    this.sqliteService.delete(this.publication.id)
    .then((changes) => {
      //console.log(changes);
      console.log("deleteFavorite");

      this.read(); // Volvemos a leer

    }).catch(err => {
    console.error(err);
  })
  }

}
