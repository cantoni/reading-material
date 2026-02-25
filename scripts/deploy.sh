#!/usr/bin/env bash
set -euo pipefail
cd /home/om/reading-material
git pull --ff-only
npm ci
npm run build
systemctl --user restart reading-material.service
systemctl --user --no-pager status reading-material.service -n 20
