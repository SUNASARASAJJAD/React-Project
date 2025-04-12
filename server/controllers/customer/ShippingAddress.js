const db = require("../../connection/connection");

const addShippingAddress = (req, res) => {
  const { first_name, last_name, email, address, city, zip_code, state, country, mobile } = req.body;

  if (!first_name || !last_name || !email || !address || !city || !zip_code || !state || !country || !mobile) {
    console.error("Error: Missing required fields");
    return res.status(400).send("All fields are required");
  }

  const sql = `INSERT INTO shipping_addresses (first_name, last_name, email, address, city, zip_code, state, country, mobile) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [first_name, last_name, email, address, city, zip_code, state, country, mobile], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err.sqlMessage || err);
      return res.status(500).json({ error: "Failed to insert user" });
    } else {
      return res.status(200).json({ message: "User added successfully", result });
    }
  });
};




module.exports = {
  addShippingAddress,
};
