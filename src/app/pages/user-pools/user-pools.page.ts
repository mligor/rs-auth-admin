import { JsonPipe } from '@angular/common';
import { Component, TemplateRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { UserPoolComponent } from '../../components/user-pool/user-pool.component';
import { UserPool, UserPoolService } from '../../services/user-pool.service';
import { ZimCoButtonComponent } from '../../zimco-ui-components/button/button.component';
import { ZimCoDialog } from '../../zimco-ui-components/dialog/dialog.service';
import { ItemListEditorModule } from '../../zimco-ui-components/item-list-editor/item-list-editor.component';

@Component({
  standalone: true,
  templateUrl: './user-pools.page.html',
  styleUrl: './user-pools.page.scss',
  imports: [JsonPipe, UserPoolComponent, ItemListEditorModule, ZimCoButtonComponent, FormsModule],
})
export class UserPoolsComponent {
  protected service = inject(UserPoolService);
  private dialog = inject(ZimCoDialog);

  createPoolDlg = viewChild.required<TemplateRef<any>>('createPoolDlg');

  async createUserPool2(): Promise<UserPool | null> {
    try {
      const data: { name: string } = { name: '' };
      const res = await this.dialog.show(this.createPoolDlg(), data, { backdrop: 'static' });
      if (!res) return null;
      return { id: uuidv4(), name: data.name };
    } catch (error) {
      return null; // Cancel
    }
  }

  async createUserPool(): Promise<UserPool | null> {
    try {
      const res = await this.dialog.prompt('Create new User Pool', 'User Pool Name:', 'my-pool');
      if (!res) return null;
      return { id: uuidv4(), name: res };
    } catch (error) {
      return null; // Cancel
    }
  }

  showText(text: string) {
    console.log('btn-action:', text);
  }
}
