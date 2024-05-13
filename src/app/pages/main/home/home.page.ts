import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{

  favorites:Publication[];
  publications:Publication[];

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService,
    private sqliteService: SqliteService,
    private router: Router
  ){
    this.publications = [],
    this.favorites = []
  }

  async ionViewWillEnter() {
    this.getPublication();
    await this.read();
  }
  user(){
    return this.utilsService.getLocalStorage('user');
  }

  getPublication(){
    let path = 'publication';
    let subs = this.firebaseService.getCollectionData(path)
      .subscribe({
        next:(res:any)=>{
          this.publications = res;
          subs.unsubscribe();
        }
    });
    
  }

  sigOut(){
    this.firebaseService.signOut();
  }

  addUpdatePublication(){
    this.utilsService.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    })
  }

  goToRecipe(publication:Publication){
    this.utilsService.saveLocalStorage("recipe",publication);
    this.router.navigate(['/main/recipe']);
  }

  save(publication:Publication){
    this.sqliteService.create(publication)
    .then(async () => {
      console.log("Creado");
      await this.read();
    }).catch(err =>{
      console.log(err);
    });
  }

  async read(){
    this.sqliteService.read()
    .then(async (publications:Publication []) =>{
      this.favorites = await this.createPublication(publications);
    });    
  }

  async createPublication(publications:any[]){
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

  isFavorite(publication:Publication) {
    let item = this.favorites.find(elem => elem.id === publication.id);
    let favorite: boolean = !!item;

    return favorite;
  }
}
