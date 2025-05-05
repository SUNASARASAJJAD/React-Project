const db = require("../../connection/connection");

// Add or update cart item
const addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    console.log(req.body);

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const checkSql = "SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?";
        const existingItem = await new Promise((resolve, reject) => {
            db.query(checkSql, [user_id, product_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        if (existingItem.length > 0) {
            const newQuantity = existingItem[0].quantity + quantity;
            const updateSql = "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?";
            await new Promise((resolve, reject) => {
                db.query(updateSql, [newQuantity, user_id, product_id], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } else {
            const insertSql = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)";
            await new Promise((resolve, reject) => {
                db.query(insertSql, [user_id, product_id, quantity], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        }

        res.status(201).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Fetch cart items with product details
const getCartItems = (req, res) => {
    const { user_id } = req.params;

    if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ error: "Valid user_id is required" });
    }

    const sql = `
        SELECT ci.product_id AS id, ci.quantity, p.name, p.price, p.image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching cart items:", err);
            return res.status(500).json({ error: "Failed to fetch cart" });
        }

        if (!results.length) {
            return res.status(200).json({ message: "Cart is empty", items: [] });
        }

        res.status(200).json(results);
    });
};

// Delete cart items for a user
const deleteCart = (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id || isNaN(user_id) || isNaN(product_id)) {
        return res.status(400).json({ error: "Valid user_id and product_id are required" });
    }

    db.query("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, result) => {
        if (err) {
            console.error("Error deleting cart item:", err);
            return res.status(500).json({ error: "Failed to delete cart item" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item deleted successfully" });
    });
};


// Update cart item quantity
const updateCartQuantity = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: "Valid user_id, product_id, and positive integer quantity are required" });
    }

    db.query(
        "SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
        [user_id, product_id],
        (err, result) => {
            if (err) {
                console.error("Error checking cart item:", err);
                return res.status(500).json({ error: "Failed to check cart item" });
            }

            if (!result.length) {
                return res.status(404).json({ error: "Cart item not found" });
            }

            db.query(
                "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
                [quantity, user_id, product_id],
                (err, updateResult) => {
                    if (err) {
                        console.error("Error updating cart quantity:", err);
                        return res.status(500).json({ error: "Failed to update quantity" });
                    }

                    res.status(200).json({ message: "Cart quantity updated successfully" });
                }
            );
        }
    );
};


// Sync local cart to database
const syncCart = (req, res) => {
    const { user_id, cartItems } = req.body;

    if (!user_id || !cartItems || !Array.isArray(cartItems) || !cartItems.length) {
        return res.status(400).json({ error: "Valid user_id and non-empty cart items array are required" });
    }

    db.beginTransaction(err => {
        if (err) {
            console.error("Transaction start error:", err);
            return res.status(500).json({ error: "Failed to start transaction" });
        }

        let errorOccurred = false;

        const processItem = (index) => {
            if (index >= cartItems.length) {
                return db.commit(commitErr => {
                    if (commitErr) {
                        return db.rollback(() => {
                            console.error("Commit failed, rollback done:", commitErr);
                            res.status(500).json({ error: "Failed to commit transaction" });
                        });
                    }

                    res.status(200).json({ message: "Cart synced successfully" });
                });
            }

            const { id: product_id, quantity } = cartItems[index];

            if (!product_id || !Number.isInteger(quantity) || quantity <= 0) {
                errorOccurred = true;
                return db.rollback(() => {
                    res.status(400).json({ error: `Invalid product_id or quantity for item: ${JSON.stringify(cartItems[index])}` });
                });
            }

            db.query(
                "SELECT id FROM products WHERE id = ? AND status = 'active'",
                [product_id],
                (err, productResult) => {
                    if (err || !productResult.length) {
                        errorOccurred = true;
                        return db.rollback(() => {
                            res.status(400).json({ error: `Product not found or inactive: ${product_id}` });
                        });
                    }

                    db.query(
                        "SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
                        [user_id, product_id],
                        (err, cartResult) => {
                            if (err) {
                                errorOccurred = true;
                                return db.rollback(() => {
                                    res.status(500).json({ error: "Failed to check existing cart item" });
                                });
                            }

                            if (cartResult.length) {
                                db.query(
                                    "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
                                    [quantity, user_id, product_id],
                                    (err) => {
                                        if (err) {
                                            errorOccurred = true;
                                            return db.rollback(() => {
                                                res.status(500).json({ error: "Failed to update cart item" });
                                            });
                                        }
                                        processItem(index + 1);
                                    }
                                );
                            } else {
                                db.query(
                                    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
                                    [user_id, product_id, quantity],
                                    (err) => {
                                        if (err) {
                                            errorOccurred = true;
                                            return db.rollback(() => {
                                                res.status(500).json({ error: "Failed to insert cart item" });
                                            });
                                        }
                                        processItem(index + 1);
                                    }
                                );
                            }
                        }
                    );
                }
            );
        };

        processItem(0);
    });
};


module.exports = { addToCart, getCartItems, deleteCart, updateCartQuantity, syncCart };