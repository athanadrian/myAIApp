import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text: string = "";
  messages: any[] = [];

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone) {
    this.messages.push(
      {
        text: "Hi there..!",
        sender: "api"
      });
    this.messages.push(
      {
        text: "Hello there...",
        sender: "me"
      });
  }

  sendText() {

    let message = this.text;

    this.messages.push({
      text: message,
      sender: "me"
    })

    this.text = "";

    window["ApiAIPlugin"].requestText({
      "query": message
    }, (response) => {
      this.ngZone.run(() => {
        this.messages.push({
          text: response.result.fulfillment.speech,
          sender: "api"
        })
      })
    }, (error) => {
      alert(JSON.stringify(error));
    })
  }

  sendVoice(){
    window["ApiAIPlugin"].requestText({},
      (response)=>{
        alert(response.result.fulfillment.speech);
      })
    }
}
