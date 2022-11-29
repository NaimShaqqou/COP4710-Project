import React, { useState } from 'react';
import { buildPath } from "../buildPath"

function NewSurvey(){
    var survey_title;
    var email_list;
    var survey_description;
    var survey_start;
    var survey_end;
    var survey_questions;

    const [message,setMessage] = useState('');

    const createNewSurvey = async event =>
    {
        event.preventDefault();
        let obj = { survey_title: survey_title, email_list: email_list, survey_description: survey_description, survey_start: survey_start, survey_end: survey_end, survey_questions: survey_questions };
        let js = JSON.stringify(obj);
        try
        {   

        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };
    return(
        <div id="surveyDiv">
          <form onSubmit={createNewSurvey}>
          <span id="inner-title">Create a new survey</span><br />
          <input type="text" id="survey_title" placeholder="Title" 
              ref={(c) => survey_title = c} /> <br />
          <input type="text" id="email_list" placeholder="email" 
              ref={(c) => email_list = c} /> <br />
          <input type="text" id="survey_description" placeholder="description" 
              ref={(c) => survey_description = c} /> <br />
          <input type="text" id="survey_start" placeholder="start date" 
              ref={(c) => survey_start = c} /> <br />
          <input type="text" id="survey_end" placeholder="end date" 
              ref={(c) => survey_start = c} /> <br />
          <input type="text" id="survey_questions" placeholder="questions" 
              ref={(c) => survey_questions = c} /> <br />
          <input type="submit" id="loginButton" class="buttons" value = "Login"
            onClick={doLogin} />
          </form>
          <span id="loginResult">{message}</span>
       </div>
    );
};
  export default NewSurvey;
