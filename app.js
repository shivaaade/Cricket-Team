const express = require("express");
const app = express();

const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const connectDBserver = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("successfully done project");
    });
  } catch (e) {
    console.log(`error: ${e.message}`);
    process.exit(1);
  }
};

connectDBserver();
app.get("/players/", async (request, response) => {
  const dbObject = `SELECT * FROM cricket_team`;
  const final = await db.all(dbObject);

  response.send(final);
});
//

// post

// app.post("/players/",(request,response)=>{
//     const playerDetails = request.body

// })
// const convertDbObjectToResponseObject = (dbObject) => {
//   return {
//     playerId: dbObject.player_id,
//     playerName: dbObject.player_name,
//     jerseyNumber: dbObject.jersey_number,
//     role: dbObject.role,
//   };
// };

module.exports = app;

// const dbObject = `SELECT
//     player_id as playerId,player_name as playerName,jersey_number as jersyNumber,role
//   FROM cricket_team ORDER BY player_id`;

//   let teamfinal = await db.all(dbObject);
//   let ss = JSON.stringify(teamfinal);
//   let dd = JSON.parse(ss);
//   response.send(dd);
