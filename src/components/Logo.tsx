"use client";

import classNames from "classnames";
import Link from "next/link";
import type React from "react";
import { useEffect } from "react";
import { useToast } from "../contexts";
import type { SpacingToken } from "../types";
import { Column, ContextMenu, Flex, Icon, Line, Option } from ".";

const sizeMap: Record<string, SpacingToken> = {
  xs: "20",
  s: "24",
  m: "32",
  l: "40",
  xl: "48",
};

/**
 * Adaptive image source - can be a string for static, or object with light/dark variants
 * When using { light, dark }, CSS light-dark() handles automatic switching
 */
type AdaptiveImageSource = string | { light: string; dark: string };

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  style?: React.CSSProperties;
  /**
   * Icon source - string for static, or { light, dark } for theme-adaptive
   */
  icon?: AdaptiveImageSource;
  /**
   * Wordmark source - string for static, or { light, dark } for theme-adaptive
   */
  wordmark?: AdaptiveImageSource;
  href?: string;
  /**
   * @deprecated Use icon={{ light, dark }} instead for automatic theme switching
   */
  dark?: boolean;
  /**
   * @deprecated Use icon={{ light, dark }} instead for automatic theme switching
   */
  light?: boolean;
  brand?: { copy?: boolean; url?: string };
}

/**
 * Helper to check if source is adaptive (has light/dark variants)
 */
const isAdaptive = (src: AdaptiveImageSource | undefined): src is { light: string; dark: string } =>
  typeof src === "object" && src !== null && "light" in src && "dark" in src;

/**
 * Renders an image with optional light/dark theme switching
 * Uses CSS light-dark() function for zero-JS theme switching
 */
const AdaptiveImage: React.FC<{
  src: AdaptiveImageSource;
  size: string;
  alt: string;
}> = ({ src, size, alt }) => {
  const imgStyle = {
    height: `var(--static-space-${size})`,
    width: "auto",
  };

  if (isAdaptive(src)) {
    // Render both images, CSS handles visibility via media query + data-theme
    // Uses light-block/dark-block (outside @layer) to override utility classes
    return (
      <>
        <img className="light-block" style={imgStyle} alt={alt} src={src.light} />
        <img className="dark-block" style={imgStyle} alt={alt} src={src.dark} />
      </>
    );
  }

  // Static image - no theme switching
  return <img style={imgStyle} alt={alt} src={src} />;
};

const Logo: React.FC<LogoProps> = ({
  size = "m",
  href,
  icon,
  wordmark,
  className,
  style,
  dark,
  light,
  brand,
  ...props
}) => {
  useEffect(() => {
    if (!icon && !wordmark) {
      console.warn(
        "Both 'icon' and 'wordmark' props are set to false. The logo will not render any content.",
      );
    }
  }, [icon, wordmark]);

  // Determine if we're using adaptive images (new API) vs legacy dark/light props
  const hasAdaptiveImages = isAdaptive(icon) || isAdaptive(wordmark);

  const content = (
    <>
      {icon && <AdaptiveImage src={icon} size={sizeMap[size]} alt="Trademark" />}
      {wordmark && <AdaptiveImage src={wordmark} size={sizeMap[size]} alt="Trademark" />}
    </>
  );

  const { addToast } = useToast();

  /**
   * Copy SVG to clipboard - handles both static and adaptive sources
   * For adaptive sources, uses matchMedia to detect current theme
   */
  const copySvgToClipboard = async (src: AdaptiveImageSource, type: "icon" | "wordmark") => {
    const url = isAdaptive(src)
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? src.dark
        : src.light
      : src;

    try {
      const response = await fetch(url);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      addToast({
        variant: "success",
        message: `${type === "icon" ? "Icon" : "Wordmark"} copied to clipboard as SVG`,
      });
    } catch (error) {
      addToast({
        variant: "danger",
        message: `Failed to copy ${type} to clipboard`,
      });
      console.error(`Error copying ${type}:`, error);
    }
  };

  const copyIconToClipboard = async () => {
    if (!icon) {
      addToast({ variant: "danger", message: "No icon available to copy" });
      return;
    }
    await copySvgToClipboard(icon, "icon");
  };

  const copyWordmarkToClipboard = async () => {
    if (!wordmark) {
      addToast({ variant: "danger", message: "No wordmark available to copy" });
      return;
    }
    await copySvgToClipboard(wordmark, "wordmark");
  };

  const renderDropdownContent = () => {
    return (
      <Column fillWidth>
        <Column fillWidth padding="4" gap="4">
          {brand?.copy && icon && (
            <Option
              value="copy-icon"
              label="Copy icon as SVG"
              hasPrefix={<Logo size="xs" icon={icon} style={{ opacity: 0.5 }} />}
              onClick={copyIconToClipboard}
            />
          )}
          {brand?.copy && wordmark && (
            <Option
              value="copy-wordmark"
              label="Copy wordmark as SVG"
              hasPrefix={<Icon size="xs" onBackground="neutral-weak" name="wordmark" />}
              onClick={copyWordmarkToClipboard}
            />
          )}
        </Column>
        {brand?.url && (
          <>
            <Line />
            <Column fillWidth padding="4">
              <Option
                value="brand-guidelines"
                label="Visit brand guidelines"
                hasPrefix={<Icon size="xs" onBackground="neutral-weak" name="arrowUpRight" />}
                href={brand.url}
              />
            </Column>
          </>
        )}
      </Column>
    );
  };

  const enableContext = brand && ((brand.copy && (icon || wordmark)) || brand.url);

  const renderLogo = () => {
    // Only apply dark-flex/light-flex when using legacy API (dark/light props)
    // When using adaptive images, each <img> handles its own visibility
    const usesThemeClass = !hasAdaptiveImages && (dark || light);
    const themeClasses = usesThemeClass
      ? classNames(dark && "dark-flex", light && "light-flex")
      : "";

    // Don't include display-flex when using theme classes - they set display themselves
    // This avoids CSS cascade conflicts between display-flex and dark-flex/light-flex
    const displayClass = usesThemeClass ? "" : "display-flex";

    if (href) {
      return (
        <Link
          className={classNames("radius-l", displayClass, "fit-height", themeClasses, className)}
          style={style}
          href={href}
          aria-label="Trademark"
          {...props}
        >
          {content}
        </Link>
      );
    }
    // For Flex, only pass dark/light props when using legacy API
    return (
      <Flex
        className={classNames(className)}
        dark={!hasAdaptiveImages && dark}
        light={!hasAdaptiveImages && light}
        radius="l"
        fitHeight
        style={style}
        aria-label="Trademark"
      >
        {content}
      </Flex>
    );
  };

  return enableContext ? (
    <ContextMenu dropdown={renderDropdownContent()} placement="bottom-start">
      {renderLogo()}
    </ContextMenu>
  ) : (
    renderLogo()
  );
};

Logo.displayName = "Logo";
export { Logo };
export type { AdaptiveImageSource };
