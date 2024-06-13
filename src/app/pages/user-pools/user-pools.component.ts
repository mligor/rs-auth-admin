import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ListComponent } from '../../rsauth-ui-components/list/list.component';
import { UserPool, UserPoolService } from '../../services/user-pool.service';

@Component({
  selector: 'app-user-pools',
  standalone: true,
  templateUrl: './user-pools.component.html',
  styleUrl: './user-pools.component.scss',
  imports: [ListComponent, JsonPipe],
})
export class UserPoolsComponent implements OnInit {
  private userPoolService = inject(UserPoolService);
  protected userPools: UserPool[] = [];

  loadingUserPools = false;
  selectedPool?: UserPool;

  ngOnInit() {
    this.loadingUserPools = true;

    this.userPoolService.getUserPools().subscribe((pools: UserPool[]) => {
      this.userPools = pools;
      this.loadingUserPools = false;
    });
  }
}
