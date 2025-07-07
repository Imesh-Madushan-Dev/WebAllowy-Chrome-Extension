# Web Allowlist Extension - Quick Start Guide

This guide will help you get started with the Web Allowlist extension quickly and efficiently.

## Installation

### Chrome, Edge, or Brave

1. Download this extension folder to your computer
2. Open your browser and type `chrome://extensions/` in the address bar (or `edge://extensions/` for Edge, `brave://extensions/` for Brave)
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your browser toolbar

### Firefox

1. Download this extension folder to your computer
2. Open Firefox and type `about:debugging#/runtime/this-firefox` in the address bar
3. Click "Load Temporary Add-on..."
4. Navigate to the extension folder and select any file (like manifest.json)
5. The extension icon should appear in your browser toolbar

## Initial Setup

1. Click on the extension icon in your toolbar to open the popup
2. By default, the extension comes with two allowed sites: `example.com` and `google.com`
3. The filtering is enabled by default (toggle switch is ON)

## Adding Websites to Your Allowlist

### Method 1: From the Extension Popup

1. Click on the extension icon to open the popup
2. Enter a domain name in the input field (e.g., `github.com`)
3. Click "Add" or press Enter
4. The site will appear in your allowlist

### Method 2: From a Blocked Page

1. When you try to access a blocked website, you'll see a blocking page
2. Click "Add to Allowlist" to add the site and be redirected to it

## Managing Your Allowlist

### Removing Websites

1. Click on the extension icon to open the popup
2. Find the website you want to remove in the list
3. Click the "×" button next to it

### Enabling/Disabling Filtering

- To temporarily disable filtering and access all websites:
  - Click on the extension icon
  - Turn OFF the toggle switch at the top
- To re-enable filtering:
  - Click on the extension icon
  - Turn ON the toggle switch

## Backing Up Your Allowlist

### Exporting Your Allowlist

1. Click on the extension icon to open the popup
2. Go to the "Settings" tab
3. Click "Export List"
4. Save the JSON file to your computer

### Importing Your Allowlist

1. Click on the extension icon to open the popup
2. Go to the "Settings" tab
3. Click "Import List"
4. Select your previously exported JSON file

## Tips for Effective Use

1. **Start with Essential Sites**: Begin by adding only your most frequently used websites to the allowlist.

2. **Use Domain Names Only**: When adding sites, use just the domain name (e.g., `example.com`) without `http://`, `https://`, or paths.

3. **Temporary Access**: If you need temporary access to a site, consider temporarily disabling filtering rather than adding the site to your allowlist.

4. **Regular Backups**: Export your allowlist regularly to avoid losing your configuration.

5. **Testing Mode**: Before fully committing to using the extension, test it with a few sites to understand how it works.

## Troubleshooting

- **Extension Not Blocking Sites**: Make sure filtering is enabled (toggle is ON).

- **Can't Access Allowed Sites**: Check that you've added the correct domain name to your allowlist.

- **Popup Not Opening**: Try reloading the extension from the extensions page.

- **Changes Not Saving**: Ensure your browser isn't in incognito/private mode, as some browsers limit storage in private browsing.

## Getting Help

If you encounter any issues or have questions, please:

1. Check the README.md file for more detailed information
2. Look at the BUILD_AND_TEST.md file for troubleshooting tips
3. Submit an issue on the project's GitHub repository
