import {Platform} from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
} from 'react-native-permissions';

export const PermissionUtils = {
  requestPermission: async () => {
    const androidPermissions = [PERMISSIONS.ANDROID.READ_SMS];
    const iOSPermissions = [PERMISSIONS.IOS.CONTACTS];
    const permissions =
      Platform.OS === 'android' ? androidPermissions : iOSPermissions;

    try {
      const hasPermissions = await checkMultiple(permissions);

      const isAllGranted = (response: typeof hasPermissions) =>
        Object.values(response).every((value: any) => value === 'granted');

      if (isAllGranted(hasPermissions)) {
        return true;
      }
      const response = await requestMultiple(permissions);
      return isAllGranted(response);
    } catch (error) {
      console.warn('requestContactsPermission: -> error', error);
      return false;
    }
  },
};
