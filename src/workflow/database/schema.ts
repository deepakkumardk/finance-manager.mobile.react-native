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

      category: {type: 'string', indexed: 'full-text'},
      tags: {type: 'string', optional: true, indexed: 'full-text'},

      created_at: {
        type: 'int',
        default: new Date().getTime(),
      },
    },
  };
}
