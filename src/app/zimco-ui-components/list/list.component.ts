import { AfterContentInit, ChangeDetectorRef, Component, effect, inject, input, model } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'zimco-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ZimCoListComponent<T> implements AfterContentInit {
  // Services
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  // Models
  selectedIndex = model<number>(-1);
  selectedItem = model<T>();

  // Inputs
  items = input.required<T[]>();
  title = input<string>();
  trackSelection = input<string>();
  canDeselect = input<boolean>(true);
  loading = input<boolean>(false);

  // Properties
  private lastQueryParamIndex = -1;

  constructor() {
    // Register a new effect.
    effect(() => {
      if (this.loading() == false) {
        const index = this.lastQueryParamIndex;
        if (index >= 0) {
          this.lastQueryParamIndex = -1;
          this.preselectItemFromQueryParams(index);
        }
      }
    });
  }

  ngAfterContentInit() {
    const key = this.trackSelection();
    if (key) {
      this.route.queryParams.subscribe(params => {
        const index = +params[key];
        if (this.loading()) {
          this.lastQueryParamIndex = index;
        } else {
          this.lastQueryParamIndex = -1;
          this.preselectItemFromQueryParams(index);
        }
      });
    }
  }

  private preselectItemFromQueryParams(index: number) {
    if (index >= 0 && index < this.items().length) {
      // Ensure this runs after the content is initialized
      Promise.resolve().then(() => {
        this.selectedIndex.set(index);
        this.selectedItem.set(this.items()[index]);
        this.cdr.detectChanges();
      });
    }
  }

  protected getItemLabel(item: T): string {
    return <string>item;
  }

  selectItem(index: number, item: T) {
    if (this.selectedIndex() === index && this.canDeselect()) {
      this.selectedIndex.set(-1);
      this.selectedItem.set(undefined);
      const key = this.trackSelection();
      if (key) {
        this.router.navigate([], {
          queryParams: { [key]: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    } else {
      this.selectedIndex.set(index);
      this.selectedItem.set(item);
      const key = this.trackSelection();
      if (key) {
        this.router.navigate([], {
          queryParams: { [key]: index },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    }
  }
}
