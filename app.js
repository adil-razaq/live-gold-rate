const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Shopify = require('shopify-api-node');

const app = express();
const PORT = process.env.PORT || 3000;

const shopify = new Shopify({
  shopName: 'al-jazeera-qurrum',
  apiKey: 'cc834592045b656ca9f0529229ac3223',
  password: '19c0cb7eb88398060e85d9bde681fe1c',
});

app.get('/updateGoldPrice', async (req, res) => {
  try {
    const response = await axios.get('https://onlinegoldrates.com/');
    const goldPrice = extractGoldPrice(response.data);

    // Update the product or store metadata with the new gold price
    const products = await shopify.product.list();
    const productId = products[0].id; // Replace with the actual product ID
    await shopify.product.update(productId, { metafields: [{ key: 'gold_price', value: goldPrice }] });

    res.status(200).json({ success: true, goldPrice });
  } catch (error) {
    console.error('Error updating Shopify store:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

function extractGoldPrice(html) {
  const $ = cheerio.load(html);
  // Implement logic to extract gold price from the HTML
  // For simplicity, let's assume you find the gold price in a specific HTML element
  const goldPrice = $('.gold-price').text(); // Replace with the actual selector
  return goldPrice.trim();
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
