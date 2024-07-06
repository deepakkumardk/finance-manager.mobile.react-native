import {UpdateMode} from 'realm';
import {useQuery, useRealm} from '@realm/react';

import {SmsModel} from 'src/workflow/database';

export const useSmsModel = () => {
  const realm = useRealm();
  const smsList = useQuery(SmsModel);

  const createOrUpdate = (data: any) => {
    realm.write(() => {
      realm.create('SmsModel', data, UpdateMode.All);
    });
    console.debug('realm.write -> SmsModel saved');
  };

  return {
    smsList,
    createOrUpdate,
  };
};
