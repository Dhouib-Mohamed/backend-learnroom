# First stage: Install dependencies
FROM node:18 as dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Second stage: Build the application
FROM dependencies as build

WORKDIR /app

COPY . .

RUN npm run build

# Third stage: Export and run the application
FROM node:18-alpine as release

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=dependencies /app/node_modules ./node_modules

COPY package.json .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]