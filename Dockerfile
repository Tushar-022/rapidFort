# # Use an official Node.js runtime as the base image
# FROM node:20-alpine

# # Set working directory in the container
# WORKDIR /app

# # Copy only package files first to leverage Docker's cache
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm ci --only=production

# # Copy the rest of the application code
# COPY . .

# # Expose the application's port
# EXPOSE 5000

# # Start the application
# CMD ["npm", "start"]


# Use a Node.js base image
FROM node:lts-alpine AS builder

# Set working directory to /app
WORKDIR /app

# Copy frontend and backend package.json files
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY backend/package.json backend/package-lock.json ./backend/

# Install dependencies for both frontend and backend
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy the entire frontend and backend code
COPY frontend/ ./frontend
COPY backend/ ./backend

# Build the frontend for production
RUN cd frontend && npm run build

# Serve the frontend and backend
WORKDIR /app
CMD ["npm", "start"]
