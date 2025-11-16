import { S3Client } from '@aws-sdk/client-s3';
import loadEnvConfig from './loadDotenv.util.js';

loadEnvConfig()

export const endpoint = process.env.R2_ENDPOINT;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

const s3CompatibleClient = await new S3Client({
  region: 'auto',
  endpoint: endpoint,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export default s3CompatibleClient;
