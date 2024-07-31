# Build Stage
FROM node:18-alpine as artkyaimage

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies using npm ci
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the build

# Production Stage
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=artkyaimage /app/build /usr/share/nginx/html

# Copy custom nginx configuration file
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which Nginx is running
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]