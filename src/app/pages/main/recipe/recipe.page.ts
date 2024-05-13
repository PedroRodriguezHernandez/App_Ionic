import { Component, OnInit, inject } from '@angular/core';
import { Publication } from 'src/app/models/publication.model';
import { UtilsService } from 'src/app/services/utils.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  
  firebaseService = inject(FirebaseService);
  utilService = inject(UtilsService);
  publication: Publication;
  ingredients = {};
  title:string;
  image:string;

  isSave: boolean;
  
  ngOnInit() {
    this.getPublication();
    this.isSave = history.state.isSave ? history.state.isSave : false;
  }

  async getPublication(){
    this.publication = this.utilService.getLocalStorage("recipe");
    this.ingredients = this.publication.ingredient;
    this.image = await this.firebaseService.getImage(this.publication.image);
    this.title = this.publication.name;
  }

}
