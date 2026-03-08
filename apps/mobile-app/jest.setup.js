import '@testing-library/jest-native/extend-expect';

// Mock icon libs so react-native-paper (and other components) don't warn in tests.
// Paper uses .default when requiring; use a component so require(...).default works.
const MockIcon = () => null;
jest.mock('react-native-vector-icons/MaterialIcons', () => MockIcon);
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => ({
  __esModule: true,
  default: MockIcon,
}));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-audio-api', () => {
	class MockAudioContext {
		constructor() {
			this.currentTime = 0;
			this.destination = {};
		}
		createBufferSource() {
			return {
				connect: jest.fn(),
				start: jest.fn(),
				stop: jest.fn(),
				buffer: null,
			};
		}
		createGain() {
			return {
				connect: jest.fn(),
				gain: {
					setValueAtTime: jest.fn(),
					exponentialRampToValueAtTime: jest.fn(),
				},
			};
		}
		decodeAudioData() {
			return Promise.resolve({});
		}
	}

	return {
		AudioContext: MockAudioContext,
		AudioBuffer: class MockAudioBuffer {},
	};
});

jest.mock('react-native-fs', () => ({
	readFileAssets: jest.fn().mockResolvedValue(''),
}));

jest.mock('react-native-bootsplash', () => ({
	hide: jest.fn().mockResolvedValue(undefined),
	isVisible: jest.fn(() => true),
	useHideAnimation: jest.fn(() => ({
		container: { style: {} },
		logo: { source: 0, style: {} },
		brand: { source: 0, style: {} },
	})),
}));
