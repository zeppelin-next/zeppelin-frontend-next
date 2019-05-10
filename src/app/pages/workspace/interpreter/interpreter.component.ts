import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { collapseMotion, NzModalService } from 'ng-zorro-antd';
import { Interpreter, InterpreterMap, InterpreterPropertyTypes, InterpreterRepository } from 'zeppelin-interfaces';
import { InterpreterService } from 'zeppelin-services';
import { InterpreterCreateRepositoryModalComponent } from './create-repository-modal/create-repository-modal.component';

@Component({
  selector: 'zeppelin-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.less'],
  animations: [collapseMotion],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterComponent implements OnInit {
  showRepository = false;
  showCreateSetting = false;
  propertyTypes: InterpreterPropertyTypes[] = [];
  interpreterSettings: Interpreter[] = [];
  repositories: InterpreterRepository[] = [];
  availableInterpreters: Interpreter[] = [];

  triggerRepository(): void {
    this.showRepository = !this.showRepository;
    this.cdr.markForCheck();
  }

  removeRepository(repo: InterpreterRepository): void {
    this.nzModalService.confirm({
      nzTitle: repo.id,
      nzContent: 'Do you want to delete this repository?',
      nzOnOk: () => {
        this.interpreterService.removeRepository(repo.id).subscribe(() => {
          this.repositories = this.repositories.filter(e => e.id !== repo.id);
          this.cdr.markForCheck();
        });
      }
    });
  }

  createRepository(): void {
    const modalRef = this.nzModalService.create({
      nzTitle: 'Add New Repository',
      nzContent: InterpreterCreateRepositoryModalComponent,
      nzFooter: null,
      nzWidth: '600px'
    });
    modalRef.afterClose.subscribe(data => {
      if (data === 'Done') {
        this.getRepositories();
      }
    });
  }

  getPropertyTypes(): void {
    this.interpreterService.getAvailableInterpreterPropertyTypes().subscribe(data => {
      this.propertyTypes = data;
      this.cdr.markForCheck();
    });
  }

  getInterpreterSettings(): void {
    this.interpreterService.getInterpretersSetting().subscribe(data => {
      this.interpreterSettings = data;
      this.cdr.markForCheck();
    });
  }

  getAvailableInterpreters(): void {
    this.interpreterService.getAvailableInterpreters().subscribe(data => {
      this.availableInterpreters = Object.keys(data)
        .sort()
        .map(key => data[key]);
      this.cdr.markForCheck();
    });
  }

  getRepositories(): void {
    this.interpreterService.getRepositories().subscribe(data => {
      this.repositories = data;
      this.cdr.markForCheck();
    });
  }

  constructor(
    private interpreterService: InterpreterService,
    private cdr: ChangeDetectorRef,
    private nzModalService: NzModalService
  ) {}

  ngOnInit() {
    this.getPropertyTypes();
    this.getInterpreterSettings();
    this.getAvailableInterpreters();
    this.getRepositories();
  }
}
