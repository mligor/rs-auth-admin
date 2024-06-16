import { AfterViewInit, Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'zimco-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ZimCoButtonComponent implements AfterViewInit {
  icon = input<string>();
  color = input<string>();
  private elRef = inject(ElementRef);
  protected hostClasses: string = '';

  disabled = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });
  size = input<'sm' | 'normal' | 'lg'>('normal');

  ngAfterViewInit() {
    setTimeout(() => {
      this.hostClasses = this.elRef.nativeElement.className;
    });
  }
}
