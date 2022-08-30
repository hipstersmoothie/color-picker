import React from "react";
import { ChangeColor } from "../../context/useColor";
import { Color } from "../../types/colors";
import { Swatch } from "../common";
import { withHover } from "../common/withHover";

type Props = {
  hover?: boolean;
  color: string;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  onClick?: (newColor: ChangeColor, event: React.MouseEvent) => void;
};

export function GithubSwatch({ hover, color, onClick, onSwatchHover }: Props) {
  const hoverSwatch: React.CSSProperties = {
    position: "relative",
    zIndex: "2",
    outline: "2px solid #fff",
    boxShadow: "0 0 5px 2px rgba(0,0,0,0.25)",
  };

  const styles: Record<string, React.CSSProperties> = {
    swatch: {
      width: "25px",
      height: "25px",
      fontSize: "0",
    },
  };

  if (hover) {
    styles.swatch = { ...styles.swatch, ...hoverSwatch };
  }

  return (
    <div style={styles.swatch}>
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={hoverSwatch}
      />
    </div>
  );
}

export default withHover(GithubSwatch);
