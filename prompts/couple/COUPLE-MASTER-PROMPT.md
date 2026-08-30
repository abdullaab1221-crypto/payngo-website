

# WEBNEST COUPLE & LOVE — MASTER TEMPLATE PROMPT

> **Master Prompt + Demo ID + Client Information = Customer Website**
>
> This is the permanent master template specification for all WebNest **Couple & Love** orders.
> Do NOT create a completely new design for every customer. Reuse the exact template that matches the Demo ID.

---

## 1. PRODUCT FAMILY

All Couple & Love packages belong to ONE design family.

Customers must recognise that **Basic → Moderate → Expert** are different levels of the same premium product.

| Level | Demo ID | Package | Pages | Photos | Starting Price |
|-------|---------|---------|-------|--------|----------------|
| 1 | `WN-CL-BAS-001` | Basic | 3 | Up to 5 | Rs. 1,500+ |
| 2 | `WN-CL-MOD-001` | Moderate | 5 | Up to 10 | Rs. 3,000+ |
| 3 | `WN-CL-EXP-001` | Expert | 8 | Up to 20 | Rs. 5,000+ |

Prices are **starting prices**. Extra custom requirements are quoted separately.

### 1.1 Basic — `WN-CL-BAS-001`
- 3 pages: Home, Our Story, Memories
- Up to 5 photos
- Basic animations
- Premium responsive design
- Romantic hero section
- Story section
- Photo gallery
- Basic navigation
- Basic customization

### 1.2 Moderate — `WN-CL-MOD-001`
- 5 pages: Home, Our Story, Timeline, Memories, Final Message
- Up to 10 photos
- More advanced animations
- Premium navigation
- Romantic hero
- Story section
- Timeline / milestones
- Photo gallery
- Additional romantic sections
- Better visual effects
- Responsive design

### 1.3 Expert — `WN-CL-EXP-001`
- 8 pages: Home, Our Story, Timeline, Memories, Photo Gallery, Special Moments, Messages, Final Surprise
- Up to 20 photos
- Advanced animations
- Premium transitions
- Large photo gallery
- Timeline / milestones
- Multiple romantic sections
- Advanced storytelling
- Premium visual effects
- Responsive design
- Maximum customization within the template

---

## 2. DEMO ID IS THE SOURCE OF TRUTH

The Demo ID determines the exact template and package.

| Demo ID | Means |
|---------|-------|
| `WN-CL-BAS-001` | Couple & Love → Basic → exact Basic template |
| `WN-CL-MOD-001` | Couple & Love → Moderate → exact Moderate template |
| `WN-CL-EXP-001` | Couple & Love → Expert → exact Expert template |

### 2.1 Demo record / metadata locations

- `demos/couple/WN-CL-BAS-001/README.md`
- `demos/couple/WN-CL-MOD-001/README.md`
- `demos/couple/WN-CL-EXP-001/README.md`

### 2.2 Template source locations

- Basic: `demos/couple/WN-CL-BAS-001/`
- Moderate: `demos/couple/WN-CL-MOD-001/`
- Expert: `demos/couple/WN-CL-EXP-001/`
- Shared family assets: `demos/couple/shared/` (CSS/JS shared across all three levels — do not delete)

---

## 3. ORDER FULFILLMENT WORKFLOW

When a customer order arrives with a Demo ID:

1. **Identify** the exact template from the Demo ID (see Section 2).
2. **Load** the corresponding package specification and the template files.
3. **Preserve** the template's design, pages, animations, navigation and functionality.
4. **Replace only** the customer's approved content and assets.
5. **Apply only** explicitly requested custom upgrades.
6. **Do not** accidentally downgrade or upgrade the package.

### 3.1 Example future order

```text
Demo ID: WN-CL-EXP-001

Client Name: Muhammad
Person 1: Muhammad
Person 2: Ayesha
Photos: 20
Date: 14 February
Story: [client story]
Messages: [client messages]
Theme: Romantic dark
Special Requirements: None
```

The agent uses the exact Expert template and replaces the demo content with the client's approved information.

---

## 4. CUSTOMER CUSTOMIZATION SYSTEM

The templates are built so the following information can be replaced easily without changing the design:

```text
Demo ID:
Package:
Customer Name:
Person 1 Name:
Person 2 Name:
Occasion:
Date:
Photos:
Story:
Timeline:
Messages:
Theme Preference:
Music Preference:
Special Requirements:
```

### 4.1 Where content lives in the template

| Field | Location in template |
|-------|----------------------|
| Person 1 / Person 2 names | Hero, footer, story headings |
| Occasion | Hero tagline, page titles |
| Date | Hero, countdown/labels |
| Photos | `memories.html`, `gallery.html`, `moments.html` (`<img>` + captions) |
| Story | `story.html` story paragraphs |
| Timeline | `timeline.html` timeline items |
| Messages | `message.html` / `messages.html` cards |
| Theme / Music / Special | Config section of `js` files (theme colors) + optional music toggle |

---

## 5. DESIGN FAMILY — SHARED LOOK & FEEL

- **Theme:** Premium romantic dark (deep plum-black background, rose/crimson + gold accents, cream text).
- **Fonts:** `Great Vibes` (script for names), `Playfair Display` (serif headings), `Inter` (body).
- **Signature elements:** animated floating hearts, soft glow gradients, ornamental heart dividers, elegant reveal-on-scroll, premium hover transitions.
- **Navigation:** sticky glass header + mobile burger menu on every page.
- **Responsive:** desktop, tablet, mobile all fully supported.
- **Level differentiation:** higher packages add pages, sections, photos, animations and interactive features — the base look stays identical.

---

## 6. RULES

### 6.1 DO
- Reuse the shared family styles (`demos/couple/shared/`) and existing WebNest design language.
- Keep demos fully responsive.
- Use fictional/sample content only (demo couple: **Alex & Mia**).
- Show the demo notice where appropriate:
  `Demo Preview — Your names, photos and content will be replaced after ordering.`

### 6.2 DO NOT
- Redesign the template, remove pages, remove animations, or change navigation for an order unless explicitly purchased.
- Expose source code, ZIP downloads, or private data in public demos.
- Use real people's private photos or personal information.
- Build other categories (Birthday, Wedding, Digital Gifts, Memories, Business, E-commerce, Portfolio) from this prompt yet.

### 6.3 Customization boundaries
- The customer receives essentially **the same website they saw in the Live Demo**, customized with their own approved content.
- Any extra page, feature, or design change beyond the package scope is a **separate quote**.

---

## 7. QUALITY CONTROL (run before every delivery)

- Test all navigation on every page.
- Test every page, mobile + desktop.
- Test animations, galleries and buttons.
- Verify no console errors, no broken links, no missing images.
- Verify no source/download functionality is exposed.
- Verify the correct Demo ID's exact template is used (no accidental level change).

---

## 8. DEMO CONTENT (fictional)

| Field | Value |
|-------|-------|
| Demo couple | Alex & Mia |
| Demo occasion | Our Love Story / Anniversary |
| Demo date | 14 February |
| Demo city | Karachi |
| Note | All names, photos, dates and stories are fictional placeholders. |

---

*WebNest — Websites Made to Be Remembered.*
