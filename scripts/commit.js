import { execSync } from 'child_process'
import { resolve } from 'path'

const projectRoot = resolve('/vercel/share/v0-project')

try {
  console.log('📝 Adding all changes...')
  execSync('git add .', { cwd: projectRoot, stdio: 'inherit' })

  console.log('💾 Committing changes...')
  execSync(
    `git commit -m "Refactor: Improve code organization and security

- Extract constants and data into separate files (levels, badges, hints, exercises)
- Update Next.js to v15.3.1 for security patches
- Enhance SEO metadata with keywords and OpenGraph tags
- Create icon utility function for centralized icon rendering
- Remove monolithic component dependencies on inline data structures

This improves maintainability, security, and code organization."`,
    { cwd: projectRoot, stdio: 'inherit' }
  )

  console.log('✓ Commit completed successfully!')
} catch (error) {
  console.error('❌ Error during commit:', error.message)
  process.exit(1)
}
