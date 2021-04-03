import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  roomDetails = {
    name: null,
  };

  createForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onCreateRoom() {}
}
