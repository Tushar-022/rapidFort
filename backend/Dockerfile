# Use Node.js base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire backend code
COPY . .

# Expose the backend port (e.g., 5000)
EXPOSE 5000

# Start the Node.js backend
CMD ["npm", "start"]
