import {useEffect} from 'react';

import {type EventEmitter} from 'src/common';
import {type SubjectProp} from 'src/types';

export const useEventEmitter = (
  eventEmitter: EventEmitter,
  callback: (eventProp: SubjectProp) => void,
) => {
  useEffect(() => {
    const subscription = eventEmitter.getObservable().subscribe(async event => {
      callback(event);
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
