/* IMPORTS */
import React from "react";
import { createLinearPath, createRadialGradient, createPathAndAnimation } from "../../utils";
/* ------ */

export const DefaultCircle = ({ id, playerCircle, centerPoint, isInit }) => {
  const { path, animation } = createPathAndAnimation(playerCircle, id);
  console.log(playerCircle)
  return (
    <>
      <defs>
        {createRadialGradient(id, centerPoint, playerCircle.hue, playerCircle.saturation, playerCircle.lightness)}
        {createLinearPath(id, centerPoint, playerCircle.xCartesian, playerCircle.yCartesian, playerCircle.radius, null)}
      </defs>
      <path
        id={`circle_${id}${isInit ? "_init" : ""}`}
        key={`circle_${id}${isInit ? "_init" : ""}`}
        d={path}
        style={{
          fill: `url(#radialGradient${id})`,
          opacity: `${isInit ? 0.2 : 1}`,
          fillRule: "evenodd",
          stroke: "none",
          strokeLinecap: "round",
        }}
      >
        {animation}
      </path>
    </>
  );
};
