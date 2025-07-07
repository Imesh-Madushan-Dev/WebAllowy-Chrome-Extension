# Web Allowlist Extension

A browser extension that controls web access by only allowing traffic to explicitly permitted websites, blocking all others.

![image](https://github.com/user-attachments/assets/ef354ce6-3612-437c-9032-96fed173ace0)

## Features

- **Strict Website Filtering**: Only allows access to websites that are explicitly added to your allowlist.
- **Easy Management**: Simple interface to add, remove, and manage allowed websites.
- **Custom Blocking Page**: Shows a user-friendly page when blocked sites are accessed.
- **Import/Export**: Backup and restore your allowlist settings.
- **Toggle Control**: Easily enable or disable filtering with a single click.

## Installation

### Chrome/Edge/Brave (Chromium-based browsers)

1. Download or clone this repository
2. Open your browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" (usually a toggle in the top-right corner)
4. Click "Load unpacked" and select the folder containing this extension
5. The extension should now be installed and active

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Navigate to the folder containing this extension and select any file (e.g., manifest.json)
5. The extension should now be installed temporarily (will be removed when Firefox is closed)

## Usage

### Adding Websites to Allowlist

1. Click on the extension icon in your browser toolbar
2. Enter a domain name (e.g., `example.com`) in the input field
3. Click "Add" or press Enter
4. The website will now be allowed

### Removing Websites from Allowlist

1. Click on the extension icon in your browser toolbar
2. Find the website you want to remove in the list
3. Click the "×" button next to the website
4. The website will now be blocked

### Enabling/Disabling Filtering

- Toggle the switch at the top of the popup to enable or disable filtering
- When disabled, all websites will be accessible
- When enabled, only websites in your allowlist will be accessible

### Import/Export Settings

1. Click on the "Settings" tab in the extension popup
2. To export: Click "Export List" and save the JSON file
3. To import: Click "Import List" and select a previously exported JSON file

## When Accessing Blocked Websites

When you try to access a website that's not in your allowlist:

1. You'll see a blocking page with information about why the site was blocked
2. You can choose to:
   - Add the site to your allowlist directly from this page
   - Go back to the previous page

## Technical Details

This extension uses the following browser APIs:

- `chrome.storage.local`: For storing the allowlist and settings
- `chrome.webRequest`: For intercepting web requests
- `chrome.runtime`: For background processing

## Privacy

This extension:

- Does not collect any user data
- Does not send any information to remote servers
- All data is stored locally in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
