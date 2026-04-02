import type { ButtonMode, ButtonType } from './button.types';
import { buttonPresets } from './button.presets';
import type { ButtonPreset } from './button.presets';

type ButtonConfigParams = {
  isDisabled: boolean;
  mode: ButtonMode;
  type: ButtonType;
};

export function getButtonConfig({
  isDisabled,
  mode,
  type,
}: ButtonConfigParams) {
  const buttonVariants = buttonPresets[type];
  const buttonPreset = (
    buttonVariants[mode as keyof typeof buttonVariants] ?? buttonVariants.filled
  ) as ButtonPreset;

  return {
    buttonPreset,
    mode: buttonPreset.paperMode,
    buttonColor: isDisabled
      ? buttonPreset.disabledButtonColor
      : buttonPreset.buttonColor,
    textColor: isDisabled
      ? buttonPreset.disabledTextColor
      : buttonPreset.textColor,
    buttonTheme: {
      colors: {
        primary: buttonPreset.buttonColor ?? buttonPreset.textColor,
        onPrimary: buttonPreset.textColor,
        outline: isDisabled
          ? buttonPreset.disabledOutlineColor ?? buttonPreset.outlineColor
          : buttonPreset.outlineColor,
        surfaceDisabled: buttonPreset.disabledButtonColor,
        onSurfaceDisabled: buttonPreset.disabledTextColor,
      },
    },
  } as const;
}
