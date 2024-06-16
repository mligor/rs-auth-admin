import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { UserPoolComponent } from '../../components/user-pool/user-pool.component';
import { UserPool, UserPoolService } from '../../services/user-pool.service';
import { ZimCoButtonComponent } from '../../zimco-ui-components/button/button.component';
import { ItemListEditorModule } from '../../zimco-ui-components/item-list-editor/item-list-editor.component';

@Component({
  standalone: true,
  templateUrl: './user-pools.page.html',
  styleUrl: './user-pools.page.scss',
  imports: [JsonPipe, UserPoolComponent, ItemListEditorModule, ZimCoButtonComponent],
})
export class UserPoolsComponent {
  protected service = inject(UserPoolService);

  async createUserPool(): Promise<UserPool> {
    console.log('cup', this);
    return { id: uuidv4(), name: 'new-pool' };
  }
}
