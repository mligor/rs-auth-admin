import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, Directive, NgModule, OnInit, TemplateRef, input, viewChild } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ZimCoButtonComponent } from '../button/button.component';
import { ZimCoListComponent, ZimCoListGetLabelFn } from '../list/list.component';

export interface ItemLoader<TInfo, T> {
  get items$(): Observable<TInfo[]>;
  item$(id: string): Observable<T | null>;
  add(item: T): Observable<void>;
  save(item: T): Observable<void>;
  delete(id: string): Observable<void>;
}

export type ZimCoListCreateItemFn<T> = () => Promise<T>;

@Directive({ selector: '[zimcoListItem]', standalone: false })
export class ZimCoItemEditorDirective<TInfo, T> {
  constructor(itemListEditorComponent: ZimCoItemListEditorComponent<TInfo, T>, template: TemplateRef<any>) {
    itemListEditorComponent.template = template;
  }
}

@Directive({ selector: '[zimcoListNoItems]', standalone: false })
export class ZimCoNoItemsEditorDirective<TInfo, T> {
  constructor(itemListEditorComponent: ZimCoItemListEditorComponent<TInfo, T>, template: TemplateRef<any>) {
    itemListEditorComponent.noItemsTemplate = template;
  }
}

@Component({
  selector: 'zimco-item-list-editor',
  standalone: false,
  templateUrl: './item-list-editor.component.html',
  styleUrl: './item-list-editor.component.scss',
})
export class ZimCoItemListEditorComponent<TInfo, T> implements OnInit, AfterContentInit {
  trackSelection = input<string>();
  title = input<string>();
  loader = input<ItemLoader<TInfo, T>>();
  createItemFn = input<ZimCoListCreateItemFn<T | null>>();
  getLabelFn = input<ZimCoListGetLabelFn<TInfo>>();

  template: TemplateRef<any> | null = null;
  noItemsTemplate: TemplateRef<any> | null = null;
  listComponent = viewChild.required<ZimCoListComponent<TInfo>>('listComponent');

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

  ngAfterContentInit() {}

  onSelectionChange(itemInfo: TInfo | undefined) {
    this.selectedItem = <T>(<any>itemInfo);
  }
  async createItem() {
    const f = this.createItemFn();
    if (f) {
      const newItem = await f();
      if (newItem === null) return;

      const loader = this.loader();
      if (loader) {
        await firstValueFrom(loader.add(newItem));
        const infoItem = <TInfo>(<any>newItem);
        this.items.push(infoItem);
        this.listComponent().selectItem(this.items.length - 1, infoItem);
      }
    }
  }
}

@NgModule({
  declarations: [ZimCoItemListEditorComponent, ZimCoItemEditorDirective, ZimCoNoItemsEditorDirective],
  exports: [ZimCoItemListEditorComponent, ZimCoItemEditorDirective, ZimCoNoItemsEditorDirective],
  imports: [ZimCoListComponent, NgTemplateOutlet, ZimCoButtonComponent],
})
export class ItemListEditorModule {}
