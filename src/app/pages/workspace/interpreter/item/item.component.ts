import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DestroyHookComponent } from 'zeppelin-core';
import { Interpreter } from 'zeppelin-interfaces';
import { SecurityService, TicketService } from 'zeppelin-services';
import { InterpreterComponent } from '../interpreter.component';

@Component({
  selector: 'zeppelin-interpreter-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterItemComponent extends DestroyHookComponent implements OnInit, OnDestroy {
  @Input() mode: 'create' | 'view' | 'edit' = 'view';

  formGroup: FormGroup;
  optionFormGroup: FormGroup;
  editingPropertiesFormGroup: FormGroup;
  propertiesFormArray: FormArray;
  dependenciesFormArray: FormArray;
  userList$: Observable<string[]>;
  userSearchChange$ = new BehaviorSubject('');
  runningOptionMap = {
    sharedModeName: 'shared',
    globallyModeName: 'Globally',
    perNoteModeName: 'Per Note',
    perUserModeName: 'Per User'
  };

  sessionOptionMap = {
    isolated: 'isolated',
    scoped: 'scoped',
    shared: 'shared'
  };

  interpreterRunningOption = 'Globally';

  interpretersTrackFn(_: number, item: Interpreter) {
    return item.name;
  }

  onUserSearch(value: string): void {
    this.userSearchChange$.next(value);
  }

  removeProperties(index: number): void {
    this.propertiesFormArray.removeAt(index);
    this.cdr.markForCheck();
  }

  addProperties(): void {}

  setInterpreterRunningOption(perNote: string, perUser: string) {
    const { sharedModeName, globallyModeName, perNoteModeName, perUserModeName } = this.runningOptionMap;

    this.optionFormGroup.get('perNote').setValue(perNote);
    this.optionFormGroup.get('perUser').setValue(perUser);

    // Globally == shared_perNote + shared_perUser
    if (perNote === sharedModeName && perUser === sharedModeName) {
      this.interpreterRunningOption = globallyModeName;
      return;
    }

    const ticket = this.ticketService.originTicket;

    if (ticket.ticket === 'anonymous' && ticket.roles === '[]') {
      if (perNote !== undefined && typeof perNote === 'string' && perNote !== '') {
        this.interpreterRunningOption = perNoteModeName;
        return;
      }
    } else if (ticket.ticket !== 'anonymous') {
      if (perNote !== undefined && typeof perNote === 'string' && perNote !== '') {
        if (perUser !== undefined && typeof perUser === 'string' && perUser !== '') {
          this.interpreterRunningOption = perUserModeName;
          return;
        }
        this.interpreterRunningOption = perNoteModeName;
        return;
      }
    }

    this.optionFormGroup.get('perNote').setValue(sharedModeName);
    this.optionFormGroup.get('perUser').setValue(sharedModeName);
    this.interpreterRunningOption = globallyModeName;
  }

  setPerNoteOrUserOption(type: 'perNote' | 'perUser', value: string) {
    this.optionFormGroup.get(type).setValue(value);
    switch (value) {
      case this.sessionOptionMap.isolated:
        this.optionFormGroup.get('session').setValue(false);
        this.optionFormGroup.get('process').setValue(true);
        break;
      case this.sessionOptionMap.scoped:
        this.optionFormGroup.get('session').setValue(true);
        this.optionFormGroup.get('process').setValue(false);
        break;
      case this.sessionOptionMap.shared:
        this.optionFormGroup.get('session').setValue(false);
        this.optionFormGroup.get('process').setValue(false);
        break;
    }
  }

  buildForm(): void {
    this.optionFormGroup = this.formBuilder.group({
      isExistingProcess: false,
      isUserImpersonate: false,
      owners: [[]],
      perNote: '',
      perUser: '',
      port: [
        null,
        [Validators.pattern('^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$')]
      ],
      host: '',
      remote: true,
      setPermission: false,
      session: false,
      process: false
    });

    this.propertiesFormArray = this.formBuilder.array([]);
    this.dependenciesFormArray = this.formBuilder.array([]);

    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      group: ['', [Validators.required]],
      option: this.optionFormGroup,
      properties: this.propertiesFormArray,
      dependencies: this.dependenciesFormArray
    });
  }

  constructor(
    public parent: InterpreterComponent,
    private ticketService: TicketService,
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm();
    const option = this.optionFormGroup.getRawValue();
    this.setInterpreterRunningOption(option.perNote, option.perUser);

    if (this.mode !== 'view') {
      this.userList$ = this.userSearchChange$.pipe(
        debounceTime(500),
        filter(value => !!value),
        switchMap(value => this.securityService.searchUsers(value)),
        map(data => data.users),
        tap(() => {
          this.cdr.markForCheck();
        })
      );

      this.editingPropertiesFormGroup = this.formBuilder.group({
        key: '',
        value: '',
        description: null,
        type: 'string'
      });

      this.formGroup
        .get('group')
        .valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          // remove all controls
          this.propertiesFormArray.controls.forEach((_, i: number) => this.propertiesFormArray.removeAt(i));

          const interpreters = this.parent.availableInterpreters.filter(e => e.group === value);
          interpreters.forEach(interpreter => {
            Object.keys(interpreter.properties).forEach(key => {
              this.propertiesFormArray.push(
                this.formBuilder.group({
                  key: key,
                  value: interpreter.properties[key].defaultValue || '',
                  description: interpreter.properties[key].description || '',
                  type: interpreter.properties[key].type
                })
              );
            });
          });
          this.cdr.markForCheck();
        });
    }
  }

  ngOnDestroy(): void {
    this.userSearchChange$.complete();
    this.userSearchChange$ = null;
    super.ngOnDestroy();
  }
}
