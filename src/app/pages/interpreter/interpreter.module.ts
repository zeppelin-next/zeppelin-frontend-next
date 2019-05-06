import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterpreterComponent } from './interpreter.component';
import { InterpreterRoutingModule } from './interpreter-routing.module';

@NgModule({
  declarations: [InterpreterComponent],
  imports: [CommonModule, InterpreterRoutingModule]
})
export class InterpreterModule {}
