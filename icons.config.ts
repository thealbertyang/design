/**
 * Icon Configuration for Once UI
 *
 * Maps icon names to their react-icons sources.
 * Run `bun run icons:generate` to regenerate SVG components.
 *
 * Format: { iconName: 'package/ComponentName' }
 * Packages: hi2 (Heroicons v2), io5 (Ionicons), lu (Lucide), pi (Phosphor)
 */
export default {
  // Heroicons v2 (hi2)
  chevronUp: "hi2/HiChevronUp",
  chevronDown: "hi2/HiChevronDown",
  chevronRight: "hi2/HiChevronRight",
  chevronLeft: "hi2/HiChevronLeft",
  refresh: "hi2/HiOutlineArrowPath",
  light: "hi2/HiOutlineSun",
  dark: "hi2/HiOutlineMoon",
  eye: "hi2/HiOutlineEye",
  eyeOff: "hi2/HiOutlineEyeSlash",
  clipboard: "hi2/HiOutlineClipboard",
  search: "hi2/HiOutlineMagnifyingGlass",
  link: "hi2/HiOutlineLink",
  arrowUpRight: "hi2/HiArrowUpRight",
  security: "hi2/HiOutlineShieldCheck",
  sparkle: "hi2/HiOutlineSparkles",
  computer: "hi2/HiOutlineComputerDesktop",
  help: "hi2/HiOutlineQuestionMarkCircle",
  info: "hi2/HiOutlineInformationCircle",
  warning: "hi2/HiOutlineExclamationTriangle",
  danger: "hi2/HiOutlineExclamationCircle",
  check: "hi2/HiOutlineCheckCircle",
  close: "hi2/HiOutlineXMark",
  person: "hi2/HiOutlineUser",
  eyeDropper: "hi2/HiOutlineEyeDropper",
  minus: "hi2/HiOutlineMinus",
  plus: "hi2/HiOutlinePlus",
  calendar: "hi2/HiOutlineCalendar",
  copy: "hi2/HiOutlineDocumentDuplicate",
  checkbox: "hi2/HiOutlineCheck",
  minimize: "hi2/HiOutlineArrowsPointingIn",
  maximize: "hi2/HiOutlineArrowsPointingOut",
  smiley: "hi2/HiOutlineFaceSmile",
  enter: "hi2/HiOutlineArrowTurnDownLeft",
  play: "hi2/HiOutlinePlay",
  pause: "hi2/HiOutlinePause",
  document: "hi2/HiOutlineBars3BottomLeft",
  screen: "hi2/HiOutlineComputerDesktop",

  // Ionicons v5 (io5)
  paw: "io5/IoPawOutline",
  food: "io5/IoFastFoodOutline",
  ball: "io5/IoFootballOutline",
  world: "io5/IoGlobeOutline",
  gift: "io5/IoGiftOutline",
  atSymbol: "io5/IoAtOutline",
  flag: "io5/IoFlagOutline",

  // Lucide (lu)
  chevronsLeftRight: "lu/LuChevronsLeftRight",
  wordmark: "lu/LuTextCursorInput",

  // Phosphor (pi)
  radialGauge: "pi/PiGauge",
  linearGauge: "pi/PiBatteryFull",
} as const;

export type IconConfig = typeof import("./icons.config").default;
export type IconName = keyof IconConfig;
