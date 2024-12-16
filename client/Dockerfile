# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json /app
COPY package-lock.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . /app

# Build the React app
RUN npm run build

# Serve the built app
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port
EXPOSE 3000
