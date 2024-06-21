import { Component, inject } from '@angular/core';
import { ZimCoButtonComponent } from '../button/button.component';
import { ZimCoDialog } from '../dialog/dialog.service';
import { ItemListEditorModule } from '../item-list-editor/item-list-editor.component';
import { ZimCoListComponent } from '../list/list.component';
import { ZimCoTopicInfo, ZimCoTopicSelectorComponent } from '../topic-selector/topic-selector.component';

@Component({
  selector: 'zimco-test-page',
  standalone: true,
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
  imports: [ItemListEditorModule, ZimCoListComponent, ZimCoButtonComponent, ZimCoTopicSelectorComponent],
})
export class ZimCoTestPageComponent {
  protected selectedItem = -1;
  protected testItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  protected testTopics: ZimCoTopicInfo[] = [
    {
      title: 'Topic 1',
      description: 'This is a description of topic 1',
      icon: 'star',
      route: '.',
      color: 'danger',
    },
    {
      title: 'Topic 2',
      description: 'This is a description of topic 2',
      icon: 'heart',
      route: '.',
    },
    {
      title: 'Topic 3',
      description: 'This is a description of topic 3',
      icon: 'lock',
      route: '.',
    },
  ];

  protected items = ['zimco-button', 'zimco-list', 'zimco-topic-selector', 'zimco-dialog'];

  protected zimcoDialog = inject(ZimCoDialog);
  protected promptDialogResult?: string = undefined;
  protected async openPromptDialog() {
    const res = await this.zimcoDialog.prompt('Name', 'Please enter your name', this.promptDialogResult);
    if (res !== null) {
      this.promptDialogResult = res;
    }
  }
}
