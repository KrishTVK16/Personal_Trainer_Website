/**
 * Script to apply universal mobile navigation to all HTML pages
 * This script updates all HTML files to include the universal mobile navigation system
 */

const fs = require('fs');
const path = require('path');

// List of all HTML files to update
const htmlFiles = [
    'index.html',
    'home-2.html', 
    'about.html',
    'services.html',
    'pricing.html',
    'blog.html',
    'contact.html',
    'programs.html',
    'dashboard.html',
    'login.html',
    'register.html',
    'signup.html',
    '404.html',
    'coming-soon.html',
    'blog-details.html',
    'service-details.html',
    'transformations.html'
];

// CSS link to add
const cssLink = '    <!-- Universal Mobile Navigation -->\n    <link rel="stylesheet" href="assets/css/universal-mobile-nav.css">';

// JS script to add
const jsScript = '    <!-- Universal Mobile Navigation -->\n    <script src="assets/js/universal-mobile-nav.js"></script>';

function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add CSS link after existing CSS
        if (!content.includes('universal-mobile-nav.css')) {
            content = content.replace(
                /(<link rel="stylesheet" href="assets\/css\/style\.css">)/,
                `$1\n${cssLink}`
            );
        }
        
        // Add JS script before closing body tag
        if (!content.includes('universal-mobile-nav.js')) {
            content = content.replace(
                /(<\/body>)/,
                `${jsScript}\n$1`
            );
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated: ${filePath}`);
        return true;
    } catch (error) {
        console.log(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Update all files
console.log('🚀 Applying Universal Mobile Navigation to all pages...\n');

let successCount = 0;
htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        if (updateFile(file)) {
            successCount++;
        }
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log(`\n✨ Complete! Updated ${successCount}/${htmlFiles.length} files.`);
console.log('\n📱 Universal Mobile Navigation is now available on all pages!');
console.log('🎯 Features: Full-screen popup, blur effect, smooth scrolling, responsive design');
