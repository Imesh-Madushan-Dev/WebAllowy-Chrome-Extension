# Web Allowlist Extension Test Cases

This document provides detailed test cases for thoroughly testing the Web Allowlist extension.

## Functional Test Cases

### Installation Tests

| ID     | Test Case            | Steps                                                                                                                    | Expected Result                                          |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| INS-01 | Install on Chrome    | 1. Navigate to chrome://extensions<br>2. Enable Developer Mode<br>3. Click "Load unpacked"<br>4. Select extension folder | Extension appears in toolbar with correct icon           |
| INS-02 | Install on Firefox   | 1. Navigate to about:debugging#/runtime/this-firefox<br>2. Click "Load Temporary Add-on"<br>3. Select manifest.json      | Extension appears in toolbar with correct icon           |
| INS-03 | Verify initial state | 1. Install extension<br>2. Click extension icon                                                                          | Popup shows with default allowlist and filtering enabled |

### Allowlist Management Tests

| ID     | Test Case              | Steps                                                                  | Expected Result                                       |
| ------ | ---------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| ALW-01 | Add site to allowlist  | 1. Enter "example.com" in input field<br>2. Click "Add" button         | Site appears in allowlist                             |
| ALW-02 | Add site with protocol | 1. Enter "https://google.com" in input field<br>2. Click "Add" button  | "google.com" appears in allowlist (protocol stripped) |
| ALW-03 | Add site with path     | 1. Enter "reddit.com/r/news" in input field<br>2. Click "Add" button   | "reddit.com" appears in allowlist (path stripped)     |
| ALW-04 | Add duplicate site     | 1. Add "twitter.com" to allowlist<br>2. Try to add "twitter.com" again | Error message shown, no duplicate added               |
| ALW-05 | Remove site            | 1. Add site to allowlist<br>2. Click "×" button next to site           | Site removed from allowlist                           |
| ALW-06 | Toggle filtering off   | 1. Click toggle switch to disable filtering                            | Toggle shows as off, all sites accessible             |
| ALW-07 | Toggle filtering on    | 1. Click toggle switch to enable filtering                             | Toggle shows as on, non-allowlisted sites blocked     |

### Import/Export Tests

| ID     | Test Case           | Steps                                                                                | Expected Result                          |
| ------ | ------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------- |
| IMP-01 | Export allowlist    | 1. Add several sites to allowlist<br>2. Go to Settings tab<br>3. Click "Export List" | JSON file downloaded with correct data   |
| IMP-02 | Import allowlist    | 1. Click "Import List"<br>2. Select previously exported file                         | Allowlist updated with imported data     |
| IMP-03 | Import invalid file | 1. Click "Import List"<br>2. Select non-JSON file                                    | Error message shown, allowlist unchanged |

### Blocking Tests

| ID     | Test Case                 | Steps                                                                   | Expected Result                                              |
| ------ | ------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| BLK-01 | Access allowed site       | 1. Add "example.com" to allowlist<br>2. Navigate to example.com         | Site loads normally                                          |
| BLK-02 | Access blocked site       | 1. Navigate to a site not in allowlist                                  | Blocked page shown                                           |
| BLK-03 | Add from blocked page     | 1. On blocked page, click "Add to Allowlist"                            | Site added to allowlist and page reloaded                    |
| BLK-04 | Go back from blocked page | 1. On blocked page, click "Go Back"                                     | Browser returns to previous page                             |
| BLK-05 | Subdomain handling        | 1. Add "example.com" to allowlist<br>2. Try to access "sub.example.com" | Behavior consistent with implementation (blocked or allowed) |

## Edge Case Tests

| ID     | Test Case                    | Steps                                                                      | Expected Result                                        |
| ------ | ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| EDG-01 | Special characters in domain | 1. Add domain with special characters<br>2. Verify storage and retrieval   | Domain handled correctly                               |
| EDG-02 | Very long domain name        | 1. Add extremely long domain name<br>2. Verify display and functionality   | Domain handled correctly, UI not broken                |
| EDG-03 | International domain         | 1. Add domain with non-ASCII characters<br>2. Verify storage and retrieval | Domain handled correctly                               |
| EDG-04 | Empty allowlist              | 1. Remove all sites from allowlist<br>2. Try browsing                      | All sites blocked, "No sites added yet" shown in popup |

## Performance Tests

| ID     | Test Case        | Steps                                                          | Expected Result                                   |
| ------ | ---------------- | -------------------------------------------------------------- | ------------------------------------------------- |
| PRF-01 | Large allowlist  | 1. Add 100+ sites to allowlist<br>2. Test browsing performance | Extension remains responsive, no noticeable delay |
| PRF-02 | Popup open speed | 1. Click extension icon                                        | Popup opens within 500ms                          |
| PRF-03 | Memory usage     | 1. Monitor memory usage over time                              | Memory usage remains stable, no leaks             |

## Persistence Tests

| ID     | Test Case                      | Steps                                                                        | Expected Result               |
| ------ | ------------------------------ | ---------------------------------------------------------------------------- | ----------------------------- |
| PER-01 | Settings persist after restart | 1. Configure allowlist<br>2. Close and reopen browser<br>3. Check settings   | All settings preserved        |
| PER-02 | Toggle state persistence       | 1. Set toggle to off<br>2. Close and reopen browser<br>3. Check toggle state | Toggle state preserved as off |

## Browser-Specific Tests

| ID     | Test Case              | Steps                                                              | Expected Result                                            |
| ------ | ---------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| BRW-01 | Chrome private window  | 1. Open Chrome incognito window<br>2. Test extension functionality | Extension works as expected if enabled in incognito        |
| BRW-02 | Firefox private window | 1. Open Firefox private window<br>2. Test extension functionality  | Extension works as expected if enabled in private browsing |

## Test Execution Checklist

Use this checklist to track which tests have been executed:

- [ ] Installation Tests (INS-01 to INS-03)
- [ ] Allowlist Management Tests (ALW-01 to ALW-07)
- [ ] Import/Export Tests (IMP-01 to IMP-03)
- [ ] Blocking Tests (BLK-01 to BLK-05)
- [ ] Edge Case Tests (EDG-01 to EDG-04)
- [ ] Performance Tests (PRF-01 to PRF-03)
- [ ] Persistence Tests (PER-01 to PER-02)
- [ ] Browser-Specific Tests (BRW-01 to BRW-02)

## Reporting Issues

When reporting issues, include:

1. Test case ID (if applicable)
2. Browser name and version
3. Steps to reproduce
4. Expected vs. actual result
5. Screenshots if relevant
6. Console errors if any
