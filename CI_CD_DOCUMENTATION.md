# CI/CD Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Branch Strategy](#branch-strategy)
3. [Workflow Structure](#workflow-structure)
4. [Version Management](#version-management)
5. [Setup Instructions](#setup-instructions)
6. [Usage Guide](#usage-guide)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD) to automate building and deploying Android applications to Google Play Store.

### Key Features

- ✅ Automatic version code and version name increment
- ✅ Automated AAB building and signing
- ✅ Deployment to Google Play Store Internal Testing track
- ✅ Discord and Slack notifications
- ✅ Separate workflows for staging and production

---

## 🌿 Branch Strategy

### Staging Branch (`staging`)
- **Purpose**: Testing and QA
- **Workflow**: `.github/workflows/staging.yml`
- **Deployment**: Google Play Store → Internal Testing track (Draft)
- **When to use**: Before merging to main, for QA testing

### Main Branch (`main`)
- **Purpose**: Production releases
- **Workflow**: `.github/workflows/main.yml`
- **Deployment**: Google Play Store → Internal Testing track (Draft)
- **When to use**: After QA approval, ready for production

---

## 🔄 Workflow Structure

### Staging Workflow (`staging.yml`)

**Triggers:**
- Push to `staging` branch
- Pull requests to `staging` branch

**Jobs:**

1. **lint-and-test**
   - Verifies Node.js and npm setup
   - Installs dependencies
   - Runs setup verification

2. **deploy-android-staging**
   - Sets up Android SDK
   - Restores keystore from secrets
   - **Increments version code and version name**
   - Builds release AAB
   - Deploys to Internal Testing track

### Main Workflow (`main.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**

1. **lint-and-test** (same as staging)
2. **deploy** (Android production deployment)
   - Same process as staging
   - Deploys to Internal Testing track

---

## 📦 Version Management

### How Version Increment Works

The CI/CD pipeline **automatically increments** version codes and version names on every build.

#### Current Version Configuration

Located in: `android/app/build.gradle`

```gradle
defaultConfig {
    versionCode 6        // Current version code
    versionName "1.0.6"  // Current version name
}
```

#### Automatic Increment Process

When you push to `staging` or `main` branch, the workflow:

1. **Reads current version** from `build.gradle`
2. **Increments version code**: `6 → 7 → 8 → 9...`
3. **Increments version name**: `1.0.6 → 1.0.7 → 1.0.8...`
4. **Updates build.gradle** with new versions
5. **Builds AAB** with incremented version
6. **Deploys** to Play Store

#### Version Increment Script

The increment happens in the workflow file:

```yaml
- name: Increment version code
  run: |
    cd android
    # Get current version code
    CURRENT_VERSION=$(awk '/versionCode/ {print $2}' app/build.gradle | head -1)
    NEW_VERSION=$((CURRENT_VERSION + 1))
    
    # Update version code
    sed -i "s/versionCode $CURRENT_VERSION/versionCode $NEW_VERSION/" app/build.gradle
    
    # Get current version name
    CURRENT_VERSION_NAME=$(awk -F'"' '/versionName/ {print $2}' app/build.gradle | head -1)
    
    # Increment patch version (e.g., 1.0.6 → 1.0.7)
    IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION_NAME"
    MAJOR=${VERSION_PARTS[0]:-1}
    MINOR=${VERSION_PARTS[1]:-0}
    PATCH=${VERSION_PARTS[2]:-0}
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION_NAME="$MAJOR.$MINOR.$NEW_PATCH"
    
    # Update version name
    sed -i "s/versionName \"$CURRENT_VERSION_NAME\"/versionName \"$NEW_VERSION_NAME\"/" app/build.gradle
```

### Manual Version Update

If you need to manually set a version (e.g., after a failed build due to version conflict):

1. **Open** `android/app/build.gradle`
2. **Update** version code and version name:

```gradle
defaultConfig {
    versionCode 10      // Set to a number higher than what's in Play Store
    versionName "1.0.9" // Update accordingly
}
```

3. **Commit and push** the changes

### Version Naming Convention

- **Version Code**: Integer that must always increase (6, 7, 8, 9...)
- **Version Name**: Semantic versioning (1.0.6, 1.0.7, 1.0.8...)
  - Format: `MAJOR.MINOR.PATCH`
  - Patch version increments automatically

---

## ⚙️ Setup Instructions

### Prerequisites

1. GitHub repository with Actions enabled
2. Google Play Console account
3. Service account with Play Store API access

### Step 1: Encode Keystore File

Run the helper script to get base64-encoded keystore:

```bash
./scripts/encode-keystore.sh
```

Or manually:

```bash
base64 -i android/app/keystore.jks
```

### Step 2: Configure GitHub Secrets

Go to: **Settings → Secrets and variables → Actions**

Add the following secrets:

#### Android Secrets

| Secret Name | Description | Example |
|------------|-------------|---------|
| `KEYSTORE_BASE64` | Base64 encoded keystore file | (paste entire base64 string) |
| `KEYSTORE_KEY_ALIAS` | Keystore key alias | `key0` |
| `KEYSTORE_STORE_PASSWORD` | Keystore password | `your-password` |
| `KEYSTORE_KEY_PASSWORD` | Key password | `your-password` |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Google Play service account JSON | (paste entire JSON) |

#### Notification Secrets (Optional)

| Secret Name | Description |
|------------|-------------|
| `DISCORD_WEBHOOK_URL` | Discord webhook URL for notifications |
| `SLACK_WEBHOOK` | Slack webhook URL for notifications |

### Step 3: Verify Configuration

1. Check `android/gradle.properties` has correct keystore settings
2. Verify `android/fastlane/Fastfile` has correct lanes
3. Ensure `android/app/build.gradle` has correct package name

---

## 🚀 Usage Guide

### Deploying to Staging

1. **Switch to staging branch:**
   ```bash
   git checkout staging
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

3. **Push to staging:**
   ```bash
   git push origin staging
   ```

4. **Workflow automatically:**
   - Runs lint-and-test
   - Increments version
   - Builds AAB
   - Deploys to Internal Testing track
   - Sends notifications

5. **Check deployment:**
   - GitHub Actions tab → View workflow run
   - Google Play Console → Internal Testing → Draft releases

### Deploying to Production

1. **After QA approval, merge to main:**
   ```bash
   git checkout main
   git merge staging
   git push origin main
   ```

2. **Workflow automatically:**
   - Runs same process as staging
   - Deploys to Internal Testing track

### Monitoring Workflows

1. **GitHub Actions Tab:**
   - Go to repository → Actions tab
   - View workflow runs and logs
   - Check for failures or errors

2. **Notifications:**
   - Discord/Slack channels receive notifications
   - Success: ✅ Green checkmark
   - Failure: 🚨 Red alert with error details

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "Version code X has already been used"

**Problem:** The version code already exists in Play Store.

**Solution:**
1. Check current version in `android/app/build.gradle`
2. Manually update to a higher number:
   ```gradle
   versionCode 15  // Use a number higher than what's in Play Store
   ```
3. Commit and push

#### 2. "Keystore file not found"

**Problem:** Keystore secret not configured or incorrect.

**Solution:**
1. Verify `KEYSTORE_BASE64` secret is set
2. Re-encode keystore and update secret
3. Check keystore path in workflow

#### 3. "Google Api Error: Invalid request"

**Problem:** Service account credentials issue.

**Solution:**
1. Verify `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` secret
2. Check service account has correct permissions
3. Ensure JSON is complete and valid

#### 4. Build Fails During Gradle Build

**Problem:** Build configuration issue.

**Solution:**
1. Check `android/app/build.gradle` for errors
2. Verify signing configuration
3. Check Android SDK setup in workflow

#### 5. Version Not Incrementing

**Problem:** Version increment script not working.

**Solution:**
1. Check workflow logs for increment step
2. Verify `build.gradle` format is correct
3. Manually update version if needed

### Debugging Tips

1. **Check Workflow Logs:**
   - GitHub Actions → Select workflow run → View logs
   - Look for error messages in red

2. **Verify Secrets:**
   - Settings → Secrets → Check all required secrets exist
   - Ensure values are correct (no extra spaces)

3. **Test Locally:**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

4. **Check Play Store Console:**
   - Verify app exists
   - Check API access permissions
   - Review recent uploads

---

## 📊 Workflow Flow Diagram

```
┌─────────────────┐
│  Push to Branch │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  lint-and-test  │
│  (Setup Verify) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Restore Keystore│
│  from Secrets   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Increment       │
│ Version Code    │
│ Version Name    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Build AAB       │
│ (bundleRelease) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy to       │
│ Play Store      │
│ (Internal Track)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Send            │
│ Notifications   │
└─────────────────┘
```

---

## 📝 Version History Example

| Build | Version Code | Version Name | Status |
|-------|-------------|--------------|--------|
| Initial | 1 | 1.0.0 | - |
| Build 1 | 2 | 1.0.1 | ✅ Deployed |
| Build 2 | 3 | 1.0.2 | ✅ Deployed |
| Build 3 | 4 | 1.0.3 | ✅ Deployed |
| Build 4 | 5 | 1.0.4 | ✅ Deployed |
| Build 5 | 6 | 1.0.6 | ✅ Current |

---

## 🔐 Security Notes

1. **Never commit** keystore files or credentials
2. **Always use** GitHub Secrets for sensitive data
3. **Rotate** service account keys periodically
4. **Review** workflow permissions regularly
5. **Keep** secrets updated and secure

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Fastlane Documentation](https://docs.fastlane.tools/)
- [Google Play Console](https://play.google.com/console)
- [React Native Documentation](https://reactnative.dev/)

---

## 🆘 Support

If you encounter issues not covered in this documentation:

1. Check workflow logs in GitHub Actions
2. Review error messages carefully
3. Verify all secrets are configured
4. Test build locally first
5. Contact the development team

---

**Last Updated:** December 2024  
**Maintained By:** Development Team
