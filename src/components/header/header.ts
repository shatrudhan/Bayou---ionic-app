import { Component } from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';


@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  header_title: string;
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
    
    this.header_title = this.navParams.get('header_title');
    this.login_id = localStorage.getItem('login_id');
    
  }

}
