FROM node:12.2.0-alpine
WORKDIR index
COPY . .
RUN npm install
RUN npm run test
EXPOSE 8000
CMD ["node","index.js"]
