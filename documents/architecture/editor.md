# Editor Architecture

The editor will manipulate structured website data rather than a free-form pixel canvas.

## Current structure

```text
Website
  ↓
WebsitePage
  ↓
WebsiteSection
  ↓
Section type + version + structured JSON content
```

Template definitions are versioned code-managed masters. Website creation instantiates those definitions into customer-owned page and section records.

## Editor boundary

The future editor should edit:

- page title and metadata
- section content
- section visibility
- section ordering
- button/link fields
- image references
- basic theme settings

It must not edit the template master definition directly.

## Renderer boundary

The editor and public renderer remain separate concerns.

The editor writes structured data. The public renderer reads the published website structure. Editor-only components must not become dependencies of public websites.

## MVP constraints

Initial editor capabilities are expected to include text editing, image replacement, links/buttons, section visibility, section ordering, page metadata, and basic theme controls.

Advanced drag-and-drop, arbitrary positioning, custom CSS/JavaScript, and complex responsive controls remain outside the MVP.
