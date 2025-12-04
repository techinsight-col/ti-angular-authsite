import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isRegisterMode = false;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.loginForm.controls; }

    toggleMode() {
        this.isRegisterMode = !this.isRegisterMode;
        this.loginForm.reset();
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.isLoading = true;
        const { email, password } = this.loginForm.value;

        const authObs = this.isRegisterMode
            ? this.authService.register(email, password)
            : this.authService.login(email, password);

        authObs.subscribe({
            next: (user) => {
                console.log('Auth successful', user);
                this.isLoading = false;
                // Navigate to dashboard or home
                // this.router.navigate(['/']); 
                alert(`Successfully ${this.isRegisterMode ? 'registered' : 'logged in'} as ${user.email}`);
            },
            error: (err) => {
                console.error('Auth failed', err);
                this.isLoading = false;
                alert('Authentication failed. Please try again.');
            }
        });
    }

    loginWithGoogle() {
        this.isLoading = true;
        this.authService.loginWithGoogle().subscribe({
            next: (user) => {
                console.log('Google Auth successful', user);
                this.isLoading = false;
                alert(`Successfully logged in with Google as ${user.email}`);
            },
            error: (err) => {
                console.error('Google Auth failed', err);
                this.isLoading = false;
            }
        });
    }
}
