# 📓 Dev Log — Review Hub

## Day 1 — March 1, 2026

- Initialized React project with Vite
- Setup Tailwind CSS
- Created basic folder structure
- Connected VS Code project folder to GitHub

## Day 2 — March 2, 2026

- Connected project to Supabase
- Implemented user authentication (Sign Up / Login)
- Setup environment variables (.env)

## Day 3 — March 3, 2026

- Improved Auth page UI
- Fixed layout issues
- Added About page

## Day 4 — March 4, 2026

- Added hover effects and interactions (Send button, social links)
- Improved overall UI
- Added motion animations to Contact section and Footer
- Built Contact form with EmailJS
- Added toast notification for form feedback
- Stored EmailJS credentials in .env

## Day 5 — March 5, 2026

- Fixed Contact section height issue
- Fixed Landing Page height issue (DevTools overlap)
- Improved Login and Sign Up pages (toast notifications, OTP inputs)
- Improved Header UI for tablet and desktop
- Added icons to list items
- Added authentication settings dropdown (tablet view)
- Moved Theme, Login, and Sign Up inside Settings Menu when not logged in (tablet view)

## Day 6 — March 6, 2026

- Added icons for mobile, tablet, and desktop
- Improved Mobile Menu layout
- Fixed Settings Menu still clickable when hidden on mobile
- Fixed Sign Up button becoming non-clickable when OTP modal appears
- Started working on Dashboard page
- Completed Desktop Sidebar
- Added Profile page (coming soon)

## Day 7 — March 7, 2026

- Added Feed and Explore pages
- Added Feed button on the Landing Page
- Implemented Forgot Password page (mobile, tablet, desktop)
- Implemented 3-step reset flow: Email → OTP → Reset Password
- Added 8-digit OTP input boxes
- Added Confirm Password field in reset step
- Improved OTP input field on Sign Up page
- Added AnimatePresence
- Improved toast transitions
- Created reusable LoadingDots component using Framer Motion
- Added simple animations to Login, Sign Up, and Landing pages

## Day 8 - March 8, 2026

- Improved setting menu and open menu hide when click other components
- Improved dashboard UI layout on mobile, tablet, and desktop
- Fixed MobileDashboardFloat bugs (props, useTheme, layout)
- Fixed useEffect resize missing dependency array
- Added 2-column grid layout for nav items on tablet

## Day 9 - March 9, 2026

- Added a search bar to the dashboard
- Added a dynamic header title based on the active tab
- Hid the search bar when the Settings tab is active
- Added an "X" button and its function for the dashboard search bar
- Removed the sidebar from the dashboard and added a DashboardSidebar component for desktop

## Day 10 - March 10, 2026

- Added decks table in supabase
- Created CreateDeck page
- Added light and dark toggle in dashboard

## Day 11 - March 11, 2026

- Created Create Deck page
- Fixed form validation (title & category required, `.trim()` on inputs)
- Improved error handling with `try/catch/finally` in `handleCreate`
- Added dynamic toast messages in created deck for different error types
- Refactored `CreateDeckPage` — cleaner code with comments
- Added RLS policies in Supabase (INSERT & SELECT) for `decks` table
- Fixed `auth.uid()` policy to allow users to view their own decks
- Improving Dashboard decks display

## Day 12 - March 12, 2026

- Improved deck cards in dashboard (progress bar, card count, last opened, privacy indicator)
- Added DeckOptionMenu component (edit, delete, change background)
- Added AnimatePresence for dropdown animation in DeckOptionMenu
- Fixed deck card height consistency using min-h-55 and self-start
- Added simple bouncing dots animation in forgot password page

## Day 13 - March 13, 2026

- Added Cancel Icon in create deck page
- Created Flashcard Page
- Fixed description in decks

## Day 14 – March 14, 2026

- Created DeckDescription component with horizontal scroll for long descriptions
- Added favourite toggle per deck (is_favorite column in Supabase)
- Added Supabase Realtime subscription for live deck updates
- Fixed last_opened default value (NULL na instead of now())
- Added animation in favorite icon

## Day 15 - March 15, 2026

- Added Favourites Tab functionality with exit animation
- Fixed deck card height alignment with Create New Deck card
- Added Edit Deck Page with pre-filled form fields
- Added AnimatePresence exit animation on unfavourite in Favourites tab
- Fixed DeckOptionMenu Edit button (missing parentheses on onEdit call)
- Added localStorage for active tab persistence on refresh
