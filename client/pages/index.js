import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Signed in</h1> : <h1>Please Sign in</h1>
};

// check if user is logged in, this is being called on the server when navigating one page to another within the app
// this can be executed on the client when refresh page, click link from different domain, typing url inro address bar
// we therefore need to know which env the domain is for the axios request
LandingPage.getInitialProps = async (context) => { // nextjs
  const { data } = await buildClient(context).get('/api/users/currentuser');

  return data;
}

export default LandingPage;
