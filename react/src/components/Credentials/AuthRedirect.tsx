import { useEffect, useState } from "react";
import apiConnector from "../../utils/apiConnector";
import { useSearchParams, useNavigate } from "react-router-dom";
import authUrlGenerator from "../../utils/authUrlGenerator";
import TwitchAuthLink from "./TwitchAuthLink";

interface IClientCreds {
  clientId: string;
  clientSecret: string;
}


const AuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const [clientCreds, setClientCreds] = useState(null as unknown as IClientCreds);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [authUrl, setAuthUrl] = useState<string>(null as unknown as string);
  const navigate = useNavigate();


  const userRole = searchParams.get('provId');
  const userName = searchParams.get('username');
  const isBroadcaster = userRole === 'twitch-role:streamer' ? true : false


  if (!userCreated && userName && userRole) {
    apiConnector.post('/api/addUser', {
      userName: userName,
      isBroadcaster: isBroadcaster,
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

  useEffect(() => {
    if (clientCreds?.clientId && userRole) {
      const authUrlString = authUrlGenerator(clientCreds.clientId, userRole as string);
      setAuthUrl(authUrlString);
    }
  },[clientCreds, userRole])
  console.log(authUrl)

  useEffect(() => {
    // if broadcaster then just redirect to auth URL.
    if (isBroadcaster && authUrl) {
      window.location.href = authUrl;
    }
  }, [authUrl, isBroadcaster]);


  return (
    <>
      <TwitchAuthLink authUrl={authUrl} />
    </>
  )
}

export default AuthRedirect;
