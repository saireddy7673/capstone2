import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  currentUserId;
  country = [];

  constructor(
    private formBuilder: FormBuilder,
    private routes: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      coupan: [''],
    });

    this.checkEditMode();
  }

  private checkEditMode() {
    this.routes.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.userService.getUser(params['id']).subscribe((user) => {
          this.form.controls['name'].setValue(user.name);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['phone'].setValue(user.phone);
          this.form.controls['isAdmin'].setValue(user.isAdmin);
          this.form.controls['password'].setValidators([]);
          this.form.controls['password'].updateValueAndValidity();
        });
      }
    });
  }

  private addUser(user: User) {
    this.userService.addUser(user).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/users']);
        });
    });
  }

  private updateUser(user: User) {
    this.userService.updateUser(user).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/users']);
        });
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      id: this.currentUserId,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      password: this.form.controls['password'].value,
    };

    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
