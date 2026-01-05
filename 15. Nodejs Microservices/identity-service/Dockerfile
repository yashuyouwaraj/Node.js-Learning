# use the official node.js 18 image with alpine linux as the base image

FROM node:19-apline

# set the working directory inside the container
WORKDIR /use/src/app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# install production dependencies
RUN npm ci --only=production

# copy the rest of the application code to the working directory
COPY . .

# expose port 3000 to the outside world
EXPOSE 3001

# start the application
CMD ["node", "server.js"]