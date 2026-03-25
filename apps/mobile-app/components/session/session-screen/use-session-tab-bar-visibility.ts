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
    const tabsNavigation = navigation.getParent();
    if (!tabsNavigation) {
      return;
    }

    tabsNavigation.setOptions({
      tabBarStyle: isEditMode ? { display: 'none' } : navigationTabBarStyle,
    });

    return () => {
      tabsNavigation.setOptions({ tabBarStyle: navigationTabBarStyle });
    };
  }, [isEditMode, navigation]);
}
