#!/bin/bash
# SSL certificate setup for dndgenerator.fun

set -e

echo "🔐 Setting up SSL certificate for dndgenerator.fun..."

# Get SSL certificate from Let's Encrypt
certbot --nginx -d dndgenerator.fun -d www.dndgenerator.fun \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email admin@dndgenerator.fun

echo "✅ SSL certificate installed!"
echo "🌐 Your site is now available at:"
echo "   https://dndgenerator.fun"
echo "   https://www.dndgenerator.fun"

# Test auto-renewal
certbot renew --dry-run

echo "✅ SSL auto-renewal configured!"
