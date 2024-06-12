import { Component } from '@angular/core';
import {
  RSAuthTopic,
  TopicSelectorComponent,
} from '../../rsauth-ui-components/topic-selector/topic-selector.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [TopicSelectorComponent],
})
export class DashboardComponent {
  topics: RSAuthTopic[] = [
    {
      title: 'Clients / Applications',
      description: 'View and manage all registered clients and applications authorized to access the OAuth2 server.',
      route: '/clients',
      icon: 'window-fullscreen',
    },
    {
      title: 'User Pools',
      description:
        'View and manage all user pools, including user accounts, authentication settings, and security configurations.',
      route: '/user-pools',
      icon: 'people',
    },
  ];
}
