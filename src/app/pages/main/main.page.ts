import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  firebaseService = inject(FirebaseService)
  pages =[
    {title: 'Inicio', url: '/main/home', icon: 'home-outline'},
    {title: 'Guardados', url: '/main/save', icon: 'bookmark-outline'},
  ]

  router = inject(Router);
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }

  logOut(){
    this.firebaseService.signOut();
  }

}
