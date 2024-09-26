import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get form() {
    return this.signUpForm.controls;
  }
  onSubmit() {
    if (this.signUpForm.invalid) return;

    if (
      this.signUpForm.value.password !== this.signUpForm.value.repeatPassword
    ) {
      this.signUpForm.controls['repeatPassword'].setErrors({ mismatch: true });
    }

    console.log(this.signUpForm.value);
  }
}
