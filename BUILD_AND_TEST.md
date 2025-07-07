# Building and Testing the Web Allowlist Extension

This guide will walk you through the process of building, installing, and testing the Web Allowlist extension in different browsers.

## Prerequisites

- Basic understanding of web development
- A modern web browser (Chrome, Firefox, Edge, or Brave)
- Text editor for making any code changes

## Building the Extension

The Web Allowlist extension doesn't require a build step as it's built using standard web technologies (HTML, CSS, and JavaScript). However, you'll need to make sure all files are in place:

1. Verify that you have the following files in your project directory:

   - `manifest.json`
   - `background.js`
   - `popup.html`
   - `popup.js`
   - `styles.css`
   - `blocked.html`
   - `LICENSE`
   - `README.md`
   - `icons/icon16.png`
   - `icons/icon48.png`
   - `icons/icon128.png`

2. If you want to modify the extension:
   - Edit the HTML, CSS, or JavaScript files as needed
   - Make sure to test your changes after each significant modification

## Installing for Testing

### Chrome / Edge / Brave (Chromium-based browsers)

1. Open your browser and navigate to the extensions page:

   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. Enable "Developer mode" (usually a toggle in the top-right corner)

3. Click "Load unpacked" and select the folder containing your extension files

4. The extension should now appear in your browser toolbar

### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`

2. Click "Load Temporary Add-on..."

3. Navigate to your extension directory and select the `manifest.json` file

4. The extension will be installed temporarily (until Firefox is closed)

## Testing the Extension

### Basic Functionality Testing

1. **Test the Toggle**:

   - Click on the extension icon to open the popup
   - Toggle the filtering on and off
   - Verify that websites are blocked when filtering is on and accessible when filtering is off

2. **Adding Sites**:

   - Add several websites to your allowlist (e.g., `example.com`, `google.com`)
   - Try different formats (with/without www, with/without https://)
   - Verify that the sites appear in the list

3. **Removing Sites**:

   - Remove some sites from your allowlist
   - Verify that they disappear from the list
   - Try to access them and confirm they're blocked

4. **Import/Export**:
   - Export your allowlist to a JSON file
   - Clear your allowlist or add/remove some sites
   - Import the previously exported file
   - Verify that your allowlist is restored correctly

### Blocking Functionality Testing

1. **Blocked Sites**:

   - Try to access a website that's not in your allowlist
   - Verify that you see the blocked page
   - Check that the URL is displayed correctly on the blocked page

2. **Adding from Blocked Page**:

   - From the blocked page, click "Add to Allowlist"
   - Verify that you're redirected to the site
   - Check that the site has been added to your allowlist

3. **Going Back**:
   - From a blocked page, click "Go Back"
   - Verify that you return to the previous page

### Edge Cases Testing

1. **Subdomains**:

   - Add a domain like `example.com` to your allowlist
   - Try accessing subdomains like `subdomain.example.com`
   - Verify behavior is as expected

2. **Different Protocols**:

   - Test both HTTP and HTTPS versions of allowed sites
   - Verify both work correctly

3. **Special Characters**:
   - Try adding domains with special characters or international domains
   - Verify they're handled correctly

## Debugging

If you encounter issues:

1. Check the browser's developer console for errors:

   - Right-click on the page > Inspect > Console
   - Or press F12 and navigate to the Console tab

2. For background script issues:

   - Go to the extensions page
   - Find your extension
   - Click on "background page" or "service worker" link (if available)
   - Check the console for errors

3. Inspect storage:
   - In Chrome, go to `chrome://extensions/`
   - Enable Developer Mode
   - Click on "background page" for your extension
   - Go to Application tab > Storage > Local Storage
   - You can see and modify the stored data

## Packaging the Extension

### For Chrome Web Store

1. Create a ZIP file containing all extension files
2. Make sure not to include any unnecessary files (like `.git` folders)
3. Follow the Chrome Web Store publishing guidelines

### For Firefox Add-ons

1. Create a ZIP file containing all extension files
2. Submit to the Firefox Add-ons store following their guidelines

## Troubleshooting Common Issues

1. **Extension not working after installation**:

   - Check for console errors
   - Verify that all files are in the correct location
   - Try reloading the extension

2. **Blocking not working**:

   - Ensure filtering is enabled
   - Check that the site isn't already in your allowlist
   - Verify that the background script is running

3. **Changes not saving**:

   - Check for storage permission errors
   - Verify that chrome.storage.local is working correctly

4. **Popup not displaying correctly**:
   - Check for CSS issues
   - Verify that all files are being loaded correctly
