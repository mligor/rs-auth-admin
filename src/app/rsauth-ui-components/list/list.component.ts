import { AfterContentInit, ChangeDetectorRef, Component, effect, inject, input, model } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface HasName {
  name: string;
}

@Component({
  selector: 'rsauth-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent<T extends HasName> implements AfterContentInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  items = input.required<T[]>();
  title = input<string>();
  selectedIndex = model<number>(-1);
  selectedItem = model<T>();
  queryParamKey = input<string>();
  canDeselect = input<boolean>(true);
  loading = input<boolean>(false);
  lastQueryParamIndex = -1;

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
    const key = this.queryParamKey();
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

  selectItem(index: number, item: T) {
    if (this.selectedIndex() === index && this.canDeselect()) {
      this.selectedIndex.set(-1);
      this.selectedItem.set(undefined);
      const key = this.queryParamKey();
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
      const key = this.queryParamKey();
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
