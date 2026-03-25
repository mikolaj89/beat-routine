import { renderHook } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { navigationTabBarStyle } from '../../navigation/navigation-tab-bar-style';
import { useSessionTabBarVisibility } from './use-session-tab-bar-visibility';

const mockSetOptions = jest.fn();
const mockGetParent = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;

describe('useSessionTabBarVisibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetParent.mockReturnValue({ setOptions: mockSetOptions });
    mockUseNavigation.mockReturnValue({
      getParent: mockGetParent,
    } as any);
  });

  it('sets hidden tab bar style in edit mode', () => {
    renderHook(() => useSessionTabBarVisibility({ isEditMode: true }));

    expect(mockSetOptions).toHaveBeenCalledWith({
      tabBarStyle: { display: 'none' },
    });
  });

  it('sets default tab bar style in non-edit mode', () => {
    renderHook(() => useSessionTabBarVisibility({ isEditMode: false }));

    expect(mockSetOptions).toHaveBeenCalledWith({
      tabBarStyle: navigationTabBarStyle,
    });
  });

  it('restores default tab bar style on cleanup', () => {
    const { unmount } = renderHook(() =>
      useSessionTabBarVisibility({ isEditMode: true }),
    );

    unmount();

    expect(mockSetOptions).toHaveBeenLastCalledWith({
      tabBarStyle: navigationTabBarStyle,
    });
  });

  it('does nothing when parent tabs navigation is missing', () => {
    mockGetParent.mockReturnValue(undefined);

    renderHook(() => useSessionTabBarVisibility({ isEditMode: true }));

    expect(mockSetOptions).not.toHaveBeenCalled();
  });
});
