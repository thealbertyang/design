import type { IconType } from "@react-icons/all-files";

// hi2 icons - individual imports for tree-shaking
import { HiChevronUp } from "@react-icons/all-files/hi2/HiChevronUp";
import { HiChevronDown } from "@react-icons/all-files/hi2/HiChevronDown";
import { HiChevronRight } from "@react-icons/all-files/hi2/HiChevronRight";
import { HiChevronLeft } from "@react-icons/all-files/hi2/HiChevronLeft";
import { HiOutlineArrowPath } from "@react-icons/all-files/hi2/HiOutlineArrowPath";
import { HiOutlineSun } from "@react-icons/all-files/hi2/HiOutlineSun";
import { HiOutlineMoon } from "@react-icons/all-files/hi2/HiOutlineMoon";
import { HiOutlineEye } from "@react-icons/all-files/hi2/HiOutlineEye";
import { HiOutlineEyeSlash } from "@react-icons/all-files/hi2/HiOutlineEyeSlash";
import { HiOutlineClipboard } from "@react-icons/all-files/hi2/HiOutlineClipboard";
import { HiOutlineMagnifyingGlass } from "@react-icons/all-files/hi2/HiOutlineMagnifyingGlass";
import { HiOutlineLink } from "@react-icons/all-files/hi2/HiOutlineLink";
import { HiArrowUpRight } from "@react-icons/all-files/hi2/HiArrowUpRight";
import { HiOutlineShieldCheck } from "@react-icons/all-files/hi2/HiOutlineShieldCheck";
import { HiOutlineSparkles } from "@react-icons/all-files/hi2/HiOutlineSparkles";
import { HiOutlineComputerDesktop } from "@react-icons/all-files/hi2/HiOutlineComputerDesktop";
import { HiOutlineQuestionMarkCircle } from "@react-icons/all-files/hi2/HiOutlineQuestionMarkCircle";
import { HiOutlineInformationCircle } from "@react-icons/all-files/hi2/HiOutlineInformationCircle";
import { HiOutlineExclamationTriangle } from "@react-icons/all-files/hi2/HiOutlineExclamationTriangle";
import { HiOutlineExclamationCircle } from "@react-icons/all-files/hi2/HiOutlineExclamationCircle";
import { HiOutlineCheckCircle } from "@react-icons/all-files/hi2/HiOutlineCheckCircle";
import { HiOutlineXMark } from "@react-icons/all-files/hi2/HiOutlineXMark";
import { HiOutlineUser } from "@react-icons/all-files/hi2/HiOutlineUser";
import { HiOutlineEyeDropper } from "@react-icons/all-files/hi2/HiOutlineEyeDropper";
import { HiOutlineMinus } from "@react-icons/all-files/hi2/HiOutlineMinus";
import { HiOutlinePlus } from "@react-icons/all-files/hi2/HiOutlinePlus";
import { HiOutlineCalendar } from "@react-icons/all-files/hi2/HiOutlineCalendar";
import { HiOutlineDocumentDuplicate } from "@react-icons/all-files/hi2/HiOutlineDocumentDuplicate";
import { HiOutlineCheck } from "@react-icons/all-files/hi2/HiOutlineCheck";
import { HiOutlineArrowsPointingIn } from "@react-icons/all-files/hi2/HiOutlineArrowsPointingIn";
import { HiOutlineArrowsPointingOut } from "@react-icons/all-files/hi2/HiOutlineArrowsPointingOut";
import { HiOutlineFaceSmile } from "@react-icons/all-files/hi2/HiOutlineFaceSmile";
import { HiOutlineArrowTurnDownLeft } from "@react-icons/all-files/hi2/HiOutlineArrowTurnDownLeft";
import { HiOutlinePlay } from "@react-icons/all-files/hi2/HiOutlinePlay";
import { HiOutlinePause } from "@react-icons/all-files/hi2/HiOutlinePause";
import { HiOutlineBars3BottomLeft } from "@react-icons/all-files/hi2/HiOutlineBars3BottomLeft";

// io5 icons
import { IoAtOutline } from "@react-icons/all-files/io5/IoAtOutline";
import { IoFastFoodOutline } from "@react-icons/all-files/io5/IoFastFoodOutline";
import { IoFlagOutline } from "@react-icons/all-files/io5/IoFlagOutline";
import { IoFootballOutline } from "@react-icons/all-files/io5/IoFootballOutline";
import { IoGiftOutline } from "@react-icons/all-files/io5/IoGiftOutline";
import { IoGlobeOutline } from "@react-icons/all-files/io5/IoGlobeOutline";
import { IoPawOutline } from "@react-icons/all-files/io5/IoPawOutline";

// lu icons
import { LuChevronsLeftRight } from "@react-icons/all-files/lu/LuChevronsLeftRight";
import { LuTextCursorInput } from "@react-icons/all-files/lu/LuTextCursorInput";

// pi icons
import { PiBatteryFull } from "@react-icons/all-files/pi/PiBatteryFull";
import { PiGauge } from "@react-icons/all-files/pi/PiGauge";

export const iconLibrary: Record<string, IconType> = {
  chevronUp: HiChevronUp,
  chevronDown: HiChevronDown,
  chevronRight: HiChevronRight,
  chevronLeft: HiChevronLeft,
  chevronsLeftRight: LuChevronsLeftRight,
  refresh: HiOutlineArrowPath,
  light: HiOutlineSun,
  dark: HiOutlineMoon,
  help: HiOutlineQuestionMarkCircle,
  info: HiOutlineInformationCircle,
  warning: HiOutlineExclamationTriangle,
  danger: HiOutlineExclamationCircle,
  checkbox: HiOutlineCheck,
  check: HiOutlineCheckCircle,
  copy: HiOutlineDocumentDuplicate,
  eyeDropper: HiOutlineEyeDropper,
  clipboard: HiOutlineClipboard,
  person: HiOutlineUser,
  close: HiOutlineXMark,
  link: HiOutlineLink,
  arrowUpRight: HiArrowUpRight,
  minus: HiOutlineMinus,
  plus: HiOutlinePlus,
  calendar: HiOutlineCalendar,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  search: HiOutlineMagnifyingGlass,
  security: HiOutlineShieldCheck,
  sparkle: HiOutlineSparkles,
  computer: HiOutlineComputerDesktop,
  minimize: HiOutlineArrowsPointingIn,
  maximize: HiOutlineArrowsPointingOut,
  smiley: HiOutlineFaceSmile,
  paw: IoPawOutline,
  food: IoFastFoodOutline,
  ball: IoFootballOutline,
  world: IoGlobeOutline,
  gift: IoGiftOutline,
  symbol: IoAtOutline,
  flag: IoFlagOutline,
  wordmark: LuTextCursorInput,
  enter: HiOutlineArrowTurnDownLeft,
  play: HiOutlinePlay,
  pause: HiOutlinePause,
  screen: HiOutlineComputerDesktop,
  document: HiOutlineBars3BottomLeft,
  radialGauge: PiGauge,
  linearGauge: PiBatteryFull
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
