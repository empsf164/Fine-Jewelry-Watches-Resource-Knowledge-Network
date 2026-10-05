# AURELIS — Fine Jewelry & Watches Resource & Knowledge Network

> **“Understand What You Wear. Know What You Own.”**

AURELIS is a luxury editorial knowledge network and technical documentation platform dedicated to fine jewelry, luxury horology, gemological grading, precious metals, and collector preservation.

---

## 🏛️ Brand & Architectural Direction

AURELIS combines:
1. **Luxury Editorial Publication:** Refined serif headlines (Cormorant Garamond), balanced typography (Inter / Plus Jakarta Sans), monospace technical readouts (JetBrains Mono), and restrained bronze/gold accents.
2. **Technical Knowledge Base:** Structured taxonomy spanning Fine Jewelry, Watches, Gemstones, Precious Metals, Movements, and Care.
3. **Downloadable Resource Hub:** Field checklists, vector-calibrated ring sizing charts, hallmark identification sheets, and daily timekeeping accuracy logs.
4. **Interactive Learning Platform:** 4K video masterclasses with interactive chapter jumping, transcripts, and reading progress bars.
5. **Specialist Community Network:** Peer discussions, thread upvoting, and responses moderated for collectors and artisans.

---

## 📁 File & Directory Architecture

```
aurelis-knowledge/
│
├── index.html                   # Luxury Editorial Homepage
├── explore.html                 # Knowledge Discovery & Multi-Faceted Search Engine
├── knowledge.html               # Structured Knowledge Base (Jewelry, Watches, Gemstones, Metallurgy, Movements)
├── knowledge-details.html       # Long-Form Learning Article with Reading Progress & TOC
├── resources.html               # Downloadable Resource Hub
├── resource-details.html        # Resource Specification & Download Experience
├── videos.html                  # Video Masterclasses & Tutorials Gallery
├── video-details.html           # Video Player with Interactive Chapters & Transcript
├── glossary.html                # Searchable A-Z Terminology Lexicon
├── community.html               # Specialist Community Discussions Forum
├── discussion-details.html      # Discussion Thread & Reply Composer
├── guides.html                  # Curated Expert Editorial Guides
├── saved.html                   # Saved Knowledge & Bookmarks Library (LocalStorage)
├── about.html                   # Mission, Editorial Standards & Privacy
├── contact.html                 # Inquiries, Technical Corrections & FAQs
├── login.html                   # Authentication Portal with Quick-Fill Demo
├── signup.html                  # Member Registration with Topic Personalization
├── forgot-password.html         # Password Recovery Simulation
├── 404.html                     # Luxury 404 Recovery Experience
├── coming-soon.html             # Upcoming Archival Releases Preview
│
├── assets/
│   ├── css/
│   │   ├── style.css            # Theme tokens, variables, typography, reset, buttons
│   │   ├── components.css       # Navbar, mega-dropdowns, mobile drawer, search overlay, cards, player
│   │   └── responsive.css       # Responsive rules for 320px up to 2560px
│   │
│   ├── js/
│   │   ├── main.js              # Header scroll, mobile drawer, GSAP animations
│   │   ├── theme.js             # Light/Dark mode controller with localStorage persistence
│   │   ├── auth.js              # Session manager, interests storage, navbar sync
│   │   ├── search.js            # Global search overlay ('/' shortcut) with multi-index categorization
│   │   ├── filters.js           # Multi-facet filtering engine for explore, resources, videos
│   │   ├── knowledge.js         # Reading progress bar, TOC scrollspy, escapement simulator
│   │   ├── resources.js         # Downloadable dataset & filter handlers
│   │   ├── videos.js            # Video player playback simulation & chapter timestamps
│   │   ├── glossary.js          # A-Z alphabet navigation & live search
│   │   ├── community.js         # Discussions list, helpful upvotes, new thread modal
│   │   ├── comments.js          # Thread reply submission & persistent comments
│   │   ├── favorites.js         # Multi-format bookmarking engine
│   │   ├── downloads.js         # Dynamic client-side document compilation & download
│   │   ├── recommendations.js   # User interest personalization engine
│   │   └── notifications.js     # Luxury toast notifications
│   │
│   ├── images/
│   └── downloads/
│
└── README.md
```

---

## 🎨 Design System & Color Tokens

### Light Mode (Default: Ivory & Warm Paper)
- Background Primary: `#FAF8F5`
- Background Secondary: `#F3EFE8`
- Surface: `#FFFFFF`
- Text Primary: `#171719`
- Accent Bronze: `#9E7D52`
- Accent Gold: `#BD9865`
- Olive Subdued: `#4E5E52`

### Dark Mode (Obsidian & Graphite)
- Background Primary: `#0D0E12`
- Background Secondary: `#14161C`
- Surface: `#1B1E26`
- Text Primary: `#F4F1EA`
- Accent Bronze: `#C8A67B`
- Accent Gold: `#DFC298`

---

## ⚡ Core Interactions & Features

1. **Global Search (`/` or `Ctrl+K`):** Instant full-text searching across all 5 content types with categorized tabs and recent queries.
2. **True Theme Switcher:** Instant toggle between Ivory Light and Obsidian Dark mode without page reload or flash.
3. **Faceted Filter Engine:** Multi-select filtering on Category, Topic, Difficulty (Beginner / Intermediate / Advanced), and Format with live count.
4. **Document Generator & Downloader:** Dynamic generation of reference spec sheets and checklists directly into the browser.
5. **Interactive Video Chapters:** Video player with chapter navigation that jumps directly to timestamps.
6. **Reading Progress & TOC:** Real-time top progress bar and sticky Table of Contents scrollspy.
7. **Unified Bookmarking:** Save articles, videos, resources, glossary terms, and discussions with localStorage persistence into `saved.html`.
8. **Community Discussions:** Helpful upvoting counter and live reply submission.

---

## 📱 Responsive Testing Matrix
Fully verified across:
- **Small Mobile:** 320 × 568, 360 × 800, 375 × 812, 390 × 844, 414 × 896, 425 × 900
- **Tablet:** 768 × 1024, 800 × 1280
- **Desktop:** 1024 × 1366, 1280 × 720, 1440 × 900, 1920 × 1080, 2560px+
