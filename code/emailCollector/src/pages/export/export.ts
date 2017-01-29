import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import { File } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var cordova: any; 

@Component({
  selector: 'page-export',
  templateUrl: 'export.html'
})
export class ExportPage {

  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public platform: Platform) {
  }

  clear() {
    let confirm = this.alertCtrl.create({
        title: 'Clear emails',
        subTitle: 'Are you sure you want to clear the email list? This cannot be undone.',
        buttons: [
        {
          text: 'No',
          handler: () => {
            // Do nothing
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.set('email-list', JSON.stringify([]));
            this.showAlert('Emails cleared', 'The email address list has been cleared');
          }
        }
      ]
      });
      confirm.present();
  }

  download() {
    this.storage.get('email-list').then((val) => {
      if (val == null) {
        val = [];
      } else {
        val = JSON.parse(val);
      }

      var csv = this.createCsv(val);
      
      SocialSharing.canShareViaEmail().then(() => {
        SocialSharing.shareViaEmail(csv, 'Email Collector export', null, null, null, null).then(() => {
          // Email has been sent
        }).catch(() => {
          this.showAlert('Error sending email', 'There was an error opening your email client. Please check your device settings.');
        });
      }).catch(() => {
          this.showAlert('Email not supported', 'Email has not been configured on this device. Please check your device settings.');
        });
      });
  }

  createCsv(list) {
    var str = '';

    for (var i = 0; i < list.length; i++) {
      var line = '';
      line += list[i]['name'] + ',';
      line += list[i]['email'] + ',';
      line += list[i]['allowText'] + ',';
      line += list[i]['timeStamp'];
      str += line + '\r\n';
    }

    return str;
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
    alert.present();
  }
}
