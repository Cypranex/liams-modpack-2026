#!/bin/bash

# Exit immediately if any command fails
set -e 

# Save the current branch to return to it when finished
ORIGINAL_BRANCH=$(git branch --show-current)

# Ensure local main is fully up to date
echo "Updating main..."
git checkout main
git pull origin main

for BRANCH in "max-graphics" "max-performance"; do
    echo -e "\n========================================"
    echo "Updating $BRANCH"
    echo "========================================"
    
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
    
    # Merge main without opening an editor
    echo "Merging main into $BRANCH..."
    git merge main --no-edit
    
    # Refresh packwiz metadata
    echo "Refreshing packwiz..."
    packwiz refresh
    
    # Stage the core TOML files
    git add pack.toml index.toml
    
    # Commit the refreshed files only if they actually changed
    if ! git diff --cached --quiet; then
        echo "Committing updated hashes..."
        git commit -m "chore: auto-refresh packwiz after merging main"
    else
        echo "No TOML changes detected after refresh."
    fi
    
    # Push to GitHub
    echo "Pushing $BRANCH..."
    git push origin "$BRANCH"
done

# Update local-admin (Local Only)
echo -e "\n========================================"
echo "Updating local-admin (Local Only)"
echo "========================================"

git checkout local-admin

# Merge max-graphics without opening an editor
echo "Merging max-graphics into local-admin..."
git merge max-graphics --no-edit

# Refresh packwiz metadata
echo "Refreshing packwiz..."
packwiz refresh

# Stage the core TOML files
git add pack.toml index.toml

# Commit the refreshed files only if they actually changed
if ! git diff --cached --quiet; then
    echo "Committing updated hashes..."
    git commit -m "chore: auto-refresh packwiz after merging max-graphics"
else
    echo "No TOML changes detected after refresh."
fi

echo "Skipping push for local-admin."

# Return to where you started
echo -e "\n========================================"
echo "Done! Returning to $ORIGINAL_BRANCH."
git checkout "$ORIGINAL_BRANCH"