import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';

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

  constructor(formBuilder: FormBuilder, private route: ActivatedRoute, public storageService: StorageService) {
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

  ngOnInit() {
    const storedName$ = this.storageService.get('name');
    const routeParams$ = this.route.params;

    combineLatest([storedName$, routeParams$])
      .pipe(map(([storedName, { name, roomCode }]) => ({ name: name || storedName, roomCode })))
      .subscribe({
        next: ({ name, roomCode }) => {
          this.joinForm.patchValue({ name, roomCode });
        },
      });
  }

  onJoin() {
    const { name } = this.joinForm.value;

    this.storageService.set({ name }).subscribe();
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
