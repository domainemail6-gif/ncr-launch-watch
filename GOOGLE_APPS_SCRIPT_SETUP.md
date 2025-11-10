# Google Apps Script Setup Guide for NCR Launch Watch

This guide will help you set up Google Apps Script to automatically save form submissions to a Google Sheet.

## Step-by-Step Instructions

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "NCR Launch Watch Leads" (or any name you prefer)
4. In the first row (Row 1), add these column headers:
   - **A1**: Timestamp
   - **B1**: Full Name
   - **C1**: Email
   - **D1**: Phone
   - **E1**: Role
   - **F1**: Terms Accepted

### Step 2: Get Your Sheet ID

1. Look at the URL of your Google Sheet
2. The URL will look like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Copy the `SHEET_ID_HERE` part (the long string of letters, numbers, and dashes)
4. Keep this handy - you'll need it in the next step

### Step 3: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"** (or the **"+"** button)
3. Delete all the default code in the editor
4. Open the file `google-apps-script.js` from your project folder
5. Copy the entire contents of `google-apps-script.js`
6. Paste it into the Google Apps Script editor
7. Find this line near the top:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE';
   ```
8. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID from Step 2
9. If your sheet tab is not named "Sheet1", change this line:
   ```javascript
   const SHEET_NAME = 'Sheet1';
   ```
   to match your sheet tab name

### Step 4: Deploy as Web App

1. In Google Apps Script, click **"Deploy"** in the top right
2. Click **"New deployment"**
3. Click the gear icon (⚙️) next to "Select type"
4. Choose **"Web app"**
5. Fill in the deployment settings:
   - **Description**: "NCR Launch Watch Form Handler"
   - **Execute as**: Select **"Me"**
   - **Who has access**: Select **"Anyone"** (this allows your website to submit data)
6. Click **"Deploy"**
7. You may be asked to authorize the script:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** > **"Go to [Project Name] (unsafe)"**
   - Click **"Allow"**
8. After deployment, you'll see a **Web App URL**
9. **Copy this URL** - you'll need it in the next step

### Step 5: Add the URL to Your Website

1. Open `index.html` in your project
2. Find this section near the bottom (before `</body>`):
   ```html
   <script>
       window.GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   </script>
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with the Web App URL you copied in Step 4
4. Save the file

### Step 6: Test It!

1. Open your website in a browser
2. Click the "Subscribe" button
3. Fill out the form and submit it
4. Go back to your Google Sheet
5. You should see the new lead appear in the next row!

## Troubleshooting

### Form submissions aren't appearing in the sheet

1. **Check the Sheet ID**: Make sure you copied the correct Sheet ID
2. **Check the Sheet Name**: Make sure the `SHEET_NAME` matches your sheet tab name exactly
3. **Check the Web App URL**: Make sure you pasted the correct URL in `index.html`
4. **Check browser console**: Open browser DevTools (F12) and check the Console tab for any errors
5. **Check Google Apps Script logs**: In Google Apps Script, go to "Executions" to see if there are any errors

### Getting CORS errors

- The code uses `mode: 'no-cors'` which should prevent CORS issues
- If you still see errors, make sure the Web App deployment has "Who has access" set to "Anyone"

### Need to update the script

- If you make changes to the Google Apps Script code, you need to:
  1. Save the changes
  2. Go to "Deploy" > "Manage deployments"
  3. Click the edit icon (pencil) next to your deployment
  4. Click "New version"
  5. Click "Deploy"

## What Data Gets Saved?

Each form submission saves:
- **Timestamp**: When the form was submitted
- **Full Name**: The subscriber's name
- **Email**: The subscriber's email address
- **Phone**: The subscriber's phone number (if provided)
- **Role**: Selected role (investor, end-user, or professional)
- **Terms Accepted**: Whether they agreed to the terms (Yes/No)

## Security Note

The Web App URL is public, but it only accepts POST requests with the correct data format. However, anyone with the URL could potentially submit data. For production use, consider adding additional validation or authentication.

