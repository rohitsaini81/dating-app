// upload.js
import AWS from 'aws-sdk';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudflare R2
const s3 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY,
  secretAccessKey: process.env.R2_SECRET_KEY,
  signatureVersion: 'v4',
});

// Download file to a temp path
async function downloadFileTemp(url, savePath) {
  try {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(savePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ File downloaded: ${savePath}`);
        resolve(savePath);
      });
      writer.on('error', (err) => {
        console.error(`❌ Download error: ${err}`);
        reject(null);
      });
    });
  } catch (error) {
    console.error(`❌ Failed to download: ${error.message}`);
    return null;
  }
}

// Upload to R2 and delete local file
async function uploadFile(filePath) {
  try {
    const bucketName = process.env.R2_BUCKET_NAME;
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    };

    await s3.putObject(params).promise();

    // Construct the public URL
    const fileUrl = `https://pub-a919e0e7442047299d7072ac1b2ab5d0.r2.dev/${fileName}`;
    console.log(`📌 File URL: ${fileUrl}`);

    // Delete temp file
    fs.unlinkSync(filePath);
    console.log(`🗑️ File deleted: ${filePath}`);

    return fileName;
  } catch (error) {
    console.error(`❌ Upload error: ${error.message}`);
  }
}

// Example usage
// const fileUrl = 'https://videos.pexels.com/video-files/3196174/3196174-uhd_2560_1440_25fps.mp4';
// const savePath = '/tmp/temp_video.mp4';

// (async () => {
//   const downloaded = await downloadFileTemp(fileUrl, savePath);
//   if (downloaded) {
//     await uploadFile(downloaded);
//   }
// })();
