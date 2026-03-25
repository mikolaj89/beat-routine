import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getHomeTabOptions } from './app-bottom-tabs.helper';
import { navigationTabBarStyle } from './navigation-tab-bar-style';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  getFocusedRouteNameFromRoute: jest.fn(),
}));

const mockGetFocusedRouteNameFromRoute =
  getFocusedRouteNameFromRoute as jest.MockedFunction<
    typeof getFocusedRouteNameFromRoute
  >;

describe('getHomeTabOptions', () => {
  const homeRoute = { key: 'Home-1', name: 'Home' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hides tab bar on AddSessionExercises route', () => {
    mockGetFocusedRouteNameFromRoute.mockReturnValue('AddSessionExercises');

    const options = getHomeTabOptions(homeRoute);

    expect(options.tabBarLabel).toBe('Home');
    expect(options.tabBarStyle).toEqual({ display: 'none' });
  });

  it('shows shared tab bar style on other routes', () => {
    mockGetFocusedRouteNameFromRoute.mockReturnValue('Session');

    const options = getHomeTabOptions(homeRoute);

    expect(options.tabBarLabel).toBe('Home');
    expect(options.tabBarStyle).toEqual(navigationTabBarStyle);
  });
});
