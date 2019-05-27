import { CarListPage } from './../car-list/car-list';
import { LoginPage } from './../login/login';
import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { Component , ElementRef} from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { global } from "../../app/global";
import { EditVehicleInfoPage } from '../edit-vehicle-info/edit-vehicle-info';


@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage {

  addArray = {
    'vehicle_id':'',     
    'note':''
  };

  loader: any;
  vehicle_id: any;
  owner_info: any;
  car_photos: any;
  notes: any;
  car_info: any;
  user_name: string;
  base_path: string;
  user_id: string;
  user_id_1: any;
  enable_disable: any;
  fab_class: number;
  blurCont: any;
  current_date: Date;
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
    public el: ElementRef
  ) 
  {
    this.login_id = localStorage.getItem('login_id');
    
    this.user_id = localStorage.getItem('user_id');
    this.user_name = localStorage.getItem('user_name');
    this.base_path = global.apiBaseUrl;
    
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();

    this.vehicle_id = navParams.get('vehicle_id');

    this.addArray.vehicle_id = navParams.get('vehicle_id');
    this.current_date = new Date();

    this.GetOwnerInfo(this.vehicle_id);
    this.GetCarPhotos(this.vehicle_id);
    this.GetNotes(this.vehicle_id);
    this.GetCarInfo(this.vehicle_id);
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  ionViewWillLeave() 
  {
    this.navCtrl.setRoot(CarListPage);
  }

  OpenCloseFabBtn()
  {
    this.fab_class = document.getElementsByClassName('fab-close-active').length;
    if(this.fab_class == 0){
      // add blur
      if(document.querySelector("ion-nav")){
        this.el.nativeElement.querySelectorAll('.card').forEach(
          question => {
            question.classList.add('blur-back');
          }
        )
      }
    }else{
      // remove blur
      if(document.querySelector("ion-nav")){
        this.el.nativeElement.querySelectorAll('.card').forEach(
          question => {
            question.classList.remove('blur-back');
          }
        )
      }
    }
  }

  LogoutMe() 
  {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage, {}, {animate:true,direction:'back'});
  }

  GetOwnerInfo(vehicle_id)
  {
    this.authservice.postData({vehicle_id:vehicle_id},'GetOwnerInfoByVehicleId').then((result)=>{
      if(result['response'] == 1){
        this.owner_info = result['owner_info'];
      }
    });
  }

  GetCarPhotos(vehicle_id)
  {
    this.authservice.postData({vehicle_id:vehicle_id},'GetCarPhotosByVehicleId').then((result)=>{
      if(result['response'] == 1){
        this.car_photos = result['car_photos'];
      }
    });
  }

  GetNotes(vehicle_id)
  {
    this.authservice.postData({vehicle_id:vehicle_id},'GetNotesByVehicleId').then((result)=>{
      if(result['response'] == 1){
        this.notes = result['notes'];
      }
    });
  }

  GetCarInfo(vehicle_id)
  {
    this.authservice.postData({vehicle_id:vehicle_id},'GetCarInfoByVehicleId').then((result)=>{
      if(result['response'] == 1){
        // this.user_id_1 = '';
        this.user_id_1 = result['car_info'][0]['user_id'];
        if(this.user_id_1 == this.user_id){
          this.enable_disable = true;
        }else{
          this.enable_disable = false;
        }

        this.car_info = result['car_info'];
      }
    });
  }

  EditVehicleBtn()
  {
    let modal = this.modalCtrl.create(EditVehicleInfoPage, { vehicle_id: this.vehicle_id});
      modal.present();
      modal.onDidDismiss((result) => {
        this.OpenCloseFabBtn();
        this.GetOwnerInfo(this.vehicle_id);
        this.GetCarPhotos(this.vehicle_id);
        this.GetNotes(this.vehicle_id);
        this.GetCarInfo(this.vehicle_id);
      });
  }

  AddNoteBtn()
  {
    this.fab_class = document.getElementsByClassName('fab-close-active').length;
    if(this.fab_class == 1){
        let a1 = this.el.nativeElement.querySelector('.fab');
        a1.classList.remove('fab-close-active');

        let a2 = this.el.nativeElement.querySelector('.fablist');
        a2.classList.remove('fab-list-active');

        this.el.nativeElement.querySelectorAll('.card').forEach(
          question => {
            question.classList.remove('blur-back');
          }
        )
    }else{
        let a3 = this.el.nativeElement.querySelector('.fab');
        a3.classList.add('fab-close-active');

        let a4 = this.el.nativeElement.querySelector('.fablist');
        a4.classList.add('fab-list-active');

        this.el.nativeElement.querySelectorAll('.card').forEach(
          question => {
            question.classList.add('blur-back');
          }
        )
    }
    
    document.getElementById("noteform").removeAttribute("hidden"); 
    let el = document.getElementById('noteform');
    el.scrollIntoView({ behavior: 'smooth' });
  }

  HideNoteForm()
  {
    this.addArray.note = '';
    document.getElementById("noteform").setAttribute("hidden",'hidden'); 
  }

  SubmitNoteBtn()
  {
    if(!this.addArray.note){
      let el = document.getElementById('noteform');
      el.scrollIntoView({ behavior: 'smooth' });
      let toast = this.toastCtrl.create({ message: 'Please enter note !', position: 'top', duration: 3000 });
      toast.present();
    }else{
      this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader.present();

      this.authservice.postData(this.addArray, 'AddVehicleNoteByUser').then((result)=>{
        if(result['response'] == 1){
          this.loader.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
          toast.present();

          this.notes = [];
          this.GetNotes(this.addArray.vehicle_id);

          this.HideNoteForm();
          
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
