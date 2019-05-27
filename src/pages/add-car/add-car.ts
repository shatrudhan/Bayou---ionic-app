
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, ToastController, LoadingController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthProviderServiceProvider } from '../../providers/auth-provider-service/auth-provider-service';
import { global } from "../../app/global";

@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html',
})
export class AddCarPage {

  toast: any;
  imageFileName: Array<{photos : any, fname: any, index: number}> = [];
  loader: any;
  loader_1: any;
  ArrIndex: number;
  
  addArray = {
    'user_id':'', 
    'owner_name':'', 
    'owner_address':'', 
    'owner_city':'', 
    'owner_state':'', 
    'owner_zip':'', 
    'owner_phone':'',
    'owner_email':'', 

    'year':'', 
    'make':'',
    'model':'',
    'vtrim':'',
    'style':'',
    'color':'',
    'vin':'',
    'mileage':'',
    'price':'',
    'cost':'',
    'engine':'',
    'transmission':'',
    'description':'',
    'note':''
  };
  filename_str: any[];
  myLoadingControl: any;
  user_id: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public  transfer: FileTransfer,
    public  camera: Camera,
    public authservice : AuthProviderServiceProvider,
  ) 
  {
    this.myLoadingControl = loadingCtrl;

    this.imageFileName = [];
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();

    this.addArray.user_id = localStorage.getItem('user_id');
    this.addArray.owner_name = localStorage.getItem('user_name');
    this.addArray.owner_address = localStorage.getItem('user_address');
    this.addArray.owner_city = localStorage.getItem('user_city');
    this.addArray.owner_state = localStorage.getItem('user_state');
    this.addArray.owner_zip = localStorage.getItem('user_zip');
    this.addArray.owner_phone = localStorage.getItem('user_phone');
    this.addArray.owner_email = localStorage.getItem('user_email');

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

  ClickToOpenActionSheet()
  {
    if(this.imageFileName.length >= 10){

      this.presentToast('You can upload 10 photos at this time.');

    }else{
      
      const actionSheet = this.actionSheetController.create({
        buttons: [{
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.UploadPhotoFromCamera();
          }
        }, {
          text: 'Gallery',
          icon: 'folder',
          handler: () => {
            this.UploadPhotoFromGallery();
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      actionSheet.present();

    }

  }
  
  presentToast(msg) 
  {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  UploadPhotoFromCamera()
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.ArrIndex = this.imageFileName.length;
      this.ArrIndex += 1;
      
      let fn = "data:image/jpeg;base64,"+imageData;
      var filename = fn.substring(fn.lastIndexOf('/') + 1, fn.length );
      //var fileExtension = fn.substring(fn.lastIndexOf('.') + 1, fn.length );
      var newFileName = this.createFileName(filename,'jpeg');
      
      this.imageFileName.push({ photos : "data:image/jpeg;base64,"+imageData, fname:newFileName, index:this.ArrIndex });
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }
  
  UploadPhotoFromGallery()
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.ArrIndex = this.imageFileName.length;
      this.ArrIndex += 1;

      let fn = "data:image/ ;base64,"+imageData;
      var filename = fn.substring(fn.lastIndexOf('/') + 1, fn.length );
      //var fileExtension = fn.substring(fn.lastIndexOf('.') + 1, fn.length );
      var newFileName = this.createFileName(filename,'jpeg');

      this.imageFileName.push({ photos : "data:image/jpeg;base64,"+imageData, fname:newFileName, index:this.ArrIndex });

    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  RemoveUploadedImg(imgIndex:number)
  {
    for (let order of this.imageFileName) {
        if (order.index == imgIndex) {
          this.imageFileName.splice(this.imageFileName.indexOf(order), 1);
            break;
        }      
    }
  }

  CarInfoSubmit()
  {
    
    if(!this.addArray.owner_name){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter owner name !');
    }
    else if(!this.addArray.owner_address){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter owner address !');
    }
    else if(!this.addArray.owner_city){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter city name!');
    }
    else if(!this.addArray.owner_state){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter state name!');
    }
    else if(!this.addArray.owner_zip){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter zip code !');
    }
    else if(this.addArray.owner_zip.length != 6){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('zip code length should be 6 character !');
    }
    else if(!this.addArray.owner_phone){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter phone number');
    }
    else if(!this.addArray.owner_email){
      let el = document.getElementById('owner_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter owner email address');
    }

    else if(!this.imageFileName.length){
      let el = document.getElementById('image_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('upload at least 1 photo !');
    }

    else if(!this.addArray.year){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('select year value !');
    }
    else if(!this.addArray.make){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter make value !');
    }
    else if(!this.addArray.model){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter model value !');
    }
    else if(!this.addArray.vtrim){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter trim value !');
    }
    else if(!this.addArray.style){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter style value !');
    }
    else if(!this.addArray.color){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter color value !');
    }
    else if(!this.addArray.vin){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter Vin value !');
    }
    else if(!this.addArray.mileage){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter mileage value !');
    }
    else if(!this.addArray.price){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter price value !');
    }
    else if(!this.addArray.cost){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter cost value !');
    }
    else if(!this.addArray.engine){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter engine value !');
    }
    else if(!this.addArray.transmission){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter transmission value !');
    }
    else if(!this.addArray.description){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter description !');
    }
    else if(!this.addArray.note){
      let el = document.getElementById('car_content');
      el.scrollIntoView({ behavior: 'smooth' });
      this.presentToast('enter note !');
    }
    else{

      this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader.present();

      this.authservice.postData(this.addArray, 'AddVehicleInfo').then((result)=>{
        if(result['response'] == 1){
          this.loader.dismiss();
          this.UploadPhotosToServer(result['vehicle_id']);
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
  
  public createFileName(filename,fextension) 
  {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + "."+fextension;
    return newFileName;
  }

  UploadPhotosToServer(vehicle_id)
  {
    
    this.loader_1 = this.myLoadingControl.create({
      content : "Uploading.."
    });

    this.loader_1.present().then(() => {

      var url = global.apiUserUrl+'UploadPhotos';
      for (let index = 0; index < this.imageFileName.length; index++) 
      {
        
        var options: FileUploadOptions  = {
          fileKey: 'file',
          fileName: this.imageFileName[index].fname,
          headers: {},
          params : {'file_name': this.imageFileName[index].fname, 'vehicle_id':vehicle_id}
        };
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.imageFileName[index].photos, url, options).then((data) => {
            if(index == this.imageFileName.length-1){
              this.loader_1.dismiss();          
              this.presentToast('Information has been added successfully.');

              this.imageFileName = [];

              this.navCtrl.setRoot(this.navCtrl.getActive().component);

              /*
              this.addArray = {
                'user_id':'',
                'owner_name':'', 
                'owner_address':'', 
                'owner_city':'', 
                'owner_state':'', 
                'owner_zip':'', 
                'owner_phone':'',
                'owner_email':'', 

                'year':'', 
                'make':'',
                'model':'',
                'vtrim':'',
                'style':'',
                'color':'',
                'vin':'',
                'mileage':'',
                'price':'',
                'cost':'',
                'engine':'',
                'transmission':'',
                'description':'',
                'note':''
              };
              */

            }
        }, err => {
          console.log(err);
          this.loader_1.dismiss();          
          this.presentToast('Sorry! unable to upload file!');
        });
        
      }

    });

  }












}