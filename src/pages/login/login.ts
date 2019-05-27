import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { CarListPage } from '../car-list/car-list';
import { RegistrationPage } from '../registration/registration';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader: any;

  addArray = {
    'username':'', 
    'password':''
  };

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
    public authservice: AuthProviderServiceProvider,
  ) 
  {
    
    if(window.localStorage.getItem('user_id')){
      this.navCtrl.setRoot(CarListPage, {}, {animate:true,direction:'forward'});
    }

    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();
  }

  SkipMe()
  {
    this.navCtrl.setRoot(CarListPage, {}, {animate:true,direction:'forward'});
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  LogginMe()
  {
    if(!this.addArray.username){
      let toast = this.toastCtrl.create({ message: 'user name (login id) required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.password){
      let toast = this.toastCtrl.create({ message: 'password required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(this.addArray.password.length < 6){
      let toast = this.toastCtrl.create({ message: 'password length should be at least 6 character !', position: 'top', duration: 3000 });
      toast.present();
    }
    else{

      this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader.present();

      this.authservice.postData(this.addArray, 'DoLogin').then((result)=>{

        if(result['response'] == 1){
          this.loader.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
          toast.present();
          this.addArray = {'username':'','password':''};
          
          localStorage.setItem('user_id',result['user_data']['user_id']);
          localStorage.setItem('user_name',result['user_data']['name']);
          localStorage.setItem('login_id',result['user_data']['login_id']);
          localStorage.setItem('user_address',result['user_data']['address']);
          localStorage.setItem('user_city',result['user_data']['city']);
          localStorage.setItem('user_state',result['user_data']['state']);
          localStorage.setItem('user_zip',result['user_data']['zip']);
          localStorage.setItem('user_phone',result['user_data']['phone']);
          localStorage.setItem('user_email',result['user_data']['email']);
          localStorage.setItem('user_user_type',result['user_data']['user_type']);
          localStorage.setItem('is_active',result['user_data']['is_active']);
      
          // setTimeout(function(){ 
            this.navCtrl.setRoot(CarListPage, {}, {animate:true,direction:'forward'});
          // }, 2000);
        }else if(result['response'] == 2){
          this.loader.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
          toast.present();
        }else{
          this.loader.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
          toast.present();
        }
        
      },(err)=> {

        this.loader.dismiss();
        let toast = this.toastCtrl.create({ message: 'Error : '+err, position: 'top', duration: 3000 });
        toast.present();

      });

    }
  }

  RegisterMe()
  {
    this.navCtrl.setRoot(RegistrationPage, {'GoOnPage':'question'}, {animate:true,direction:'forward'});
  }

  ForgotPassword()
  {
    this.navCtrl.setRoot(ForgotPasswordPage, {'GoOnPage':'question'}, {animate:true,direction:'forward'});
  }

}
