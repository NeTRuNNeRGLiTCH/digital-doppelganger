FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Hugging Face Spaces serves on port 7860 by default
ENV PORT=7860

EXPOSE 7860

CMD ["node", "server.js"]