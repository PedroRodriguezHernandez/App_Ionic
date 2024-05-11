import { Component, OnInit, inject } from '@angular/core';
import { Publication } from 'src/app/models/publication.model';
import { UtilsService } from 'src/app/services/utils.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  utilService = inject(UtilsService);
  publication: Publication;
  ingredients = {};
  title:string;


  
  ngOnInit() {
    this.getPublication();
    console.log(this.publication);
    

  }

  getPublication(){
    this.publication = this.utilService.getLocalStorage("recipe");
    this.ingredients = this.publication.ingredient;
    this.title = this.publication.name;
  }

}
