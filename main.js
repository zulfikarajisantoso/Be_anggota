const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  host: "localhost",
  database: "newBe",
  password: "horus",
  user: 'postgres',
  port: 5432, // Default PostgreSQL port
});

// pool.connect((err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("erhasil");
//     }
// })

app.post("/add", (req, res) => {
  const { nik, nama_relawan, koordinator, tandeman, notelp } = req.body;
 

  const query =
    'INSERT INTO data_anggota (nik, nama_relawan, koordinator, tandeman, notelp) VALUES ($1, $2, $3, $4, $5 ) RETURNING *';
  const values = [
    nik,
    nama_relawan,
    koordinator,
    tandeman,
    notelp,
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    const data = results.rows[0].id;
    res.status(201).send(`Data added with ID: ${data}`);
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
