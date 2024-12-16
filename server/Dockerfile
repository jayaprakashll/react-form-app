FROM node:20
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Command to run the server
CMD ["node", "server.js"]
