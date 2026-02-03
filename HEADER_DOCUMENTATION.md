# IRON FORGE Personal Trainer Website - Header Structure Documentation

## Overview
This document explains the structure, functionality, and implementation of the header/navigation system used in the IRON FORGE Personal Trainer Website.

## File Structure
- **HTML**: `index.html` (lines 20-93)
- **CSS**: `assets/css/style.css` (lines 62-111, 118-148)
- **JavaScript**: `assets/js/main.js` (lines 8-64)

## HTML Structure Analysis

### Main Container
```html
<nav class="navbar navbar-expand-lg sticky-top bg-body-tertiary">
    <div class="container flex-nowrap">
        <!-- All header content -->
    </div>
</nav>
```

### Component Breakdown

#### 1. Brand/Logo Section (Lines 23-26)
- **Purpose**: Company branding and homepage link
- **Elements**: 
  - Logo image (`assets/images/logo.png`)
  - Brand name "IRONFORGE" with styled "IRON" and "FORGE"
- **Features**: Flexbox alignment, responsive sizing

#### 2. Desktop Navigation Menu (Lines 31-47)
- **Purpose**: Primary navigation for desktop users
- **Visibility**: Hidden on mobile (`d-none d-lg-flex`)
- **Links**: Home, Home 2, Programs, About, Services, Pricing, Blog, Contact
- **Styling**: Custom `.desktop-menu` class with hover effects

#### 3. Action Buttons Area (Lines 48-66)
- **Theme Toggle**: Dark/light mode switcher (lines 50-52)
- **Auth Buttons**: Dashboard, Sign Up, Login (desktop only, lines 55-59)
- **Mobile Toggle**: Hamburger menu for mobile devices (lines 62-65)

#### 4. Mobile Offcanvas Menu (Lines 70-92)
- **Purpose**: Mobile navigation experience
- **Behavior**: Slides in from right side
- **Content**: Navigation links + auth buttons (mobile layout)
- **Bootstrap Component**: Uses Bootstrap 5 offcanvas system

## CSS Implementation Details

### Theme System (Lines 9-17)
```css
:root {
    --font-heading: 'Oswald', sans-serif;
    --font-body: 'Inter', sans-serif;
    --color-primary: #4a4537;
    --color-secondary: #6e6464;
    --color-dark-bg: #1f1c10;
}
```

### Desktop Menu Styling (Lines 64-94)
- **Hover Effect**: Color change to primary color
- **Underline Animation**: Grows from center (0% to 80% width)
- **Transition**: Smooth 0.3s ease effects
- **Active State**: Persistent underline for current page

### Mobile Responsiveness (Lines 118-148)
- **Breakpoint**: 768px max width
- **Layout Changes**: Fixed positioning, full-width menu
- **Transitions**: Slide-in animation effects

## JavaScript Functionality

### Theme Toggle System (Lines 8-46)

#### Core Functions:
1. **`setTheme(theme)`**: Applies theme and saves to localStorage
2. **`updateIcon(theme)`**: Updates moon/sun icon based on theme
3. **Theme Detection**: Checks localStorage first, then system preference

#### Features:
- **Persistence**: Saves user preference in localStorage
- **System Integration**: Respects OS dark/light mode preference
- **Icon Updates**: Dynamic moon/sun icon switching
- **Event Handling**: Click listener for theme toggle button

### Back to Top Button (Lines 49-64)

#### Behavior:
- **Scroll Detection**: Appears after 300px scroll
- **Smooth Scrolling**: Animated return to top
- **Visibility Toggle**: Bootstrap display class management

## Key Technical Features

### Responsive Design
- **Desktop**: Horizontal navbar with inline menu
- **Mobile**: Offcanvas slide-out menu
- **Breakpoint**: Bootstrap's `lg` breakpoint (992px)

### Accessibility
- **Semantic HTML5**: Proper nav element usage
- **ARIA Support**: Bootstrap's built-in accessibility
- **Keyboard Navigation**: Native Bootstrap support

### Performance
- **Optimized CSS**: Bootstrap's optimized utility classes
- **Efficient JS**: Vanilla JavaScript, minimal dependencies
- **Smooth Animations**: CSS transitions for better performance

## Dependencies

### External Libraries
- **Bootstrap 5.3.0**: CSS framework and components
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts**: Inter and Oswald font families

### Internal Files
- **style.css**: Custom styling and theme variables
- **main.js**: Theme toggle and back-to-top functionality

## Customization Points

### Colors
- Modify CSS custom properties in `:root` section
- Primary color: `--color-primary: #4a4537`
- Background color: `--color-dark-bg: #1f1c10`

### Fonts
- Heading font: `--font-heading: 'Oswald'`
- Body font: `--font-body: 'Inter'`

### Navigation Links
- Update href attributes in both desktop and mobile menus
- Maintain consistency between both menu versions

## Browser Compatibility
- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Mobile**: Responsive design works on all mobile devices
- **Theme Support**: Dark/light mode in supporting browsers

## Maintenance Notes

### Adding New Pages
1. Add link to desktop menu (line 31-47)
2. Add corresponding link to mobile offcanvas menu (line 75-84)
3. Update active state logic if needed

### Theme Modifications
- Update CSS custom properties for global color changes
- Test both dark and light themes
- Verify contrast ratios for accessibility

### Performance Optimization
- CSS is already optimized with Bootstrap utilities
- JavaScript uses event delegation efficiently
- Images should be optimized for web

## Conclusion
The header system provides a modern, responsive navigation experience with theme switching capabilities. It uses Bootstrap 5 for consistency and accessibility, with custom CSS for branding and JavaScript for enhanced user experience features.
