const authUrlGenerator = (clientId: string | undefined, userRole: string) => {
  // @TODO: Add redirect uri to router in main.
  const redirectUri = encodeURIComponent(
    "http://localhost:5174/api/v1/twitch/validateToken"
  );
  const urlParams = `?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=${userRole}`;
  const fullUrl = `https://id.twitch.tv/oauth2/authorize${urlParams}`;
  if (clientId === undefined) {
    throw new Error("Client ID is undefined.");
  }
  return fullUrl;
}

export default authUrlGenerator;
