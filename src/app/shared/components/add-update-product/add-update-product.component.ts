import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required, Validators.minLength(2)]),
    image: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required, Validators.minLength(2)])
  })

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;


  ngOnInit() {

    this.user = this.utilsService.getLocalStorage('user');
  }

  async takeImage(){
    const dataUrl = (await this.utilsService.takePicture('Imagen del producto')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }


  async createPublication(){
    if(this.form.valid){

      let path = 'publicaction';
      let dataUrl = this.form.value.image;
      let imagePath = `${uuidv4()}`
      let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      const loading = await this.utilsService.loading();
      await loading.present();

      delete this.form.value.id;
      this.firebaseService.addDocument(path, this.form.value)
      .then( async request => {

        this.utilsService.dismisModal({success: true});

        this.utilsService.presentToast({
          message: `Prublicación subida correctamente`,
          duration: 1500,
          color: 'succes',
          position:'middle',
          icon:'checkmark-circle-outline'
        })        

      }).catch(error =>{
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position:'middle',
          icon:'alert'
        })
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

}
