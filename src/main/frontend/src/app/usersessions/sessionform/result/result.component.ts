import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { UsersessionsService} from "../../usersessions.service";
import {Timestamp} from "rxjs";
import {Userprofile} from "../../../models/userprofile";
import {UserprofileService} from "../../../userprofile/userprofile.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  title = "Review your Submission";
  @Input() formData: FormData;
  isFormValid: boolean = false;
  timeMS: number;
  loggedInUser: Userprofile = new Userprofile();
  profile: any;

  constructor(private formDataService: FormDataService, private userSessionService: UsersessionsService,
  private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
    this.isFormValid = this.formDataService.isFormValid();
    console.log('Result feature loaded!');
  }

  submit() {
    alert('Session Created');
    console.log(this.formData);
    this.formData.sessionCreatorId = JSON.parse(localStorage.getItem("profile"));
    this.timeMS = this.timeToMilliseconds(this.formData.sessionTimes) + this.formData.sessionDate.getTime();
    // var costNoDollar = this.formatCost(this.formData.sessionCost);
    var data = {
      "hostId": parseInt(localStorage.getItem("loggedInUserID")),
      "title":this.formData.title,
      "game":this.formData.game,
      "console":this.formData.console,
      "numSlots":this.formData.numSlots,
      "sessionCost":this.formData.sessionCost,
      "sessionTime":this.timeMS,
      "sessionDuration":'1:00:00'
    };
    this.userSessionService.createUserSession(data);
    window.location.reload();
    this.formData = this.formDataService.resetFormData();
    this.isFormValid = false;
  }

  timeToMilliseconds(time: string) {
    var list = time.split(":");
    var hour = (+list[0]);
    var minute = (+list[1]);
    var seconds = (hour * 60 * 60) + (minute * 60);
    return seconds * 1000;
  }

  // formatCost(cost): string {
  //
  //   if (cost.charAt(0) == "$") {
  //     return cost.substr(1);
  //   }
  //   return cost;
  // }

  clear() {
    this.formData = this.formDataService.resetFormData();
    this.isFormValid = false;
  }
}
