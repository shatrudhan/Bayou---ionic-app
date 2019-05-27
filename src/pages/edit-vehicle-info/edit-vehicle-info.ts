import { CarDetailPage } from './../car-detail/car-detail';
import { AuthProviderServiceProvider } from './../../providers/auth-provider-service/auth-provider-service';
import { Component , ElementRef, ViewChildren} from '@angular/core';
import {AlertController, PopoverController,NavController, ActionSheetController, Platform, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { global } from "../../app/global";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CarListPage } from '../car-list/car-list';


@Component({
  selector: 'page-edit-vehicle-info',
  templateUrl: 'edit-vehicle-info.html',
})
export class EditVehicleInfoPage {

  //@ViewChildren('.all_notes') all_notes;

  vehicle_id: any;
  base_path: string;
  loader: any;
  owner_info: any;
  car_photos: any;
  notes: any;
  user_id_1: any;
  user_id: string;
  enable_disable: boolean;
  car_info: any;

  addArray = {
    'user_id' : '',
    'vehicle_id':'', 

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
  };

  user_name: string;

  imageFileName: Array<{photos : any, fname: any, index: number}> = [];
  ArrIndex: number;
  loader_1: any;
  myLoadingControl: any;
  addNotesArray: Array<{note:''}> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,  
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    public popoverCtrl: PopoverController,     
    public alertCtrl: AlertController,
    public authservice : AuthProviderServiceProvider,
    public el: ElementRef,
    public  transfer: FileTransfer,
    public  camera: Camera,
  ) 
  {
    this.myLoadingControl = loadingCtrl;
    this.imageFileName = [];


    this.base_path = global.apiBaseUrl;

    this.user_name = localStorage.getItem('user_name');
    this.user_id = localStorage.getItem('user_id');
    
    this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
    this.loader.present();
    
    this.vehicle_id = navParams.get('vehicle_id');

    this.addArray.vehicle_id = navParams.get('vehicle_id');
    this.addArray.user_id = localStorage.getItem('user_id');

    this.GetOwnerInfo(this.vehicle_id);
    this.GetCarPhotos(this.vehicle_id);
    this.GetNotes(this.vehicle_id);
    this.GetCarInfo(this.vehicle_id);
  }

  ionViewDidLoad() 
  {
    this.loader.dismiss();
  }

  modalDismiss()
  {
    this.viewCtrl.dismiss();
  }

  GetOwnerInfo(vehicle_id)
  {
    this.authservice.postData({vehicle_id:vehicle_id},'GetOwnerInfoByVehicleId').then((result)=>{
      if(result['response'] == 1){
        this.owner_info = result['owner_info'];

        this.addArray.owner_name = result['owner_info'][0]['owner_name'];
        this.addArray.owner_address = result['owner_info'][0]['owner_address'];
        this.addArray.owner_city = result['owner_info'][0]['owner_city'];
        this.addArray.owner_state = result['owner_info'][0]['owner_state'];
        this.addArray.owner_zip = result['owner_info'][0]['owner_zip'];
        this.addArray.owner_phone = result['owner_info'][0]['owner_phone'];
        this.addArray.owner_email = result['owner_info'][0]['owner_email'];

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
        this.notes.forEach(element => {

        });
      }
    });
  }

  GetCarInfo(vehicle_id)
  {
    this.authservice.postData({vehicle_id:vehicle_id},'GetCarInfoByVehicleId').then((result)=>{
      if(result['response'] == 1){
       
        this.user_id_1 = result['car_info'][0]['user_id'];
        this.car_info = result['car_info'];

        this.addArray.year = result['car_info'][0]['year'];
        this.addArray.make = result['car_info'][0]['make'];
        this.addArray.model = result['car_info'][0]['model'];
        this.addArray.vtrim = result['car_info'][0]['trim'];
        this.addArray.style = result['car_info'][0]['style'];
        this.addArray.color = result['car_info'][0]['color'];
        this.addArray.vin = result['car_info'][0]['vin'];
        this.addArray.mileage = result['car_info'][0]['mileage'];
        this.addArray.price = result['car_info'][0]['price'];
        this.addArray.cost = result['car_info'][0]['cost'];
        this.addArray.engine = result['car_info'][0]['engine'];
        this.addArray.transmission = result['car_info'][0]['transmission'];
        this.addArray.description = result['car_info'][0]['description'];

      }
    });
  }

  UpdateVehicleInfo()
  {
    
    // const all_notes = Array.from(document.querySelectorAll('.all_notes'));
    // all_notes.forEach((element) => {
    //   console.log(element);
    // });


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

    // else if(!this.imageFileName.length){
    //   let el = document.getElementById('image_content');
    //   el.scrollIntoView({ behavior: 'smooth' });
    //   this.presentToast('upload at least 1 photo !');
    // }

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
    else{

      this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader.present();

      this.authservice.postData(this.addArray, 'UpdateVehicleInfo').then((result)=>{
        if(result['response'] == 1){
          this.loader.dismiss();
          let toast = this.toastCtrl.create({ message: result['msg'], position: 'top', duration: 3000 });
          toast.present();

          let TIME_IN_MS = 4000;
          setTimeout( () => {
            this.modalDismiss();
          }, TIME_IN_MS);
          
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

  RemoveVehicle()
  {
    let method = this.alertCtrl.create({			
			message: 'Are you sure want to remove this vehicle information ?',
			buttons: [
				{
					text: 'NO',
					cssClass: 'method-color',
					handler: () => {
						console.log('Individual clicked');
					}
				},
				{
					text: 'YES',
					cssClass: 'method-color',
					handler: () => {

						this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
            this.loader.present();

            this.authservice.postData({'vehicle_id':this.vehicle_id}, 'RemoveVehicle').then((result)=>{
              if(result['response'] == 1){
                this.loader.dismiss();
                this.modalDismiss();
                // this.navCtrl.setRoot(CarListPage, {}, {animate:true,direction:'back'});
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
			]
		});
		method.present()
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
      var newFileName = this.createFileName(filename,'jpeg');
      
      this.imageFileName.push({ photos : "data:image/jpeg;base64,"+imageData, fname:newFileName, index:this.ArrIndex });

      this.UploadPhotosToServer();

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

      this.UploadPhotosToServer();

    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  RemoveUploadedImg(imgid)
  {
    if(this.car_photos.length > 1){

      this.loader = this.loadingCtrl.create({cssClass: 'loaderCss3'});
      this.loader.present();

      this.authservice.postData({'vehicle_id':this.vehicle_id, 'img_id':imgid}, 'DeletePhoto').then((result)=>{
        if(result['response'] == 1){
          this.loader.dismiss();
          this.GetCarPhotos(this.vehicle_id)
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

    }else{
      this.presentToast('Photo gallery must have at least 1 photo');
    }
    
  }

  public createFileName(filename,fextension) 
  {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + "."+fextension;
    return newFileName;
  }

  UploadPhotosToServer()
  {
    
    this.loader_1 = this.myLoadingControl.create({
      content : "Uploading..."
    });

    this.loader_1.present().then(() => {

      var url = global.apiUserUrl+'UploadPhotos';
      // for (let index = 0; index < this.imageFileName.length; index++) 
      // {
        
        var options: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.imageFileName[0].fname,
          headers: {},
          params : {'file_name': this.imageFileName[0].fname, 'vehicle_id':this.vehicle_id}
        };
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.imageFileName[0].photos, url, options).then((data) => {
            // if(index == this.imageFileName.length-1){
              this.loader_1.dismiss();          
              // this.presentToast('Photo uploaded successfully.');
              this.imageFileName = [];
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
              this.car_photos = [];
              this.GetCarPhotos(this.vehicle_id)
            // }
        }, err => {
          console.log(err);
          this.loader_1.dismiss();          
          this.presentToast('Sorry! unable to upload file!');
        });
        
      // }

    });

  }


  








}
