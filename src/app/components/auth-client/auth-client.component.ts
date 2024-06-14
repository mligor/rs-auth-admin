import { Component, model } from '@angular/core';
import { AuthClient } from '../../services/auth-client.service';

@Component({
  selector: 'auth-client',
  standalone: true,
  imports: [],
  templateUrl: './auth-client.component.html',
  styleUrl: './auth-client.component.scss',
})
export class AuthClientComponent {
  authClient = model<AuthClient>();
}
