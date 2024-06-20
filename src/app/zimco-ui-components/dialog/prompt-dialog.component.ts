import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZimCoButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  templateUrl: './prompt-dialog.component.html',
  styleUrl: './prompt-dialog.component.scss',
  imports: [ZimCoButtonComponent, CommonModule, FormsModule],
})
export class ZimCoPromptDialog {
  @Input() data!: { text?: string };
  promptText?: string;
  title?: string;

  protected activeModal = inject(NgbActiveModal);
}
