import { CommonModule } from '@angular/common';
import { Component, Injectable, Input, TemplateRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ZimCoPromptDialog } from './prompt-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ZimCoDialog {
  private modalService = inject(NgbModal);

  show<TData>(content: TemplateRef<unknown>, data?: TData, options?: NgbModalOptions | undefined): Promise<unknown> {
    const modalRef: NgbModalRef = this.modalService.open(ZimCoDialogContent, options);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.content = content;
    return modalRef.result;
  }

  async prompt(title: string, promptText: string, defaultText?: string): Promise<string | null> {
    const modalRef: NgbModalRef = this.modalService.open(ZimCoPromptDialog);
    const data: { text?: string } = { text: defaultText };
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.promptText = promptText;
    try {
      if ('ok' == (await modalRef.result)) {
        return data.text ?? '';
      }
    } catch (error) {
      return null;
    }
    return null;
  }
}

@Component({
  imports: [CommonModule, FormsModule],
  template: '<ng-template *ngTemplateOutlet="content; context: { $implicit: this }"></ng-template>',
  standalone: true,
})
export class ZimCoDialogContent {
  @Input() data: unknown;
  @Input() content!: TemplateRef<unknown>;

  private activeModal = inject(NgbActiveModal);

  close(result?: unknown) {
    this.activeModal.close(result);
  }

  dismiss(reason?: unknown) {
    this.activeModal.dismiss(reason);
  }
}
