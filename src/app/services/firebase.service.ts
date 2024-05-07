import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore'
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsServer = inject(UtilsService);

  //==============Autentificación==============
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password)
  }

  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password)
  }

  updateUser(displayName:string){
    return updateProfile(getAuth().currentUser,{ displayName });
  }

  getAuth( ){
    return getAuth();
  }
  //================Base de datos============
  setDocument(path:string, data: any){
    return setDoc(doc(getFirestore(),path),data);
  }

  async getDocument(path:string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }

  //=== Cerrar Sesión===
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsServer.routerLink('/auth');
  }
}
