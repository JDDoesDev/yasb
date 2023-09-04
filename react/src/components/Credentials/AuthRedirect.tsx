import { FC, useEffect, useState } from "react";
import apiConnector from "../../utils/apiConnector";
import { useSearchParams, useNavigate } from "react-router-dom";
import authUrlGenerator from "../../utils/authUrlGenerator";

interface IClientCreds {
  clientId?: string;
  clientSecret?: string;
}


const AuthRedirect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clientCreds, setClientCreds] = useState<IClientCreds | null>(null);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const navigate = useNavigate();

  const userRole = searchParams.get('provId');
  const userName = searchParams.get('username');
  const isBroadcaster = userRole === 'twitch-role:streamer' ? true : false

  if (!userCreated && userName && userRole) {
    apiConnector.post('/api/addUser', {
      userName: userName,
      isBroadcaster: ,
    }).then((res) => {
      if (res.status === 200) {
        setUserCreated(true);
      }
    })
  }

  if (!userName || !userRole) {
    // Should redirect to login page with error.
    // @TODO: Add error handling.
    navigate('/login?error=invalid-params', { replace: true });
  }
  // This is for initial oauth flow.
  if (!clientCreds) {
  apiConnector.get('/api/credentials')
    .then((res)=> setClientCreds(res.data));
  }

  // https://id.twitch.tv/oauth2/authorize
  //   ?response_type=code
  //   &client_id=hof5gwx0su6owfnys0nyan9c87zr6t
  //   &redirect_uri=http://localhost:3000
  //   &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
  //   &state=c3ab8aa609ea11e793ae92361f002671



  useEffect(() => {
    if (clientCreds?.clientId && userRole && userCreated) {
      const { clientId } = clientCreds;
      if (userRole === 'twitch-role:streamer') {
        const authUrl = authUrlGenerator(clientId, userRole);
        window.location.href = authUrl;
      } else if (userRole === 'twitch-role:bot') {

      }
    }
  }, [clientCreds, userRole, userCreated]);

  return <>
  </>
}

export default AuthRedirect;
