#!/bin/bash

cd /vercel/share/v0-project

git add .

git commit -m "Refactor: Improve code organization and security

- Extract constants and data into separate files (levels, badges, hints, exercises)
- Update Next.js to v15.3.1 for security patches
- Enhance SEO metadata with keywords and OpenGraph tags
- Create icon utility function for centralized icon rendering
- Remove monolithic component dependencies on inline data structures

This improves maintainability, security, and code organization."

echo "✓ Commit completed successfully"
