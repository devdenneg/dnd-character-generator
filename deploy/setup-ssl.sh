#!/bin/bash
# SSL certificate setup for dndgenerator.club

set -e

echo "🔐 Setting up SSL certificate for dndgenerator.club..."

# Get SSL certificate from Let's Encrypt
certbot --nginx -d dndgenerator.club -d www.dndgenerator.club \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email admin@dndgenerator.club

echo "✅ SSL certificate installed!"
echo "🌐 Your site is now available at:"
echo "   https://dndgenerator.club"
echo "   https://www.dndgenerator.club"

# Test auto-renewal
certbot renew --dry-run

echo "✅ SSL auto-renewal configured!"
