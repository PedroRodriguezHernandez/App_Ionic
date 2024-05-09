import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc, getDoc, addDoc, collection,collectionData,query } from '@angular/fire/firestore'
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage'


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsServer = inject(UtilsService);
  storaje = inject(AngularFireStorage);

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

  addDocument(path:string, data: any){
    return addDoc(collection(getFirestore(),path),data);
  }

  getCollectionData(path:string, collectionQuery?: any){
    const ref = collection(getFirestore(),path);
    return collectionData(query(ref,collectionQuery),{idField:'id'});
  }


  //=== Cerrar Sesión===
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsServer.routerLink('/auth');
  }

  //=========Storage===============
  async uploadImage(path:string, data_url: string){
    return uploadString(ref(getStorage(),path), data_url, 'data_url')
    .then(() =>{
        return getDownloadURL(ref(getStorage(), path));
    });
  }
}
