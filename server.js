const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch the current gold rate
app.get('/gold-rate', async (req, res) => {
  try {
    const response = await fetch('https://onlinegoldrates.com/');
    const goldRate = await extractGoldRate(response.text());
    res.json({ goldRate });
  } catch (error) {
    console.error('Error fetching gold rate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to extract gold rate from HTML (replace with your logic)
async function extractGoldRate(html) {
  // Implement logic to parse the HTML and extract the gold rate
  // For simplicity, let's assume the gold rate is hardcoded
  return 50; // Replace with actual logic
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
