# Selecting the base image
FROM node:19-alpine

# Setting the working directory
WORKDIR /app

# Copying the package.json and package-lock.json files
# we copy the files to ./ (working directory, in this case /app)
COPY ["package.json", "yarn.lock", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
