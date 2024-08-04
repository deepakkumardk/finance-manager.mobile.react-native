import {Subject} from 'rxjs';

import {type SubjectProp} from 'src/types';

export class EventEmitter {
  observable: Subject<SubjectProp>;
  constructor() {
    this.observable = new Subject();
  }

  getObservable() {
    return this.observable;
  }

  emit(type: string, data?: any) {
    this.getObservable().next({type, data});
  }
}

export const globalEmitter = new EventEmitter();
