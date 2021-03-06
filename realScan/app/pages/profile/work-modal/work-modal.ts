import { Component, OnInit } from '@angular/core';
import {ViewController, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'build/pages/profile/work-modal/work-modal.html'
})
export class WorkModal implements OnInit {

  account;

  constructor(private vControl: ViewController, private params: NavParams) {
    this.account = this.params.get("profile");
    console.log(this.account);
  }

  ngOnInit() { }

  dismissModal(){
    this.vControl.dismiss();
  }

}
