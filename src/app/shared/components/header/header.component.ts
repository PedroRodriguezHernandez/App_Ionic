import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!:string;
  @Input() backButton!:string;
  @Input() isModal!:boolean;
  @Input() isRecipe!:boolean;

  utilsService = inject(UtilsService);
  router = inject(Router);

  ngOnInit() {}

  goHome(){
    this.router.navigate(['/main/home']);
  }
  dismissModal(){
    this.utilsService.dismisModal();
  }
}
