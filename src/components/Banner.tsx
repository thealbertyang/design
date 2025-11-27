import { Row } from "./Row";

interface BannerProps extends React.ComponentProps<typeof Row> {
  ref?: React.Ref<HTMLDivElement>;
}

function Banner({ children, ref, ...flex }: BannerProps) {
  return (
    <Row
      fillWidth
      paddingX="16"
      paddingY="8"
      solid="brand-medium"
      onSolid="brand-strong"
      textVariant="label-default-s"
      align="center"
      center
      gap="12"
      ref={ref}
      {...flex}
    >
      {children}
    </Row>
  );
}

Banner.displayName = "Banner";
export { Banner };
