import { NgModule } from '@angular/core';
import { NumbersOnlyDirective } from '../Directives/numbers-only.directive';

@NgModule({
  declarations: [NumbersOnlyDirective],
  exports: [NumbersOnlyDirective]
})

export class NumbersOnlyModule { }
