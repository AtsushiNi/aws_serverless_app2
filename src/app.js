import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);


const signIn = async (username, password) => {
  try {
    return await Amplify.Auth.signIn(username, password)
  } catch (error) {
    return error
  }
}

const signOut = () => {
  try {
    return Amplify.Auth.signOut();
  } catch (error) {
    return error
  }
}

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "api6bff470c",
        endpoint: "https://api6bff470c.execute-api.ap-northeast-1.amazonaws.com/dev",
      }
    ]
  }
});

const getData = async () => {
  const apiName = 'aws_serverless_app_apigateway';
  const path = '/project';
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Amplify.Auth.currentSession()).getIdToken().getJwtToken()}`,
    },
  };
  return await API.get(apiName, path, myInit);
}

window.getData = getData;
window.signIn = signIn;
window.signOut = signOut;