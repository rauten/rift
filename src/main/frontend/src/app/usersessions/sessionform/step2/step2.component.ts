import { Component, OnInit } from '@angular/core';
import {Step2} from "../data/formData.model";
import {FormDataService} from "../data/formData.service";

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  title = 'Step 2';
  step2 = Step2;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.step2 = this.formDataService.getStep2Info();
    console.log("Step 2 information loaded");
  }

  save(form: any) {
    if (!form.valid) {
      return;
    }
    this.formDataService.setStep2Info(this.step2);
  }

}
