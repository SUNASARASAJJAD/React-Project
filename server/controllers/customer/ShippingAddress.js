const db = require("../../connection/connection");

const addShippingAddress = (req, res) => {
  const {
    user_id,
    first_name,   
    last_name,
    email,
    address,
    city,
    zip_code,
    state,
    country,
    mobile,
  } = req.body;

  if (
    !user_id ||
    !first_name ||
    !last_name ||
    !email ||
    !address ||
    !city ||
    !zip_code ||
    !state ||
    !country ||
    !mobile
  ) {
    console.error("Error: Missing required fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO shipping_addresses (user_id, first_name, last_name, email, address, city, zip_code, state, country, mobile) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      user_id,
      first_name,
      last_name,
      email,
      address,
      city,
      zip_code,
      state,
      country,
      mobile,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting shipping address:", err.sqlMessage || err);
        return res.status(500).json({ error: "Failed to insert shipping address" });
      } else {
        return res.status(200).json({ message: "Shipping address added successfully", result });
      }
    }
  );
};

module.exports = {
  addShippingAddress,
};