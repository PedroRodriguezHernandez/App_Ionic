import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  router = inject(Router);
  products:Publication[] = [];

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPublication();
  }

  user(){
    return this.utilsService.getLocalStorage('user');
  }

  getPublication(){
    let path = 'publication';
    let subs = this.firebaseService.getCollectionData(path)
      .subscribe({
        next:(res:any)=>{
          this.products = res;
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
    this.router.navigate(['/main/recipe'])
  }
}
