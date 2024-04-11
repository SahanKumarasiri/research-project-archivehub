# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which the React application will run
EXPOSE 3000

# Set the environment variable for serving the production build
ENV NODE_ENV=production

# Run the React application
CMD ["npm", "start"]
