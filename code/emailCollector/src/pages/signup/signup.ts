import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public name = '';
  public email = '';
  public allowText = false;

  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {
  }

  saveInput() {
    // Fetch the list object from storage provider
    this.storage.get('email-list').then((val) => {
      if (val == null) {
        val = [];
      } else {
        val = JSON.parse(val);
      }

      // Create a new object from the submitted values
      var entry = { 
        name: this.name, 
        email: this.email, 
        allowText: this.allowText, 
        timeStamp: new Date().toString()};

      // Save to storage provider, show confirmation, and reset form values
      val.push(entry);
      this.storage.set('email-list', JSON.stringify(val));

      let alert = this.alertCtrl.create({
        title: 'Email saved',
        subTitle: this.email + ' has been saved',
        buttons: ['OK']
      });
      alert.present();

      this.name = '';
      this.email = ''
      this.allowText = false;
    });
  }

}