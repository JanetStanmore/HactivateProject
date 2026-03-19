# Alpine Node.js 18 - minimal image for fast codespace startup
FROM node:18-alpine

WORKDIR /workspace

# Install only essential tools
RUN apk add --no-cache git curl bash

# Set npm to production for faster installs
ENV NODE_ENV=development

# Create non-root user for security
USER node

WORKDIR /workspace