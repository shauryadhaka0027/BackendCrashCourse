const fs = require('fs');
const { createReadStream } = require('fs');
const { randomUUID, createCipheriv } = require('crypto');
const os = require('os');

const operation = process.argv[2];

function encryptText(text) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.alloc(32); 
  const iv = Buffer.alloc(16, 0); 

  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function generateUUID() {
  return randomUUID();
}

function readLargeFile(filePath) {
  const startTime = Date.now();
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file with fs.readFile:', err);
      return;
    }
    const endTime = Date.now();
    console.log(`Read file with fs.readFile in ${endTime - startTime} ms`);
  });

  const streamStartTime = Date.now();
  const stream = createReadStream(filePath, { encoding: 'utf8' });
  stream.on('data', () => {});
  stream.on('end', () => {
    const streamEndTime = Date.now();
    console.log(`Read file with stream in ${streamEndTime - streamStartTime} ms`);
  });
}

function printSystemInfo() {
  console.log('System Information:');
  console.log(`OS Platform: ${os.platform()}`);
  console.log(`OS Release: ${os.release()}`);
  console.log(`Free Memory: ${os.freemem()}`);
  console.log(`Total Memory: ${os.totalmem()}`);
  console.log(`CPU Info: ${JSON.stringify(os.cpus())}`);
}

switch (operation) {
  case 'encrypt':
    console.log('Encrypted Text:', encryptText('Hello, Good Morning'));
    console.log('UUID:', generateUUID());
    break;
  case 'readFile':
    const file = process.argv[3];
    if (!file) {
      console.log('Please provide a file path');
      break;
    }
    readLargeFile(file);
    break;
  case 'systemInfo':
    printSystemInfo();
    break;
  default:
    console.log('Invalid operation');
    break;
}
