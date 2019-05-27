import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SearchCarResultPage } from '../search-car-result/search-car-result';

@Component({
  selector: 'page-search-car',
  templateUrl: 'search-car.html',
})
export class SearchCarPage {
  loader: any;

  addArray = {
    'min_year':'', 
    'max_year':'',
    'make':'',
    'model':'',
    'engine':'',
    'transmission':'',
    'style':'',
    'min_cost':'',
    'max_cost':'',
    'min_price':'',
    'max_price':'',
    'color':''
  };
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
    
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  LogoutMe() 
  {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage, {}, {animate:true,direction:'back'});
  }

  VehicleSearchBtn()
  {
    
    if(
        this.addArray.min_year == '' &&
        this.addArray.max_year == '' &&
        this.addArray.make == '' &&
        this.addArray.model == '' &&
        this.addArray.engine == '' &&
        this.addArray.transmission == '' &&
        this.addArray.style == '' &&
        this.addArray.min_cost == '' &&
        this.addArray.max_cost == '' &&
        this.addArray.min_price == '' &&
        this.addArray.max_price == '' &&
        this.addArray.color == ''
    ){
      let toast = this.toastCtrl.create({ message: 'One field value required !', position: 'top', duration: 3000 });
      toast.present();
    }else{
      let modal = this.modalCtrl.create(SearchCarResultPage, {myObj: this, MyArray: this.addArray});
      modal.present();
      modal.onDidDismiss((result) => {
        this.addArray = {
          'min_year':'', 
          'max_year':'',
          'make':'',
          'model':'',
          'engine':'',
          'transmission':'',
          'style':'',
          'min_cost':'',
          'max_cost':'',
          'min_price':'',
          'max_price':'',
          'color':''
        };
      });
    }
    
    

  }



  
}
