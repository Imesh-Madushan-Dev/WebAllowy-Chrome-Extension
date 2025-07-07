# Web Allowlist Extension Deployment Guide

This guide provides instructions for packaging and publishing the Web Allowlist extension to various browser extension stores.

## Preparing for Deployment

Before submitting your extension to any store, complete these preparation steps:

1. **Final Testing**:

   - Complete all test cases in `TEST_CASES.md`
   - Test on all target browsers
   - Fix any identified issues

2. **Version Management**:

   - Update the version number in `manifest.json`
   - Follow semantic versioning (MAJOR.MINOR.PATCH)
   - Document changes in a changelog

3. **Code Cleanup**:

   - Remove any console.log statements
   - Minify JavaScript and CSS files (optional but recommended)
   - Ensure code is well-commented

4. **Assets Preparation**:
   - Ensure all icon sizes are properly created (16x16, 48x48, 128x128)
   - Prepare promotional images for store listings
   - Write compelling store descriptions

## Creating the Package

1. **Create a ZIP file** containing all necessary extension files:

   ```
   zip -r web-allowlist.zip * -x "*.git*" -x "*.DS_Store" -x "node_modules/*"
   ```

2. **Verify the package**:
   - Ensure the ZIP file contains all required files
   - Test installing the ZIP file directly in your browser
   - Check that all functionality works as expected

## Publishing to Chrome Web Store

1. **Create a Developer Account**:

   - Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Sign up and pay the one-time registration fee ($5)

2. **Create a New Item**:

   - Click "New Item" in the dashboard
   - Upload your ZIP file
   - Wait for the upload to complete

3. **Complete Store Listing**:

   - **Store Listing Tab**:

     - Add extension name
     - Write detailed description
     - Upload screenshots (1280x800 or 640x400)
     - Upload promotional images (optional)
     - Add YouTube video (optional)
     - Select category (Productivity)
     - Add relevant search terms

   - **Privacy Tab**:

     - Declare permissions usage
     - Provide privacy policy URL or text

   - **Content Rating Tab**:
     - Complete content rating questionnaire

4. **Submit for Review**:
   - Click "Submit for Review"
   - Pay the developer fee if not already paid
   - Wait for the review process (typically 1-3 business days)

## Publishing to Firefox Add-ons (AMO)

1. **Create a Developer Account**:

   - Go to [Firefox Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/)
   - Sign up for an account

2. **Submit a New Add-on**:

   - Click "Submit a New Add-on"
   - Choose "On this site" for hosting
   - Upload your ZIP file

3. **Complete Submission Form**:

   - Add basic information (name, summary, description)
   - Select category
   - Add version notes
   - Upload screenshots (1280x800 recommended)
   - Add icon (128x128)
   - Select license
   - Provide a privacy policy

4. **Submit for Review**:
   - Click "Submit Version"
   - Wait for the review process (typically 1-2 weeks)

## Publishing to Microsoft Edge Add-ons

1. **Create a Developer Account**:

   - Go to [Microsoft Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/)
   - Sign up for an account

2. **Create a New Extension**:

   - Navigate to "Microsoft Edge Add-ons"
   - Click "Create new extension"
   - Fill in product details
   - Upload your ZIP file

3. **Complete Store Listing**:

   - Add extension name and description
   - Upload screenshots
   - Select category
   - Provide privacy policy
   - Set distribution and pricing options

4. **Submit for Review**:
   - Click "Submit for review"
   - Wait for the review process (typically 3-5 business days)

## Post-Deployment Tasks

1. **Monitor Reviews and Ratings**:

   - Respond to user feedback
   - Address common issues in updates

2. **Track Usage Metrics**:

   - Monitor installation numbers
   - Track active users

3. **Plan Future Updates**:
   - Collect feature requests
   - Prioritize bug fixes
   - Schedule regular updates

## Update Process

When releasing updates:

1. **Increment Version Number** in `manifest.json`

2. **Create a New ZIP Package**

3. **Upload to Each Store**:

   - Chrome Web Store: Upload new package in the developer dashboard
   - Firefox AMO: Submit a new version
   - Microsoft Edge Add-ons: Upload a new package

4. **Update Changelogs** in each store

5. **Submit for Review** again (each store has its own review process)

## Troubleshooting Common Deployment Issues

1. **Rejection Due to Permissions**:

   - Justify each permission in your store listing
   - Remove unnecessary permissions

2. **Manifest Version Compatibility**:

   - Ensure manifest version is compatible with target browsers
   - Check browser-specific API requirements

3. **Review Process Delays**:

   - Be patient, review times vary
   - Avoid resubmitting unless requested

4. **Content Policy Violations**:
   - Review each store's content policies
   - Ensure compliance before submission
