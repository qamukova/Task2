import { Directive, Input, OnDestroy } from '@angular/core';
import { asapScheduler, combineLatest, race, Subject } from 'rxjs';
import { mapTo, observeOn, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IResolveBundle<
  R extends (...args: any[]) => void = any,
  RS extends (...args: any[]) => void = any,
  RF extends (...args: any[]) => void = any,
  RC extends (...args: any[]) => void = any
  > {
  dispatchRequest: R;
  dispatchRequestCancel: RC;
  requestSuccess$: Observable<RS>;
  requestFailure$: Observable<RF>;
  dependencies?: Observable<any>[];
}

@Directive({
  selector: '[appResolve]',
  exportAs: 'appResolve'
})
export class ResolveDirective implements OnDestroy {

  private destroySubscriptions = new Subject();
  private isResolvingByIndex: { [key: number]: boolean } = {};
  private dispatchCancelList = [] as (() => void)[];
  private errors = [] as boolean[];

  get hasError(): boolean {
    return this.errors.includes(true);
  }

  get isResolving(): boolean {
    return Object.values(this.isResolvingByIndex).includes(true);
  }

  @Input() skipResolve = false;

  @Input() set dbSharedResolve(bundles: IResolveBundle[]) {
    this.errors = bundles.map(() => false);
    this.dispatchCancelList = [];
    this.destroySubscriptions.next();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < bundles.length; i++) {
      const bundle = bundles[i];
      this.errors[i] = false;
      this.dispatchCancelList.push(bundle.dispatchRequestCancel);

      this.isResolvingByIndex[i] = false;
      if (bundle.dependencies) {
        combineLatest(bundle.dependencies).pipe(
          observeOn(asapScheduler),
          takeUntil(this.destroySubscriptions)
        ).subscribe(deps => {
          if (this.skipResolve) { return; }
          this.isResolvingByIndex[i] = true;
          bundle.dispatchRequest(deps);
        });
      } else {
        asapScheduler.schedule(() => {
          if (this.skipResolve) { return; }
          this.isResolvingByIndex[i] = true;
          bundle.dispatchRequest();
        });
      }

      race(
        bundle.requestSuccess$.pipe(mapTo(true)),
        bundle.requestFailure$.pipe(mapTo(false))
      ).pipe(takeUntil(this.destroySubscriptions)).subscribe(result => {
        this.errors[i] = !result;
        this.isResolvingByIndex[i] = false;
      });

    }

  }

  ngOnDestroy(): void {
    this.destroySubscriptions.next();
    this.destroySubscriptions.complete();
    let index = 0;
    for (const dispatchCancel of this.dispatchCancelList) {
      if (!this.isResolvingByIndex[index]) { continue; }
      dispatchCancel();
      index++;
    }
  }
}
