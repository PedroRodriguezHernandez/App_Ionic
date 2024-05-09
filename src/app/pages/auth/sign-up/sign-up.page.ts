import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(2)]) 
  })

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){

      const loading = await this.utilsService.loading();
      await loading.present();
      
      await this.firebaseService.signUp(this.form.value as User)
      .then( async request => {

        await this.firebaseService.updateUser(this.form.value.name)
        let uid = request.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);

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

  async setUserInfo(uid: string){
    if(this.form.valid){

      const loading = await this.utilsService.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;
      this.firebaseService.setDocument(path, this.form.value)
      .then( async request => {
        console.log(request);
        
        this.utilsService.saveLocalStorage('user', this.form.value.uid);
        this.utilsService.routerLink('/main/home');
        this.form.reset();
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
