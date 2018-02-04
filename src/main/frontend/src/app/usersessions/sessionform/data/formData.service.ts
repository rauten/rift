import { Injectable } from '@angular/core';

import {FormData, Step1, Step2, Step3} from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

  private formData: FormData = new FormData();
  private isStep1Valid: boolean = false;
  private isStep2Valid: boolean = false;
  private isStep3Valid: boolean = false;

  constructor(private workflowService: WorkflowService) {
  }

  getStep1Info(): Step1 {
    var step1: Step1 = {
      sessionTitle: this.formData.sessionTitle,
      sessionGame: this.formData.sessionGame,
      sessionPlatform: this.formData.sessionPlatform
    };
    return step1;
  }

  setStep1Info(data: Step1) {
    this.isStep1Valid = true;
    this.formData.sessionTitle = data.sessionTitle;
    this.formData.sessionGame = data.sessionGame;
    this.formData.sessionPlatform = data.sessionPlatform;
    this.workflowService.validateStep(STEPS.step1);
  }

  getStep2Info(): Step2 {
    var step2: Step2 = {
      sessionSlots: this.formData.sessionSlots,
      sessionCostPerSlot: this.formData.sessionCostPerSlot
    };
    return step2;
  }

  setStep2Info(data: Step2) {
    // Update the work type only when the Work Form had been validated successfully
    this.isStep2Valid = true;
    this.formData.sessionSlots = data.sessionSlots;
    this.formData.sessionCostPerSlot = data.sessionCostPerSlot;
    this.workflowService.validateStep(STEPS.step2);
  }

  getStep3Info() : Step3{
    var step3: Step3 = {
      sessionDate: this.formData.sessionDate,
      sessionTimes: this.formData.sessionTimes
    };
    return step3;
  }

  setStep3Info(data: Step3) {
    this.isStep3Valid = true;
    this.formData.sessionDate = data.sessionDate;
    this.formData.sessionTimes = data.sessionTimes;
    this.workflowService.validateStep(STEPS.step3);
  }

  getFormData(): FormData {
    // Return the entire Form Data
    return this.formData;
  }

  resetFormData(): FormData {
    // Reset the workflow
    this.workflowService.resetSteps();
    // Return the form data after all this.* members had been reset
    this.formData.clear();
    this.isStep1Valid = this.isStep2Valid = this.isStep3Valid = false;
    return this.formData;
  }

  isFormValid() {
    // Return true if all forms had been validated successfully; otherwise, return false
    return this.isStep1Valid &&
      this.isStep2Valid &&
      this.isStep3Valid;
  }
}
