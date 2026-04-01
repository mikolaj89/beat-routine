import { themeComponents } from './theme.components';
import { themeTokens } from './theme.tokens';

export const theme = {
  ...themeTokens,
  components: themeComponents,
  // Backward-compatible alias while existing styles still use theme.shadows.*
  shadows: {
    buttonPrimary: themeComponents.button.Primary.filled.shadow,
  },
} as const;


