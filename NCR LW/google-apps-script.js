/**
 * Google Apps Script for NCR Launch Watch Form Submissions
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://script.google.com/
 * 2. Click "New Project"
 * 3. Delete the default code and paste this entire file
 * 4. Create a Google Sheet where you want to store the leads:
 *    - Go to https://sheets.google.com/
 *    - Create a new spreadsheet
 *    - Name it "NCR Launch Watch Leads" (or any name you prefer)
 *    - In the first row, add these headers: Timestamp, Full Name, Email, Phone, Role, Terms Accepted
 * 5. Get your Google Sheet ID from the URL:
 *    - The URL looks like: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
 *    - Copy the SHEET_ID_HERE part
 * 6. Replace 'YOUR_SHEET_ID_HERE' below with your actual Sheet ID
 * 7. Replace 'Sheet1' with your sheet name if different
 * 8. Click "Deploy" > "New deployment"
 * 9. Click the gear icon (⚙️) next to "Select type" and choose "Web app"
 * 10. Set:
 *     - Description: "NCR Launch Watch Form Handler"
 *     - Execute as: "Me"
 *     - Who has access: "Anyone" (this allows your website to submit data)
 * 11. Click "Deploy"
 * 12. Copy the Web App URL that appears
 * 13. Paste that URL in your index.html file where it says:
 *     window.GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 * 
 * That's it! Every form submission will now be saved to your Google Sheet.
 */

// REPLACE THIS WITH YOUR GOOGLE SHEET ID
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name

/**
 * Handle GET requests (when someone accesses the URL directly)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('NCR Launch Watch Form Handler - Use POST to submit data')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Main function to handle POST requests from the form
 */
function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.role || '',
      data.terms || 'No'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Lead saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - you can run this manually to test the script
 * Make sure to set up the SHEET_ID first
 */
function testSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    role: 'investor',
    terms: 'Yes'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

