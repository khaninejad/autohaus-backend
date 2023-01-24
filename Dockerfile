FROM node:18-alpine

# Set the working directory
WORKDIR /src

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Expose the port that the application runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
