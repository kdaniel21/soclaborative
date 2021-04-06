import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from '../authorization/authorization.service';
import { StorageService } from '../storage.service';

type Step = { name: string; formControlName: string };

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    public storageService: StorageService,
    private authorizationService: AuthorizationService,
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

  ngOnInit() {
    const storedName$ = this.storageService.get('name');
    const routeQueryParams$ = this.route.queryParams;

    combineLatest([storedName$, routeQueryParams$])
      .pipe(map(([storedName, { name, code }]) => ({ roomCode: code, name: name || storedName })))
      .subscribe({
        next: ({ name, roomCode }) => {
          this.joinForm.patchValue({ name, roomCode });
        },
      });
  }

  onJoin() {
    const { name, roomCode } = this.joinForm.value;

    this.authorizationService.joinRoom(roomCode, name).subscribe();
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
