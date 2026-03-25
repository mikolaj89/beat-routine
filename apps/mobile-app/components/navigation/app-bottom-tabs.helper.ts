import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { RootTabParamList } from '../../types/navigation';
import { navigationTabBarStyle } from './navigation-tab-bar-style';

const hiddenTabBarStyle = {
  display: 'none' as const,
};

type HomeTabRoute = BottomTabScreenProps<RootTabParamList, 'Home'>['route'];

export function getHomeTabOptions(
  route: HomeTabRoute,
): BottomTabNavigationOptions {
  const activeHomeRouteName = getFocusedRouteNameFromRoute(route);
  const isTabBarHidden = activeHomeRouteName === 'AddSessionExercises';

  return {
    tabBarLabel: 'Home',
    tabBarStyle: isTabBarHidden ? hiddenTabBarStyle : navigationTabBarStyle,
  };
}
