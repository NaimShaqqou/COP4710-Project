export const json = {
    "elements": [
        {
         "type": "text",
         "name": "title",
         "title": "Survey Title",
         "isRequired": true,
         "placeholder": "Title"
        },
        {
         "type": "multipletext",
         "name": "birthdate",
         "title": "Survey Participants",
         "isRequired": true,
         "items": [
          {
           "name": "email1",
           "title": "Email #1"
          },
          {
           "name": "email2",
           "title": "Email #2"
          },
          {
           "name": "email3",
           "title": "Email #3"
          }
         ]
        },
        {
         "type": "html",
         "name": "color",
         "title": "survey period"
        },
        {
         "type": "rating",
         "name": "email",
         "title": "Type 1 Question",
         "isRequired": true,
         "validators": [
          {
           "type": "email"
          }
         ]
        },
        {
         "type": "comment",
         "name": "question1",
         "title": "Type 2 Question"
        }
       ]
  };