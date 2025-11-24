"use client";

import type React from "react";
import type { gridSize, StyleProps } from "..";
import { DropdownWrapper, EmojiPicker } from ".";

export interface EmojiPickerDropdownProps
  extends Omit<React.ComponentProps<typeof DropdownWrapper>, "dropdown"> {
  onSelect: (emoji: string) => void;
  background?: StyleProps["background"];
  columns?: gridSize;
}

const EmojiPickerDropdown: React.FC<EmojiPickerDropdownProps> = ({
  trigger,
  onSelect,
  closeAfterClick = true,
  background = "surface",
  columns = "8",
  ...dropdownProps
}) => {
  const handleEmojiSelect = (emoji: string) => {
    onSelect(emoji);
    if (closeAfterClick) {
      dropdownProps.onOpenChange?.(false);
    }
  };

  return (
    <DropdownWrapper
      {...dropdownProps}
      trigger={trigger}
      handleArrowNavigation={false}
      dropdown={
        <EmojiPicker
          columns={columns}
          padding="8"
          onSelect={handleEmojiSelect}
          onClose={closeAfterClick ? () => dropdownProps.onOpenChange?.(false) : undefined}
          background={background}
        />
      }
    />
  );
};

export { EmojiPickerDropdown };
