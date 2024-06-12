import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface RSAuthTopic {
  title?: string;
  description?: string;
  icon?: string;
  route: string;
}

@Component({
  selector: 'rsauth-topic-selector',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.scss',
})
export class TopicSelectorComponent {
  topics = input.required<RSAuthTopic[]>();
}
