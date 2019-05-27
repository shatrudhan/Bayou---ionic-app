import { FormGroup } from '@angular/forms';

export var global = {

    
    apiBaseUrl: 'http://pixbrand.in/bayou-api/',
    apiAdminUrl : "http://pixbrand.in/bayou-api/Admin/",
    apiUserUrl : "http://pixbrand.in/bayou-api/User/",
    
    // apiBaseUrl: 'http://192.168.0.134/bayou-api/',
    // apiAdminUrl : "http://192.168.0.134/bayou-api/Admin/",
    // apiUserUrl : "http://192.168.0.134/bayou-api/User/",
    

    makeDisabled: true,
    makeEnabled: false,
    busId : 0,
    isUserLogin: false,

    myfunction : (msg)=> {
        alert(msg);
    },

    otherFunction : (msg)=>{
      alert(msg);
    },

    logOut : ()=>{
        window.localStorage.removeItem('useremail');
        window.localStorage.clear();
        window.localStorage.setItem('useremail', '');
        //this.navCtrl.setRoot(SigninPage);  
    },

    getMIMEtype : (extn)=>{
        let ext=extn.toLowerCase();
        let MIMETypes={
          'txt' : 'text/plain',
          'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'doc' : 'application/msword',
          'pdf' : 'application/pdf',
          'jpg' : 'image/jpeg',
          'bmp' : 'image/bmp',
          'png' : 'image/png',
          'xls' : 'application/vnd.ms-excel',
          'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'rtf' : 'application/rtf',
          'ppt' : 'application/vnd.ms-powerpoint',
          'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        }
        return MIMETypes[ext];
    },

    // FUNCTION FOR MATCHING PASSWORD AND CONFIRM PASSWORD
    matchingPasswords: (passwordKey: any, confirmPasswordKey: any)=>
    {
        return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
            return { mismatchedPasswords: true };
        }
        }
    },

    wordLimiter : (string,limit) => {
        return string.length>limit ? string.substr(0,limit-1)+'...' : string.toString();
    },

    // EMAIL FORMAT VALIDATION
    isValidEmail: (email:any)=> {
        var EMAIL_REGEXP = /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email)
        && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
        if (!EMAIL_REGEXP) {
        return false;
        } else {
        return true;
        }
    },

    // ONLY NUMERIC VALUE ALLOWED
    isValidPhone: (phone_number)=> {
        var PHONE_REGEXP = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone_number);
        if (!PHONE_REGEXP) {
        return false;
        } else {
        return true;
        }
    },

};
