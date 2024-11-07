export const profileAccessToken = async () => {
  const tokenRes = await fetch('/api/access-token');
  const { accessToken } = await tokenRes.json();
  return accessToken;
    
}
