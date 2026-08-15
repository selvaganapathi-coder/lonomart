# Editor Architecture

The editor will manipulate structured website data rather than a free-form pixel canvas.

Conceptual flow:

```text
Page → Section Instance → Section Schema → Structured Content
```

The editor and public renderer remain separate concerns.

Initial editor capabilities are expected to include text editing, image replacement, links/buttons, section visibility, section ordering, page metadata, and basic theme controls.

Advanced drag-and-drop, arbitrary positioning, custom CSS/JavaScript, and complex responsive controls remain outside the MVP.
