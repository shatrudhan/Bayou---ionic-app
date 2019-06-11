import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { global } from "../../app/global";
import { CarDetailPage } from '../car-detail/car-detail';


@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html',
})
export class CarListPage {
  loader: any;
  car_list: any;
  base_path: string;
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
    public authservice : AuthProviderServiceProvider,
  ) 
  {

    this.login_id = localStorage.getItem('login_id');

    this.base_path = global.apiBaseUrl;

    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();

    this.GettingAllCars();
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }
  
  LogoutMe() 
  {
    // localStorage.clear();
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('login_id');
    localStorage.removeItem('user_address');
    localStorage.removeItem('user_city');
    localStorage.removeItem('user_state');
    localStorage.removeItem('user_zip');
    localStorage.removeItem('user_phone');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_user_type');
    localStorage.removeItem('is_active');
    this.navCtrl.setRoot(LoginPage, {}, {animate:true,direction:'back'});
  }

  ShortBy()
  {
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();

    this.car_list = this.car_list.reverse();

    if(this.car_list){
      this.loader.dismiss();
    }
  }
  
  GettingAllCars()
  {
    this.authservice.postData({ab:''},'GetCarList').then((result)=>{
      if(result['response'] == 1){
        this.car_list = result['car_list'];
      }
    });
  }

  GoToCarDetail(vehicle_id)
  {
    this.navCtrl.push(CarDetailPage, {'vehicle_id':vehicle_id}, {animate:true,direction:'back'});
  }

  updateList(ev) 
  {
    let search_val = ev.target.value;
    if(search_val.length)
    {
      // this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      // this.loader.present();

      this.authservice.postData({search_val:search_val},'GetSearchCarList').then((result)=>{
        if(result['response'] == 1){
          this.car_list = [];
          this.car_list = result['car_list'];
          // this.loader.dismiss();
        }else{
          // this.loader.dismiss();
          this.car_list = result['car_list'];
          // let toast = this.toastCtrl.create({ message: result['msg'], position: 'bottom', duration: 3000 });
          // toast.present();
        }
      });
    }
    else
    {
      this.GettingAllCars();
    }

  }

  onCancel(ev) 
  { 
    ev.target.value = '';
    this.GettingAllCars();
  }



}
