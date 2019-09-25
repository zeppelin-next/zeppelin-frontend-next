import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebookComponent } from './notebook.component';
import { NotebookRoutingModule } from './notebook-routing.module';
import { NotebookActionBarComponent } from './action-bar/action-bar.component';
import { ShareModule } from 'zeppelin-share/share.module';
import { NotebookShareModule } from './share/share.module';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzNoAnimationModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzProgressModule,
  NzRadioModule,
  NzSelectModule,
  NzSwitchModule,
  NzToolTipModule
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotebookInterpreterBindingComponent } from './interpreter-binding/interpreter-binding.component';
import { NotebookPermissionsComponent } from './permissions/permissions.component';
import { NotebookRevisionsComparatorComponent } from './revisions-comparator/revisions-comparator.component';
import { NotebookParagraphComponent } from './paragraph/paragraph.component';
import { NotebookAddParagraphComponent } from './add-paragraph/add-paragraph.component';
import { NzMonacoEditorModule } from '@ng-zorro/ng-plus/editor';
import { NotebookParagraphCodeEditorComponent } from './paragraph/code-editor/code-editor.component';
import { NotebookParagraphResultComponent } from './paragraph/result/result.component';
import { PortalModule } from '@angular/cdk/portal';
import { VisualizationModule } from 'src/app/visualization/visualization.module';
import { NotebookParagraphProgressComponent } from './paragraph/progress/progress.component';
import { NotebookParagraphFooterComponent } from './paragraph/footer/footer.component';
import { NotebookParagraphControlComponent } from './paragraph/control/control.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NotebookParagraphDynamicFormsComponent } from './paragraph/dynamic-forms/dynamic-forms.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@NgModule({
  declarations: [
    NotebookComponent,
    NotebookActionBarComponent,
    NotebookInterpreterBindingComponent,
    NotebookPermissionsComponent,
    NotebookRevisionsComparatorComponent,
    NotebookParagraphComponent,
    NotebookAddParagraphComponent,
    NotebookParagraphCodeEditorComponent,
    NotebookParagraphResultComponent,
    NotebookParagraphProgressComponent,
    NotebookParagraphFooterComponent,
    NotebookParagraphControlComponent,
    NotebookParagraphDynamicFormsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    NotebookRoutingModule,
    ShareModule,
    VisualizationModule,
    NotebookShareModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzNoAnimationModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzFormModule,
    NzPopoverModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzCheckboxModule,
    NzMonacoEditorModule,
    NzProgressModule,
    NzSwitchModule,
    NzSelectModule,
    NzGridModule,
    NzRadioModule,
    DragDropModule,
    NzResizableModule,
    NzCodeEditorModule
  ]
})
export class NotebookModule {}
