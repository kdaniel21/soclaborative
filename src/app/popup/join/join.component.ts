import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChromeStorageService } from '../storage/chrome-storage.service';

type Step = { name: string; formControlName: string };

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  activeStepIndex = 0;
  steps: Step[] = [
    { name: 'Enter room code', formControlName: 'roomCode' },
    { name: 'Enter your name', formControlName: 'name' },
  ];

  joinForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chromeStorageService: ChromeStorageService
  ) {
    this.joinForm = formBuilder.group({
      roomCode: [null, Validators.required],
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  get isLastStep(): boolean {
    return this.activeStepIndex === 1;
  }

  get currentStep(): Step {
    return this.steps[this.activeStepIndex];
  }

  async ngOnInit() {
    const { roomCode } = this.route.snapshot.params;
    let { name } = this.route.snapshot.params;

    if (!name) {
      name = await this.chromeStorageService.get('name');
    }

    this.joinForm.patchValue({ roomCode, name });
  }

  async onJoin() {
    const { roomCode, name } = this.joinForm.value;

    await this.chromeStorageService.set({ name });
  }

  onNext() {
    this.activeStepIndex++;
  }

  getStepState(step: Step, stepNumber: number) {
    const hasReachedStep = this.activeStepIndex > stepNumber;
    if (!hasReachedStep) {
      return 'normal';
    }

    const isFormControlValid = this.joinForm.controls[step.formControlName].valid;
    return isFormControlValid ? 'pass' : 'error';
  }
}
