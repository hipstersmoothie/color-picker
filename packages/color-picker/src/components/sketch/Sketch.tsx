import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Alpha, Checkboard, Hue, Saturation } from "../common";
import SketchFields from "./SketchFields";
import SketchPresetColors from "./SketchPresetColors";

export type SketchPickerProps = {
  disableAlpha?: boolean;
  width?: string | number;
  className?: string;
  presetColors?: string[];
  styles?: Record<string, React.CSSProperties>;
  renderers?: any;
};

export function Sketch({
  width = 200,
  disableAlpha = false,
  presetColors = [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B",
    "#FFFFFF",
  ],
  renderers,
  styles: passedStyles = {},
  className = "",
}: SketchPickerProps) {
  const { colors, changeColor } = useColor();
  const { rgb, hex, hsv, hsl } = colors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      picker: {
        width,
        padding: "10px 10px 0",
        boxSizing: "initial",
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)",
      },
      saturation: {
        width: "100%",
        paddingBottom: "75%",
        position: "relative",
      },
      Saturation: {
        borderRadius: "3px",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
      },
      controls: {
        display: "flex",
      },
      sliders: {
        padding: "4px 0",
        flex: "1",
      },
      color: {
        width: "24px",
        height: disableAlpha ? "10px" : "24px",
        position: "relative",
        marginTop: "4px",
        marginLeft: "4px",
        borderRadius: "3px",
      },
      activeColor: {
        position: "absolute",
        inset: "0px",
        borderRadius: "2px",
        background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
      },
      hue: {
        position: "relative",
        height: "10px",
        overflow: "hidden",
      },
      Hue: {
        borderRadius: "2px",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
      },

      alpha: {
        position: "relative",
        height: "10px",
        marginTop: "4px",
        overflow: "hidden",
        display: disableAlpha ? "none" : undefined,
      },
      Alpha: {
        borderRadius: "2px",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
      },
      ...passedStyles,
    },
    passedStyles
  );

  return (
    <div style={styles.picker} className={`sketch-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={changeColor}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hue}>
            <Hue style={styles.Hue} hsl={hsl} onChange={changeColor} />
          </div>
          <div style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={changeColor}
            />
          </div>
        </div>
        <div style={styles.color}>
          <Checkboard />
          <div style={styles.activeColor} />
        </div>
      </div>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={changeColor}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors colors={presetColors} onClick={changeColor} />
    </div>
  );
}

export default withColorProvider(Sketch);
