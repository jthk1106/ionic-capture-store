import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';

/**
 * Generated class for the CapturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any

@IonicPage()
@Component({
  selector: 'page-capture',
  templateUrl: 'capture.html',
})
export class CapturePage {

  lastImage: string = null
  loading: Loading

  pic: any = {
    image: '',
    title: '',
    text: ''
  }
  id: any
  token: any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera,
              private transfer: Transfer, 
              private file: File, 
              private filePath: FilePath, 
              public actionSheetCtrl: ActionSheetController, 
              public toastCtrl: ToastController, 
              public platform: Platform, 
              public loadingCtrl: LoadingController,
              private storage: Storage,
              private transferfile: FileTransfer) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CapturePage');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
      console.error(err.message)
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log(success)
    }, error => {
      this.presentToast('Error while storing file.');
      console.error(error.message)
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = 'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/' + this.id + '/photo?access_token=' + this.token
    //"http://yoururl/upload.php";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: TransferObject = this.transfer.create();
   
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
  

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: 0,
      encodingType: 0,
      //saveToPhotoAlbum: true
    }
    
    console.log('from takePhoto() before getPicture')
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.pic.image = 'data:image/jpeg;base64,' + imageData;
     console.log('this.pic.image:', this.pic.image)
    }, (err) => {
     // Handle error
     console.error('error from takePhoto():', err)
    });
  }

  upPhoto() {
    this.storage.get('id').then((val) => {
      this.id = val
      console.log('Your id is', this.id);
    });
    this.storage.get('token').then((val) => {
      this.token = val
      console.log('Your token is', this.token);
    });


    let loader = this.loadingCtrl.create({
      content: 'Uploading...'
    }) 
    loader.present()

    var random = Math.floor(Math.random() * 100)

    const fileTransfer: FileTransferObject = this.transferfile.create()

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: 'myImage_' + random + '.jpg',
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpeg',
      headers: {}
    }
 
  //http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/5b78ce28c5aec4576c9ee839/photo?access_token=YQyvpGYthmdqFwSnaQC9utkfrMyGHLK0ElGUoYtREMZbtOM7nBhAB1LppfFyvaGf
  //'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/' + id + '/photo?access_token=' + token

   fileTransfer.upload(this.pic, 'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/' + this.id + '/photo?access_token=' + this.token, options)
    .then((data) => {
      // success
      console.log('upload success')
      loader.dismiss()
    }, (err) => {
      // error
      console.error('upload failure:', err.message)
      loader.dismiss()
    })
  }

}
