const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Vite build output from dist
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback for SPA/MPA routes
app.get('*', (req, res) => {
    // Basic fallback to index, though Vite MPA handles this better explicitly
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
