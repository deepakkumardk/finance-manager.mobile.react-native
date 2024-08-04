import {Realm, ObjectSchema} from 'realm';

export class SmsModel extends Realm.Object<SmsModel> {
  date!: string;
  category!: string;
  tags?: string;

  static schema: ObjectSchema = {
    name: 'SmsModel',
    primaryKey: 'date',
    properties: {
      date: 'string',

      tags: {type: 'string', optional: true, indexed: 'full-text'},
      comment: {type: 'string', optional: true, indexed: 'full-text'},

      // UserData will be saved as it is like categoryInfo
      category: {type: 'string', default: 'Misc', indexed: 'full-text'},
      icon: {type: 'string', default: 'puzzle'},
      color: {type: 'string', optional: true},

      created_at: {
        type: 'int',
        default: new Date().getTime(),
      },
    },
  };
}
