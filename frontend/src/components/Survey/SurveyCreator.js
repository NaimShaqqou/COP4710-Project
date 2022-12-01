import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true
};

const defaultJson = {
  pages: [{
    name: "Survey",
    elements: [{
      name: "Type 1",
      title: "Rating from 1-5",
      type: "rating"
    }, {
      name: "Type 2",
      title: "Text answer >200 words",
      type: "text"
    }]
  }]
};

export function SurveyCreatorWidget() {
  const creator = new SurveyCreator(creatorOptions);
  creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
  creator.saveSurveyFunc = (saveNo, callback) => { 
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);

  };
  return (
    <SurveyCreatorComponent creator={creator} />
  )
}