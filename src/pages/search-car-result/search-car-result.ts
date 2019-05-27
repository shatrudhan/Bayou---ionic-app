import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { CarDetailPage } from './../car-detail/car-detail';
import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { global } from "../../app/global";

@Component({
  selector: 'page-search-car-result',
  templateUrl: 'search-car-result.html',
})
export class SearchCarResultPage {
  loader: any;
  addArray: any;
  car_list: any;
  base_path: string;
  clen: any;

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
    public authservice : AuthProviderServiceProvider,
  ) 
  {
    this.base_path = global.apiBaseUrl;

    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();

    this.addArray = navParams.get('MyArray');

    let postArray = {
      'min_year' : this.addArray.min_year,
      'max_year' : this.addArray.max_year,
      'make' : this.addArray.make,
      'model' : this.addArray.model,
      'engine' : this.addArray.engine,
      'transmission' : this.addArray.transmission,
      'style' : this.addArray.style,
      'min_cost' : this.addArray.min_cost,
      'max_cost' : this.addArray.max_cost,
      'min_price' : this.addArray.min_price,
      'max_price' : this.addArray.max_price,
      'color' : this.addArray.color
    }

    this.authservice.postData(postArray,'GetCarListFromSearchPage').then((result)=>{
      if(result['response'] == 1){
        this.car_list = result['car_list'];
        this.clen = result['car_list'].length;
      }
    });

  }

  GoToCarDetail(vehicle_id)
  {
    this.navCtrl.push(CarDetailPage, {'vehicle_id':vehicle_id}, {animate:true,direction:'back'});
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  modalDismiss()
  {
    this.viewCtrl.dismiss();
  }


}
