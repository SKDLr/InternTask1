const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('The Backend is Active');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

const tables = ['locations', 'reports', 'status_updates'];

// GET all data routes
for (const table of tables) {
    app.get(`/${table}`, async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM ${table}`);
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    });
}

// POST: Locations
app.post('/locations', async (req, res) => {
    const { name, region } = req.body;
    try {
        await pool.query('INSERT INTO locations (name, region) VALUES ($1, $2)', [name, region]);
        res.status(201).json({ message: 'Location added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Reports
app.post('/reports', async (req, res) => {
    const { location_id, user_contact, issue_type } = req.body;
    try {
        await pool.query(
            'INSERT INTO reports (location_id, user_contact, issue_type) VALUES ($1, $2, $3)',
            [location_id, user_contact, issue_type]
        );
        res.status(201).json({ message: 'Report added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Status_Updates
app.post('/status_updates', async (req, res) => {
    const { report_id, status, note } = req.body;
    try {
        await pool.query(
            'INSERT INTO status_updates (report_id, status, note) VALUES ($1, $2, $3)',
            [report_id, status, note]
        );
        res.status(201).json({ message: 'Status update added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Connected Successfully on PORT ${PORT}`);
});