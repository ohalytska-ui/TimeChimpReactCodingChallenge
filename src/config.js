const config = {
  api: {
    baseUrl: "https://api.spotify.com/v1",
    authUrl: "https://accounts.spotify.com/api/token",
    clientId: "37065b25c0c74083b4b78e20bd1d250f",
    redirectUrl: "http://localhost:3000/",
    scope: "user-read-private user-read-email user-top-read playlist-modify-private",
    url: "https://accounts.spotify.com/authorize",
  },
};
export default config;