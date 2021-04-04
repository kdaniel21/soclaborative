import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CreateRoomGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  createForm: FormGroup;

  isLoading = false;

  constructor(formBuilder: FormBuilder, private createRoomGQL: CreateRoomGQL, private router: Router) {
    this.createForm = formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onCreateRoom() {
    this.isLoading = true;

    const { name } = this.createForm.value;
    this.createRoomGQL
      .mutate({ name })
      .pipe(map((res) => res.data.createRoom.code))
      .subscribe({
        next: (code) => {
          this.isLoading = false;

          this.router.navigate(['join'], { queryParams: { code } });
        },
      });
  }
}
