# Base image
FROM node:22-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Build the application
RUN pnpm run build

# Production image
FROM node:22-alpine AS production

# Set NODE_ENV environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and lock files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Define the command to run the app
CMD ["node", "dist/main"]

# Expose the port the app runs on
EXPOSE 3000 