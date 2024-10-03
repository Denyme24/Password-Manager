# Use the official Node.js image as the base image
FROM node:16-alpine

# Create and set the working directory for the backend
WORKDIR /usr/src/app

# Copy the wait-for-mongo.sh script into the container
COPY wait-for-mongo.sh /usr/src/app/wait-for-mongo.sh
RUN chmod +x /usr/src/app/wait-for-mongo.sh

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Copy the .env file
COPY .env .env

# Expose the backend port
EXPOSE 3000

# Use wait-for-mongo.sh script to wait for MongoDB to be ready before starting the app
CMD ["./wait-for-mongo.sh", "mongodb://mongodb:27017", "--", "npm", "start"]
