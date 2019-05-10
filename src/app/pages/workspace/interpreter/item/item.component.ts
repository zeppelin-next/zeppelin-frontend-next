import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interpreter } from 'zeppelin-interfaces';
import { TicketService } from 'zeppelin-services';
import { InterpreterComponent } from '../interpreter.component';

@Component({
  selector: 'zeppelin-interpreter-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterItemComponent implements OnInit {
  @Input() mode: 'create' | 'view' | 'edit' = 'view';

  formGroup: FormGroup;
  optionFormGroup: FormGroup;
  propertiesFormArray: FormArray;
  dependenciesFormArray: FormArray;
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
      port: -1,
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    const option = this.optionFormGroup.getRawValue();
    this.setInterpreterRunningOption(option.perNote, option.perUser);
  }
}
