const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const spotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    clientId: "5deb6ae9935f42f9adf024698e1a1c3a",
    redirectUri: "http://localhost:3000",
    clientSecret: "97593e61308848789ce3871a0fca3259",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    clientId: "5deb6ae9935f42f9adf024698e1a1c3a",
    redirectUri: "http://localhost:3000",
    clientSecret: "97593e61308848789ce3871a0fca3259",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3001);
