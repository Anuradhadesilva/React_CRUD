const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const mysql = require("mysql");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "@Anu123456",
  authPlugin: "caching_sha2_password",
  database: "moviereview", // Add this option
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/get',(req,res)=>{
    const sqlSelect="SELECT*FROM reviews";
    db.query(sqlSelect,(err,result)=>{
        res.send(result)
    })
})
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO reviews (movieName,movieReview) VALUES(?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
