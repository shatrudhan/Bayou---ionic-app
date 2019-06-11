import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  loader: any;

  addArray = {
              'username':'', 
              'password':'', 
              'name':'', 
              'address':'', 
              'city':'', 
              'state':'',
              'zip':'', 
              'phone':'', 
              'email':''
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
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  GoToLoginPage()
  {
    this.navCtrl.setRoot(LoginPage, {'GoOnPage':'question'}, {animate:true,direction:'forward'});
  }

  DoSignupBtn()
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
    else if(!this.addArray.name){
      let toast = this.toastCtrl.create({ message: 'name required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.address){
      let toast = this.toastCtrl.create({ message: 'address required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.city){
      let toast = this.toastCtrl.create({ message: 'city required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.state){
      let toast = this.toastCtrl.create({ message: 'state required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.zip){
      let toast = this.toastCtrl.create({ message: 'zip code required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(this.addArray.zip.length != 5){
      let toast = this.toastCtrl.create({ message: 'zip code length should be 5 character !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.phone){
      let toast = this.toastCtrl.create({ message: 'phone number required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else if(!this.addArray.email){
      let toast = this.toastCtrl.create({ message: 'email address required !', position: 'top', duration: 3000 });
      toast.present();
    }
    else{

      this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader.present();

      this.DoEmailVerification(this.addArray.email);

    }

  }

  DoEmailVerification(email:any)
  {
    this.loader.dismiss();

    var vcode = Math.floor(100000 + Math.random() * 900000);

    this.SendingVerificationCode(vcode,email);

    let alert = this.alertCtrl.create({
      title: 'An email verification code has been sent on your mentioned email address `'+email+'`',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'vcode',
          placeholder: 'verification code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Validate',
          handler: data => {
            if (data.vcode == '' || data.vcode == null) {
              let toast = this.toastCtrl.create({ message: 'Enter verification code ?', position: 'top', duration: 2000 });
              toast.present();
              return false;
            } else if(vcode != data.vcode) {
              let toast = this.toastCtrl.create({ message: 'Invalid code.', position: 'top', duration: 2000 });
              toast.present();
              return false;
            }else{
              let toast = this.toastCtrl.create({ message: 'Invalid code.', position: 'top', duration: 2000 });
              toast.present();

              this.authservice.postData(this.addArray, 'DoSignup').then((result)=>{
                if(result['response'] == 1){
                  this.loader.dismiss();
                  let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 8000 });
                  toast.present();
                  this.addArray = {'username':'','password':'','name':'','address':'','city':'','state':'','zip':'', 'phone':'','email':''};
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
        }
      ]
    });
    alert.present();

  }

  SendingVerificationCode(vcode:number,email:any)
  {
    this.authservice.postData({vcode:vcode,email:email}, 'SendingVerificationCode').then((result)=>{
      if(result['response'] == 1){
        let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
        toast.present();
      }else{
        let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
        toast.present();
      }
      
    },(err)=> {
      let toast = this.toastCtrl.create({ message: 'Error : '+err, position: 'top', duration: 3000 });
      toast.present();
    });
  }










}
