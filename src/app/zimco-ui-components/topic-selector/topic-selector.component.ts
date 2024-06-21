import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ZimCoTopicInfo {
  title?: string;
  description?: string;
  icon?: string;
  route: string;
  color?: string;
}

@Component({
  selector: 'zimco-topic-selector',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.scss',
})
export class ZimCoTopicSelectorComponent {
  topics = input.required<ZimCoTopicInfo[]>();
}
