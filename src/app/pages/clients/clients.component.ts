import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthClientComponent } from '../../components/auth-client/auth-client.component';
import { AuthClientService } from '../../services/auth-client.service';
import { ItemListEditorModule } from '../../zimco-ui-components/item-list-editor/item-list-editor.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  imports: [JsonPipe, AuthClientComponent, ItemListEditorModule],
})
export class ClientsComponent {
  protected service = inject(AuthClientService);
}
