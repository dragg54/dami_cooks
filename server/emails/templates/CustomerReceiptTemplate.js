// templates/receiptTemplate.js

import { format } from "date-fns";
import path from "path"
import { fileURLToPath } from "url";
import fs from "fs"

export const getLogoBase64 = () => {
   const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const logoPath = path.join(__dirname, "../../logo.png")
  const imageBuffer = fs.readFileSync(logoPath);
  return imageBuffer.toString('base64');
};

export const generateReceiptHTML = (order) => {

  const receiptNumber = 'N/A'
  const date = new Date()
  const formattedDate = format(date, "dd MMM, yyyy HH:mm")
  const customerName = order.user.firstName + " " + order.user.lastName
  const storeAddress = ''
  const taxRate = 0
  const discount = 0
  const shippingFee = order.shipping?.deliveryFee || 0;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const logoPath = path.join(__dirname, "../../logo.png")
  const logoSrc = "C:/Users/HP 840 G5/personal_projects/dami_cooks/server/logo.png"

  // Calculate totals
  const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.item.price), 0);
  const tax = subtotal * (taxRate / 100);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + shippingFee + tax - discountAmount;

  const itemsRows = order
    .orderItems
    .map(
      (item) =>
        `<tr>
          <td>${item.item.name}</td>
          <td style="text-align: left;">${item.quantity}</td>
          <td style="text-align: left;">£${parseFloat(item.item.price).toFixed(2)}</td>
          <td style="text-align: left;">£${(item.quantity * item.item.price).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #000;
        padding: 30px;
        background: #fff;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .receipt-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #fff;
        padding-bottom: 20px;
      }
      
      .receipt-header h1 {
        font-size: 28px;
        margin-bottom: 8px;
        color: #fff;
      }
      
      .receipt-header p {
        font-size: 12px;
        color: #666;
        margin: 4px 0;
      }
      
      .receipt-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 20px;
        font-size: 13px;
      }
      
      .receipt-info div {
        flex: 1;
      }
      
      .receipt-info strong {
        color: #000;
      }
      
      h2 {
        text-align: center;
        font-size: 20px;
        margin: 20px 0;
        color: #000;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 13px;
      }
      
      th, td {
        border: 1px solid #ddd;
        padding: 12px 8px;
        text-align: left;
      }
      
      th {
        background-color: #f36870;
        font-weight: 600;
        color: #000;
        text-transform: uppercase;
        font-size: 12px;
      }
      
      tr:nth-child(even) {
        background-color: #fafafa;
      }
      
      .totals-section {
        margin-top: 20px;
        border-top: 2px solid #000;
        padding-top: 15px;
      }
      
      .totals-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 14px;
      }
      
      .totals-row.grand-total {
        font-size: 18px;
        font-weight: bold;
        border-top: 2px solid #000;
        margin-top: 10px;
        padding-top: 15px;
        color: #000;
      }
      
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #666;
        border-top: 1px dashed #ccc;
        padding-top: 20px;
      }
      .logo-container {
        margin-bottom: 15px;
        display: "flex";
        flex-gap: "2px";
        align-items: "center;
      }
      
      .logo {
        max-width: 200px;
        max-height: 100px;
        width: auto;
        height: auto;
      }
      .footer p {
        margin: 5px 0;
      }
      
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
      
      @page {
        margin: 20px;
      }
    </style>
  </head>
  <body>
    <div class="receipt-header">
      <div style="display:flex; flex-gap:2px">
       <div class="logo-container">
        <img src="data:image/png;base64,${getLogoBase64()}" alt="Logo" class="logo" />
        </div>
       <h1 style="font-size: 32px">Dami Cooks</h1>
      </div>
      ${storeAddress ? `<p>${storeAddress}</p>` : ''}
      <p style="font-size: 36px; color: #f36870; font-weight:700">Receipt</p>
    </div>
    
    <div class="receipt-info">
      <div style="dsiplay: flex; flex-direction: column; align-items: flex-start">
        <p><strong>Receipt #:</strong> ${receiptNumber}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
      </div>
      <div style="text-align: right;">
        <p><strong>Customer:</strong> ${customerName}</p>
      </div>
    </div>
    
    <h2>Order Details</h2>
    
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th style="text-align: left; width: 80px;">quantity</th>
          <th style="text-align: left; width: 100px;">Price</th>
          <th style="text-align: left; width: 100px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>
    
    <div class="totals-section">
      <div class="totals-row">
        <span>Subtotal:</span>
        <span>£${subtotal.toFixed(2)}</span>
      </div>
      ${taxRate > 0 ? `
      <div class="totals-row">
        <span>Tax (${taxRate}):</span>
        <span>£${tax.toFixed(2)}</span>
      </div>` : ''}
       ${shippingFee > 0 ? `
      <div class="totals-row">
        <span>Shipping (${shippingFee}):</span>
        <span>£${shippingFee.toFixed(2)}</span>
      </div>` : ''}
      <div class="totals-row grand-total">
        <span>TOTAL:</span>
        <span>£${total.toFixed(2)}</span>
      </div>
    </div>
    
    <div class="footer">
      <p>Thank you for your purchase!</p>
      <p>For inquiries, please contact us</p>
    </div>
  </body>
</html>
  `;
};

// Usage example:
/*
const order = [
  { name: 'Product A', quantity: 2, price: 50.00 },
  { name: 'Product B', quantity: 1, price: 30.00 },
  { name: 'Product C', quantity: 3, price: 15.50 }
];

const orderDetails = {
  receiptNumber: 'REC-2024-001',
  date: '2024-01-22',
  customerName: 'John Doe',
  storeName: 'My Store',
  storeAddress: '123 Main St, Lagos, Nigeria',
  taxRate: 7.5,  // 7.5 tax
  discount: 10    // 10 discount
};

const html = generateReceiptHTML(order, orderDetails);
*/