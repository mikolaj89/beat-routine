import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { navigationTabBarStyle } from '../../navigation/navigation-tab-bar-style';

export function useSessionTabBarVisibility({
  isEditMode,
}: {
  isEditMode: boolean;
}) {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const tabsNavigation = navigation.getParent();
    if (!tabsNavigation) {
      return;
    }

    tabsNavigation.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      tabsNavigation.setOptions({ tabBarStyle: navigationTabBarStyle });
    };
  }, [isEditMode, navigation]);
}
