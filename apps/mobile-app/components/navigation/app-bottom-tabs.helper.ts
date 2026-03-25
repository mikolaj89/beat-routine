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

const homeRoutesWithHiddenTabBar = new Set(['AddSessionExercises']);

type HomeTabRoute = BottomTabScreenProps<RootTabParamList, 'Home'>['route'];

export function getHomeTabOptions(
  route: HomeTabRoute,
): BottomTabNavigationOptions {
  const activeHomeRouteName = getFocusedRouteNameFromRoute(route);
  const isTabBarHidden = Boolean(
    activeHomeRouteName && homeRoutesWithHiddenTabBar.has(activeHomeRouteName),
  );

  return {
    tabBarLabel: 'Home',
    tabBarStyle: isTabBarHidden ? hiddenTabBarStyle : navigationTabBarStyle,
  };
}
