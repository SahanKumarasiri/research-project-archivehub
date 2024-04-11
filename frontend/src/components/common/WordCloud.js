import React, { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";
import ColorGenerator from "random-color-array-generator/ColorGenerator.min.js";
import "../styles/Profile.css";
import { useSelector } from "react-redux";
import { removeDuplicates } from "../helpers/Helper";

const WordCloudComponent = ({ from }) => {
  const colorGenerator = new ColorGenerator(10);
  const [interests, setInterests] = useState([]);

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || {}
  );

  const previewProfileData = useSelector(
    (state) => state?.auth?.previewProfile?.data?.data || {}
  );

  useEffect(() => {
    if (from === "preview") {
      previewProfileData?.interests?.map((interest, index) =>
        interests.push({
          text: interest,
          value: Math.floor(Math.random()) + index + 1,
        })
      );
      setInterests(interests);
    } else {
      checkProfileData?.interests?.map((interest, index) =>
        interests.push({
          text: interest,
          value: Math.floor(Math.random()) + index + 1,
        })
      );
      setInterests(interests);
    }
  }, [
    Object.keys(checkProfileData)?.length,
    Object.keys(previewProfileData)?.length,
  ]);

  const options = {
    colors: colorGenerator.generateRGB(),
    enableTooltip: false,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, from === "profile" || from === "preview" ? 30 : 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 5000,
  };

  return (
    <div>
      <WordCloud
        words={removeDuplicates(interests, "text")}
        options={options}
      />
    </div>
  );
};

export default WordCloudComponent;
