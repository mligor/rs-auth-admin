import { Component, model } from '@angular/core';
import { UserPool } from '../../services/user-pool.service';

@Component({
  selector: 'user-pool',
  standalone: true,
  imports: [],
  templateUrl: './user-pool.component.html',
  styleUrl: './user-pool.component.scss',
})
export class UserPoolComponent {
  userPool = model<UserPool>();
}
