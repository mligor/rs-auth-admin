import { Component, input } from '@angular/core';

@Component({
  selector: 'zimco-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ZimCoButtonComponent {
  icon = input<string>();
  color = input<string>();
  disabled = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });
  small = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });
}
