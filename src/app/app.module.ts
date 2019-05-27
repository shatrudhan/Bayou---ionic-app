
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

// import component
import { HeaderComponent }from '../components/header/header';
import { FooterComponent }from '../components/footer/footer';

// import plugins
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { AuthProviderServiceProvider } from '../providers/auth-provider-service/auth-provider-service';
import { IonicImageViewerModule } from 'ionic-img-viewer';

// import pages
import { LoginPage } from '../pages/login/login';
import { CarListPage } from '../pages/car-list/car-list';
import { CarDetailPage } from '../pages/car-detail/car-detail';
import { AddCarPage } from '../pages/add-car/add-car';
import { SearchCarPage } from '../pages/search-car/search-car';
import { RegistrationPage } from '../pages/registration/registration';
import { EditVehicleInfoPage } from '../pages/edit-vehicle-info/edit-vehicle-info';
import { SearchCarResultPage } from '../pages/search-car-result/search-car-result';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';


@NgModule({
  declarations: [
    MyApp,
    FooterComponent,HeaderComponent,
    LoginPage,CarListPage,CarDetailPage,AddCarPage,SearchCarPage,RegistrationPage,SearchCarResultPage,EditVehicleInfoPage,ForgotPasswordPage,
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,CarListPage,CarDetailPage,AddCarPage,SearchCarPage,RegistrationPage,SearchCarResultPage,EditVehicleInfoPage,ForgotPasswordPage,
  ],
  providers: [
    StatusBar, SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    File,
    Camera,
    AuthProviderServiceProvider,  
  ]
})
export class AppModule {}
