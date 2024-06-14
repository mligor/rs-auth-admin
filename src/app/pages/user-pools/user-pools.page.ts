import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserPoolComponent } from '../../components/user-pool/user-pool.component';
import { UserPoolService } from '../../services/user-pool.service';
import { ItemListEditorModule } from '../../zimco-ui-components/item-list-editor/item-list-editor.component';

@Component({
  standalone: true,
  templateUrl: './user-pools.page.html',
  styleUrl: './user-pools.page.scss',
  imports: [JsonPipe, UserPoolComponent, ItemListEditorModule],
})
export class UserPoolsComponent {
  protected service = inject(UserPoolService);
}
