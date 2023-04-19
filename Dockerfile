# Use the official Node.js image as a base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Set environment variables for the Postgres database
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=arohyadav \
    POSTGRES_DB=mydb \
    POSTGRES_HOST=postgres

# Expose the port that the application will run on
EXPOSE 8000

# Start the Node.js app
CMD ["node", "index"]

