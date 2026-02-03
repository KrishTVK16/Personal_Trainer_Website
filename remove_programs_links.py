import os
import re

# List of files to process
# We'll grab all .html files in the current directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Regex patterns to identify lines with programs.html links in navigation/footer
# We want to remove the entire <li> element if it contains the link
# Pattern matches: <li ...><a ... href="programs.html" ...>...</a></li>
# Simple line-based filtering is safer if we assume standard formatting
# We will look for lines containing `href="programs.html"` and `nav-link` or just general removal if it's a list item.

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    modified = False
    
    for line in lines:
        # Check if line contains programs.html link
        if 'href="programs.html"' in line:
            # Check if it's a navigation item (desktop or mobile)
            if '<li' in line and '</li>' in line:
                print(f"Removing line in {file_path}: {line.strip()}")
                modified = True
                continue # Skip adding this line
            
            # Check if it's a specific button we want to redirect or remove
            # For home-2.html specifically, we might want to handle it separately or let this script skip it
            # But the user wants "hidden usage", so maybe just removing links is safe for now?
            # Let's start with just removing nav items (<li>)
            # If it's a button, we might want to preserve it but change href? 
            # Risk: "Invest in Yourself" section had pricing cards, but I removed them already.
            # "View Full Details" in home-2.html pricing card is a button.
            
            if 'btn' in line:
                 # It's a button. Let's change href to #contact or contact.html
                 print(f"Redirecting button in {file_path}: {line.strip()}")
                 line = line.replace('href="programs.html"', 'href="contact.html"')
                 modified = True
        
        new_lines.append(line)

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

print("Starting link removal...")
for file in html_files:
    # Skip programs.html itself if we want to keep it valid, but we need to remove nav links FROM it too.
    process_file(file)
print("Done.")
