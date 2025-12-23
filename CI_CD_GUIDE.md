# 🚀 CI/CD Complete Documentation

## React Native App - Automated Deployment Guide

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Workflow Files](#workflow-files)
4. [Deployment Types](#deployment-types)
5. [How to Trigger Deployments](#how-to-trigger-deployments)
6. [Version Management](#version-management)
7. [iOS Setup (Fastlane + Match)](#ios-setup)
8. [Android Setup](#android-setup)
9. [Required Secrets](#required-secrets)
10. [Troubleshooting](#troubleshooting)
11. [Local Testing](#local-testing)

---

## 🎯 Overview

This project uses **GitHub Actions** for CI/CD with the following deployment options:

| Deployment Type | Description | Destination |
|-----------------|-------------|-------------|
| **Expo OTA** | JavaScript-only updates (fast, no app store review) | Expo Updates |
| **Native iOS** | Full iOS build with native changes | TestFlight / App Store |
| **Native Android** | Full Android build with native changes | Play Store Internal Testing |

### Key Features
- ✅ **Manual Trigger** - Deploy when you want, not on every push
- ✅ **Auto Detection** - Automatically chooses the right deployment type
- ✅ **Version Control** - Specify versions manually or auto-increment
- ✅ **Slack Notifications** - Get notified on build status
- ✅ **Parallel Builds** - iOS and Android build simultaneously

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      GitHub Actions                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐                                               │
│  │   Trigger    │  workflow_dispatch (manual)                   │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │ lint-and-test│  Run tests & verification                    │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │   changes    │  Detect what files changed                    │
│  └──────┬───────┘                                               │
│         │                                                        │
│    ┌────┴────┬────────────┐                                     │
│    ▼         ▼            ▼                                     │
│ ┌──────┐ ┌──────────┐ ┌──────────┐                             │
│ │ Expo │ │  iOS     │ │ Android  │                             │
│ │ OTA  │ │ Native   │ │ Native   │                             │
│ └──────┘ └──────────┘ └──────────┘                             │
│    │         │            │                                     │
│    ▼         ▼            ▼                                     │
│ ┌──────┐ ┌──────────┐ ┌──────────┐                             │
│ │Expo  │ │TestFlight│ │Play Store│                             │
│ │Update│ │App Store │ │Internal  │                             │
│ └──────┘ └──────────┘ └──────────┘                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Workflow Files

### 1. Staging CI/CD (`.github/workflows/staging.yml`)

**Purpose:** Testing and QA builds

| Job | Description | Output |
|-----|-------------|--------|
| `expo-update` | OTA updates for JS changes | Expo "staging" channel |
| `deploy-ios` | Full iOS build | TestFlight |
| `deploy-android` | Full Android build | Play Store Internal Testing |

### 2. Production CI/CD (`.github/workflows/main.yml`)

**Purpose:** Production releases

| Job | Description | Output |
|-----|-------------|--------|
| `expo-update` | OTA updates for JS changes | Expo "production" channel |
| `deploy-ios` | Full iOS build | TestFlight (can be changed to App Store) |
| `deploy-android` | Full Android build | Play Store Internal Testing |

---

## 🎮 Deployment Types

When triggering a workflow, you can choose:

| Option | When to Use | What Happens |
|--------|-------------|--------------|
| `auto` | Default - let CI decide | Analyzes changed files and picks appropriate deployment |
| `expo` | JS-only changes | Publishes Expo OTA update (fast, ~2 min) |
| `native-ios` | iOS native changes | Builds & uploads to TestFlight (~15-20 min) |
| `native-android` | Android native changes | Builds & uploads to Play Store (~10-15 min) |
| `native-all` | Both platforms | Builds iOS & Android simultaneously |

### Auto Detection Logic

```
┌─────────────────────────────────────────────────┐
│            What files changed?                   │
└─────────────────┬───────────────────────────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
    ▼                           ▼
┌─────────┐               ┌─────────────┐
│ ios/**  │               │ src/**      │
│android/**│              │ **/*.ts     │
│package.json│            │ **/*.tsx    │
│ app.json │              │ assets/**   │
└────┬────┘               └──────┬──────┘
     │                           │
     ▼                           ▼
┌──────────┐              ┌──────────┐
│ NATIVE   │              │  EXPO    │
│  BUILD   │              │   OTA    │
└──────────┘              └──────────┘
```

---

## 🚀 How to Trigger Deployments

### Step 1: Go to GitHub Actions

```
Repository → Actions → Staging CI/CD (or Production CI/CD)
```

### Step 2: Click "Run workflow"

![Run Workflow Button](https://docs.github.com/assets/cb-50014/images/actions-workflow-dispatch-button.png)

### Step 3: Fill in the options

| Field | Description | Example |
|-------|-------------|---------|
| **deploy_type** | Choose deployment type | `native-ios` |
| **version_code** | Android build number (optional) | `15` |
| **version_name** | Android version (optional) | `1.2.0` |
| **ios_version** | iOS marketing version (optional) | `1.2.0` |
| **ios_build_number** | iOS build number (optional) | `25` |

### Step 4: Click "Run workflow"

The pipeline will start executing!

---

## 📊 Version Management

### iOS Versioning

| Field | Description | Xcode Key | Example |
|-------|-------------|-----------|---------|
| **Marketing Version** | User-visible version | `CFBundleShortVersionString` | `1.2.0` |
| **Build Number** | Internal build identifier | `CFBundleVersion` | `45` |

#### Commands used in CI:
```bash
# Set marketing version
agvtool new-marketing-version 1.2.0

# Set build number
agvtool new-version -all 45
```

#### Auto-increment:
- If you leave `ios_build_number` empty, Fastlane auto-increments it
- Marketing version stays the same unless you specify it

### Android Versioning

| Field | Description | Location | Example |
|-------|-------------|----------|---------|
| **versionCode** | Internal build number (must increase) | `android/app/build.gradle` | `15` |
| **versionName** | User-visible version | `android/app/build.gradle` | `1.2.0` |

#### Auto-increment:
- If you leave `version_code` empty, it auto-increments by 1
- If you leave `version_name` empty, it increments patch version (1.0.0 → 1.0.1)

---

## 🍎 iOS Setup

### Files Structure

```
ios/
├── fastlane/
│   ├── Appfile          # App identifier & team info
│   ├── Fastfile         # Build lanes (staging, production)
│   └── Matchfile        # Certificate sync config
├── rn_ci_cd.xcodeproj/  # Xcode project
├── rn_ci_cd.xcworkspace/# Xcode workspace
├── Podfile              # CocoaPods dependencies
└── Gemfile              # Ruby dependencies (fastlane)
```

### Fastlane Lanes

#### `fastlane staging`
1. Creates temporary keychain (CI)
2. Syncs certificates via Match (readonly)
3. Disables automatic code signing
4. Increments build number
5. Builds the app
6. Uploads to TestFlight

#### `fastlane production`
1. Same as staging...
2. Uploads to App Store (not TestFlight)

### Match (Certificate Management)

Match stores certificates in a **private Git repository**:

```
Repository: https://github.com/attayrasoolxb15/cicdhose-ios-certificates
├── certs/
│   └── distribution/    # Apple Distribution certificates
└── profiles/
    └── appstore/        # App Store provisioning profiles
```

#### Sync certificates locally:
```bash
cd ios
bundle exec fastlane match appstore
```

#### Generate new certificates (if expired):
```bash
cd ios
bundle exec fastlane match appstore --force
```

### Code Signing Configuration

| Setting | Value |
|---------|-------|
| **Bundle ID** | `com.cicdsm.app` |
| **Team ID** | `MXJT6AL685` |
| **Profile Name** | `match AppStore com.cicdsm.app` |
| **Code Sign Identity** | `Apple Distribution` |

---

## 🤖 Android Setup

### Files Structure

```
android/
├── fastlane/
│   ├── Appfile          # Package name & credentials
│   └── Fastfile         # Build lanes
├── app/
│   ├── build.gradle     # App config, versions, signing
│   └── keystore.jks     # (generated in CI from secret)
└── Gemfile              # Ruby dependencies
```

### Fastlane Lanes

#### `fastlane staging`
- Uploads AAB to Play Store **Internal Testing** track (draft)

#### `fastlane playstore`
- Same as staging (Internal Testing, draft)

### Keystore Setup

The keystore is stored as a Base64 secret:

```bash
# Encode keystore to Base64 (run once, save to GitHub secrets)
base64 -i android/app/your-keystore.jks | pbcopy
```

In CI, it's decoded:
```bash
echo "$KEYSTORE_BASE64" | base64 -d > android/app/keystore.jks
```

---

## 🔐 Required Secrets

Go to: `Repository → Settings → Secrets and variables → Actions`

### iOS Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `APP_STORE_CONNECT_API_KEY_ID` | API Key ID | App Store Connect → Users → Keys |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID | Same page as above |
| `APP_STORE_CONNECT_API_KEY_CONTENT` | `.p8` file content | Download key, copy content |
| `MATCH_PASSWORD` | Encryption password for Match | You set this when first running Match |
| `MATCH_GIT_BASIC_AUTHORIZATION` | Git auth for certificate repo | `echo -n "username:token" \| base64` |

### Android Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `KEYSTORE_BASE64` | Base64-encoded keystore | `base64 -i keystore.jks` |
| `KEYSTORE_KEY_ALIAS` | Key alias | Your keystore config |
| `KEYSTORE_STORE_PASSWORD` | Keystore password | Your keystore config |
| `KEYSTORE_KEY_PASSWORD` | Key password | Your keystore config |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Service account JSON | Google Cloud Console |

### Expo Secrets (Optional)

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `EXPO_TOKEN` | Expo access token | expo.dev → Access Tokens |
| `EAS_PROJECT_ID` | EAS project ID | `app.json` or Expo dashboard |

### Slack Notification (Optional)

| Secret Name | Description |
|-------------|-------------|
| `SLACK_WEBHOOK` | Slack incoming webhook URL |

---

## 🔧 Troubleshooting

### Issue: Build freezes at "[CP] Embed Pods Frameworks"

**Cause:** Keychain access prompt in headless CI

**Solution:** Already fixed! We create a temporary keychain:
```ruby
create_keychain(
  name: "fastlane_keychain",
  password: "fastlane_password",
  default_keychain: true,
  unlock: true,
  timeout: 3600
)
```

### Issue: "No profiles for 'com.cicdsm.app' were found"

**Cause:** Automatic signing is enabled or wrong profile

**Solution:** We disable automatic signing:
```ruby
update_code_signing_settings(
  use_automatic_signing: false,
  profile_name: "match AppStore com.cicdsm.app"
)
```

### Issue: Ruby/Bundler gem not found errors

**Cause:** Bundler path conflicts in CI

**Solution:** We use system gem install:
```yaml
- name: Install Fastlane and CocoaPods
  run: |
    gem install fastlane cocoapods --no-document
    cd ios && pod install
```

### Issue: Certificate not found or expired

**Solution:** Regenerate with Match:
```bash
cd ios
bundle exec fastlane match nuke distribution  # Remove old
bundle exec fastlane match appstore --force   # Generate new
```

### Issue: Podfile syntax error

**Cause:** Missing comma in Ruby hash

**Example fix:**
```ruby
# Before (wrong)
use_react_native!(
  :hermes_enabled => true    # Missing comma!
  :app_path => "..."
)

# After (correct)
use_react_native!(
  :hermes_enabled => true,   # Added comma
  :app_path => "..."
)
```

---

## 💻 Local Testing

### Test iOS Build Locally

```bash
cd ios

# Install dependencies
bundle install
pod install

# Run staging lane
bundle exec fastlane staging
```

### Test Android Build Locally

```bash
cd android

# Build release AAB
./gradlew bundleRelease

# Or use Fastlane
bundle exec fastlane staging
```

### Sync Certificates Locally

```bash
cd ios
bundle exec fastlane match appstore
# Enter MATCH_PASSWORD when prompted
```

---

## 📱 App Store Connect Setup

### Creating a New App

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform:** iOS
   - **Name:** Your App Name
   - **Primary Language:** English
   - **Bundle ID:** `com.cicdsm.app`
   - **SKU:** `cicdsm2024` (any unique identifier)
   - **User Access:** Full Access

### API Key Setup

1. Go to **Users and Access** → **Keys**
2. Click **+** to generate a new key
3. **Name:** CI/CD Key
4. **Access:** Admin (or App Manager)
5. Download the `.p8` file
6. Note the **Key ID** and **Issuer ID**

---

## 🎉 Quick Reference

### Trigger Staging Build (iOS)

1. Go to Actions → **Staging CI/CD**
2. Click **Run workflow**
3. Select `native-ios`
4. (Optional) Set `ios_version: 1.2.0`
5. Click **Run workflow**

### Trigger Production Build (Android)

1. Go to Actions → **Production CI/CD**
2. Click **Run workflow**
3. Select `native-android`
4. (Optional) Set `version_name: 1.2.0`
5. Click **Run workflow**

### Deploy Both Platforms

1. Go to Actions → **Staging CI/CD** or **Production CI/CD**
2. Click **Run workflow**
3. Select `native-all`
4. Set versions for both platforms
5. Click **Run workflow**

---

## 📞 Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review the workflow run logs in GitHub Actions
- Ensure all secrets are correctly configured

---

**Last Updated:** December 2024
