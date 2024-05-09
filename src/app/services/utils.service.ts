import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);




async takePicture (promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Seleccione una imagen',
    promptLabelPicture: 'Puede tomar una foto'

  });

};


  //=============Loading==========
  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  //==========Toast============
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //==============Enruta=========
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  saveLocalStorage(key:string,value:any){
    return localStorage.setItem(key,JSON.stringify(value));
  }

  getLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key));
  }

  //==========Modal===========
  async presentModal(opt: ModalOptions) {
    const modal = await this.modalCtrl.create(opt);
    await modal.present();
  
    const {data} = await modal.onWillDismiss();
    if(data) return data;
  }

  dismisModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }
}
