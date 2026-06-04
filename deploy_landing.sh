#!/bin/bash

# ─────────────────────────────────────────────
# Configuration — update these before running
# ─────────────────────────────────────────────
VPS_USER="haya"
VPS_IP="217.65.146.73"
REPO_URL="git@github.com:Dyserf/Haya-Landing-Page.git"   # ← update if different
APP_DIR="haya-landing"                                      # folder name under ~/apps/
PORT=3002                                                   # ← change if needed
BRANCH="main"
PM2_NAME="haya-landing"
# ─────────────────────────────────────────────

echo "🚀 Deploying Haya Landing Page to $VPS_USER@$VPS_IP..."

ssh $VPS_USER@$VPS_IP bash -s << ENDSSH
REPO_URL="$REPO_URL"
BRANCH="$BRANCH"
APP_DIR="$APP_DIR"
PORT=$PORT
PM2_NAME="$PM2_NAME"
set -e

cd ~/apps

echo "🧹 Removing old directory for a clean deploy..."
rm -rf "\$APP_DIR"
echo "📥 Cloning fresh from repository..."
git clone \$REPO_URL "\$APP_DIR"
cd "\$APP_DIR"
git checkout \$BRANCH

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔨 Building application..."
pnpm build

echo "🔄 Restarting application with PM2..."
pm2 delete \$PM2_NAME 2>/dev/null || true
PORT=\$PORT pm2 start pnpm --name "\$PM2_NAME" -- start
pm2 save

echo "✅ Deployment complete!"
ENDSSH

echo ""
echo "✅ Landing page deployed successfully!"
echo "📊 Check status : ssh $VPS_USER@$VPS_IP 'pm2 status'"
echo "📋 View logs    : ssh $VPS_USER@$VPS_IP 'pm2 logs $PM2_NAME'"
