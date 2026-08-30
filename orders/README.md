# WebNest — Orders

This folder stores customer order records for all WebNest categories.

## Structure

```text
orders/
├── README.md              ← This file
├── couple/                ← Couple & Love orders (future)
├── birthday/              ← Birthday orders (future)
├── wedding/               ← Wedding orders (future)
├── gift/                  ← Digital Gift orders (future)
├── memory/                ← Memory orders (future)
├── business/              ← Business orders (future)
├── ecommerce/             ← E-commerce orders (future)
└── portfolio/             ← Portfolio orders (future)
```

## Order File Naming

Each order is saved as a markdown file named with the order ID:

```text
WN-CL-EXP-001-2026-001.md
│    │    │    │    │
│    │    │    │    └── Sequential order number
│    │    │    └── Year
│    │    └── Package level
│    └── Category code
└── WebNest prefix
```

## Order File Template

```markdown
# Order: [Order ID]

| Field | Value |
|-------|-------|
| Order ID | WN-CL-EXP-001-2026-001 |
| Demo ID | WN-CL-EXP-001 |
| Category | Couple & Love |
| Package | Expert |
| Order Date | YYYY-MM-DD |
| Status | Pending / In Progress / Delivered |
| Delivery Date | YYYY-MM-DD |

## Customer Information

| Field | Value |
|-------|-------|
| Customer Name | |
| Person 1 Name | |
| Person 2 Name | |
| Occasion | |
| Date | |
| Photos | |
| Story | |
| Timeline | |
| Messages | |
| Theme Preference | |
| Music Preference | |
| Special Requirements | |

## Delivery Checklist

- [ ] Template loaded from Demo ID
- [ ] Customer content approved
- [ ] Photos received and optimized
- [ ] All pages customized
- [ ] Navigation tested
- [ ] Mobile responsive tested
- [ ] Animations tested
- [ ] No console errors
- [ ] No broken links
- [ ] Final review complete
- [ ] Delivered to customer
```

## Rules

1. Every order MUST reference a valid Demo ID.
2. The Demo ID determines the exact template, pages, features and pricing.
3. Do not upgrade or downgrade the package without explicit customer request and separate quote.
4. Preserve the template design — only replace content and assets.
5. Save order files in the appropriate category subfolder.

## Status Values

| Status | Meaning |
|--------|---------|
| Pending | Order received, not yet started |
| In Progress | Active development |
| Review | Ready for customer review |
| Delivered | Customer has received final product |
| Completed | Customer approved, no further changes |

---

*WebNest — Websites Made to Be Remembered.*
