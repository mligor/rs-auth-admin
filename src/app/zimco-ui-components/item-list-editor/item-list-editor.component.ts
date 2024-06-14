import { NgTemplateOutlet } from '@angular/common';
import { Component, Directive, NgModule, OnInit, TemplateRef, input } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HasName, ZimCoListComponent } from '../list/list.component';

export interface ItemLoader<TInfo, T> {
  get items$(): Observable<TInfo[]>;
  item$(id: string): Observable<T | null>;
}

@Directive({ selector: '[rsauthItem]', standalone: false })
export class ZimCoItemEditorDirective<TInfo extends HasName, T> {
  constructor(itemListEditorComponent: ZimCoItemListEditorComponent<TInfo, T>, template: TemplateRef<any>) {
    itemListEditorComponent.template = template;
  }
}

@Component({
  selector: 'zimco-item-list-editor',
  standalone: false,
  templateUrl: './item-list-editor.component.html',
  styleUrl: './item-list-editor.component.scss',
})
export class ZimCoItemListEditorComponent<TInfo extends HasName, T> implements OnInit {
  queryParamKey = input<string>();
  title = input<string>();
  loader = input<ItemLoader<TInfo, T>>();

  template: TemplateRef<any> | null = null;

  protected items: TInfo[] = [];
  protected loading = false;
  protected selectedItem?: T;

  async ngOnInit() {
    const loader = this.loader();
    if (loader) {
      this.loading = true;
      const items = await firstValueFrom(loader.items$);
      this.items = items;
      this.loading = false;
    }
  }

  selectItem(itemInfo: TInfo) {
    this.selectedItem = <T>(<any>itemInfo);
  }
}

@NgModule({
  declarations: [ZimCoItemListEditorComponent, ZimCoItemEditorDirective],
  imports: [ZimCoListComponent, NgTemplateOutlet],
  exports: [ZimCoItemListEditorComponent, ZimCoItemEditorDirective],
})
export class ItemListEditorModule {}
