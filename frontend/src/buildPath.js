const app_name = 'cop4710-survey-project'
export const buildPath = (route) => {
    if (process.env.NODE_ENV === "production")
        return `https://${app_name}.herokuapp.com/${route}`;
    else
        return `http://localhost:5000/${route}`;
}