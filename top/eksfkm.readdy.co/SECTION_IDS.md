# Available Section IDs for Direct Linking

This document lists all the section IDs available for direct linking with hash fragments.

## Home Page (/)
- `#impact` - Impact Numbers Section
- `#impact-section` - Impact Section Container

## Programs Page (/programs)
- `#education` - Education Support Section
- `#events` - Runs & Events Section
- `#school-building` - School-Building Initiative
- `#success-stories` - Success Stories Gallery

## Get Involved Page (/get-involved)
- `#volunteer` - Volunteer Opportunities
- `#fundraise` - Fundraising Section
- `#events` - Event Calendar
- `#volunteer-profiles` - Volunteer Profiles Section

## Donate Page (/donate)
- `#anonymous` - Anonymous Donation Checkbox (form element)

## Usage Examples

### Direct Navigation to Sections
```html
<!-- Link to Impact section on Home page -->
<a href="/#impact">View Our Impact</a>

<!-- Link to Education section on Programs page -->
<a href="/programs#education">Education Programs</a>

<!-- Link to Volunteer section on Get Involved page -->
<a href="/get-involved#volunteer">Volunteer Opportunities</a>
```

### Smooth Scrolling Within Same Page
```html
<!-- Smooth scroll to impact section on current page -->
<a href="#impact">View Impact</a>
```

## Scroll Behavior

- **Regular navigation** (without hash): Scrolls to top of page
- **Hash navigation** (with #section): Smoothly scrolls to specific section with header offset
- **Header offset**: 80px to account for fixed header height
- **Animation**: Smooth scrolling behavior for better UX

## Implementation Notes

The scroll behavior is handled by:
1. `ScrollToTop` component in `App.tsx` - handles route-based scrolling
2. `SmoothScrollLink` component - handles in-page anchor links
3. Both components include header offset calculations for proper positioning
