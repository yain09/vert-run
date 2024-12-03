// Archivo: app/components/BgSVG.tsx

import React from "react";
import Svg, { Polygon, Line } from "react-native-svg";

const BgSVG = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38100 76764.46"
      style={{
        position: "absolute",
        bottom: 0,
        minWidth: 1100,
        zIndex: 0,
        objectFit: "cover",
      }}
    >
      <Polygon
        fill="#CCCCFF"
        fillRule="nonzero"
        points="38100,2804.68 28376.78,22895.5 27463.96,22454.96 38100,478.01"
      />
      <Line
        stroke={"#99FF99"}
        strokeWidth={1016}
        strokeLinejoin="round"
        strokeMiterlimit={22.9256}
        x1="36148.49"
        y1="13625.51"
        x2="27304.42"
        y2="31899.76"
      />
      <Line
        stroke={"#CCCCFF"}
        strokeWidth={1016}
        strokeLinejoin="round"
        strokeMiterlimit={22.9256}
        className="str1"
        x1="30741.4"
        y1="61177.53"
        x2="28533.28"
        y2="65740.11"
      />
      <Polygon
        fill="#CCCCFF"
        fillRule="nonzero"
        points="8905.05,12293.71 -0,30693.96 -0,28367.29 7992.23,11853.17"
      />
      <Polygon
        fill="#99FF99"
        fillRule="nonzero"
        points="11006.38,0 2397.51,17788.27 1484.69,17347.73 9880.36,0"
      />
      <Polygon
        fill="#FF61A0"
        fillRule="nonzero"
        className="fil3"
        points="26781.58,70522.96 23760.92,76764.46 22634.9,76764.46 25868.76,70082.42"
      />
    </Svg>
  );
};

export default BgSVG;
