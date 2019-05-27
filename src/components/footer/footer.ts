import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';

import { CarListPage } from '../../pages/car-list/car-list';
import { AddCarPage } from '../../pages/add-car/add-car';
import { SearchCarPage } from '../../pages/search-car/search-car';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  text: string;
  active_inactive_color_1: any;
  active_inactive_color_2: any;
  active_inactive_color_3: any;
  login_id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,  
    public actionSheetCtrl: ActionSheetController, 
    public platform: Platform,
    public popoverCtrl: PopoverController,     
    public alertCtrl: AlertController,
  ) 
  {
    this.login_id = localStorage.getItem('login_id');
  }

  GoToPage(param)
  {
    //window.localStorage.removeItem("active_inactive_color_1");
    //window.localStorage.removeItem("active_inactive_color_2");
    //window.localStorage.removeItem("active_inactive_color_3");

    if(param == 1){

      window.localStorage.setItem("active_inactive_color_1",'#ff4343');
      window.localStorage.setItem("active_inactive_color_2",'#000');
      window.localStorage.setItem("active_inactive_color_3",'#000');

      this.navCtrl.setRoot(CarListPage, {'header_title':'aaaa'}, {animate:true,direction:'forward'});
    }else if(param == 2){

      window.localStorage.setItem("active_inactive_color_1",'#000');
      window.localStorage.setItem("active_inactive_color_2",'#ff4343');
      window.localStorage.setItem("active_inactive_color_3",'#000');

      this.navCtrl.setRoot(SearchCarPage, {'header_title':'question'}, {animate:true,direction:'forward'});
    }else if(param == 3){

      window.localStorage.setItem("active_inactive_color_1",'#000');
      window.localStorage.setItem("active_inactive_color_2",'#000');
      window.localStorage.setItem("active_inactive_color_3",'#ff4343');

      this.navCtrl.setRoot(AddCarPage, {'header_title':'question'}, {animate:true,direction:'forward'});
    }else if(param == 4){

      window.localStorage.setItem("active_inactive_color_1",'#000');
      window.localStorage.setItem("active_inactive_color_2",'#000');
      window.localStorage.setItem("active_inactive_color_3",'#ff4343');

      this.navCtrl.setRoot(LoginPage, {'header_title':''}, {animate:true,direction:'forward'});
    }

  }
  
  ngAfterViewInit() 
  {
    this.active_inactive_color_1 = window.localStorage.getItem("active_inactive_color_1");
    this.active_inactive_color_2 = window.localStorage.getItem("active_inactive_color_2");
    this.active_inactive_color_3 = window.localStorage.getItem("active_inactive_color_3");
  }

  ngOnDestroy()
  {
    window.localStorage.setItem("active_inactive_color_1",'#ff4343');
    window.localStorage.setItem("active_inactive_color_2",'#000');
    window.localStorage.setItem("active_inactive_color_3",'#000');
  }

}
