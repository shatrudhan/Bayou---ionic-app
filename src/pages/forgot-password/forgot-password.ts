import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { global } from '../../app/global';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  loader: any;

  addArray = {
              'f_email':''
            };
  loader_1: any;

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
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();
  }

  GoToLoginPage()
  {
    this.navCtrl.setRoot(LoginPage, {'GoOnPage':'question'}, {animate:true,direction:'forward'});
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  ForgotPasswordBtn()
  {

    if(this.addArray.f_email == '' || this.addArray.f_email == null){
      let toast = this.toastCtrl.create({ message: 'enter email address !', position: 'bottom', duration: 3000 });
      toast.present();
    }else if(global.isValidEmail(this.addArray.f_email) == false){
      let toast = this.toastCtrl.create({ message: 'enter valid email address !', position: 'bottom', duration: 3000 });
      toast.present();
    }else{
      
      this.loader_1 = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader_1.present();

      this.authservice.postData(this.addArray, 'ForgotPassword').then((result)=>{
        if(result['response'] == 1){
          this.loader_1.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'bottom', duration: 8000 });
          toast.present();
          this.addArray = {'f_email':''};
        }else if(result['response'] == 2){
          this.loader_1.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'bottom', duration: 3000 });
          toast.present();
        }else{
          this.loader_1.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'bottom', duration: 3000 });
          toast.present();
        }
        
      },(err)=> {
        this.loader_1.dismiss();
        let toast = this.toastCtrl.create({ message: 'Error : '+err, position: 'bottom', duration: 3000 });
        toast.present();
      });

    }

    
  }





}
