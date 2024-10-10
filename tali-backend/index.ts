const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Define routes

// Get total stock and cash
app.get('/api/landing', async (req, res) => {
  try {
    const stockRes = await pool.query('SELECT total_stock FROM stock ORDER BY date DESC LIMIT 1');
    const totalStock = stockRes.rows.length > 0 ? stockRes.rows[0].total_stock : 0;

    const cashRes = await pool.query('SELECT SUM(amount) as total_cash FROM dues');
    const totalCash = cashRes.rows[0].total_cash || 0;

    res.json({ totalStock, totalCash });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const { buyerName, quantity, date } = req.body;
    const newTransaction = await pool.query(
      'INSERT INTO transactions (buyer_name, quantity, date) VALUES ($1, $2, $3) RETURNING *',
      [buyerName, quantity, date]
    );
    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add due
app.post('/api/dues', async (req, res) => {
  try {
    const { buyerName, amount, date } = req.body;
    const newDue = await pool.query(
      'INSERT INTO dues (buyer_name, amount, date) VALUES ($1, $2, $3) RETURNING *',
      [buyerName, amount, date]
    );
    res.json(newDue.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update stock
app.post('/api/stock', async (req, res) => {
  try {
    const { totalStock, date } = req.body;
    const newStock = await pool.query(
      'INSERT INTO stock (total_stock, date) VALUES ($1, $2) RETURNING *',
      [totalStock, date]
    );
    res.json(newStock.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get transactions and dues for total calculation
app.get('/api/calculation', async (req, res) => {
  try {
    const transactionsRes = await pool.query('SELECT * FROM transactions');
    const duesRes = await pool.query('SELECT * FROM dues');
    res.json({ transactions: transactionsRes.rows, dues: duesRes.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
