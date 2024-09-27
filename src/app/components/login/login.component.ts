import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // this.route.queryParams.subscribe((params) => {
    //   if (params['register'] === 'true') {
    //     this.successMessage = 'Registration successful! Please log in.';
    //   } else {
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    const formData = {
      email: email,
      password: password,
    };

    this.authService.login(formData).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );

    console.log(this.loginForm.value);
  }
}
