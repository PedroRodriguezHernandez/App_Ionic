import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  sqliteService = inject(SqliteService);
  router = inject(Router);

  description = [];
  ingredient = [];

  favorites:Publication[] = [];
  publications:Publication[] = [];

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.read();
  }

  goToRecipe(publication:Publication){
    this.utilsService.saveLocalStorage("recipe",publication);
    this.router.navigate(['/main/recipe'],{state:{isSave: true}});
  }

  read(){
    this.sqliteService.read()
    .then((publications:Publication []) =>{
      this.publications = this.createPublication(publications);
      //console.log(JSON.stringify(this.favorites));
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
      console.log(JSON.stringify(newPublication));

      newPublicationList.push(newPublication);
    }
    return newPublicationList
  }

  delete(publcation: Publication){
    this.sqliteService.delete(publcation.id)
    .then((changes) => {
      //console.log(changes);
      console.log("deleteFavorite");

      this.read(); // Volvemos a leer

    }).catch(err => {
    console.error(err);
  })
  }

  doRefresh(event: any){
    setTimeout(() => {
      this.read();
      event.target.complete();
    }, 2000);
  }

}


