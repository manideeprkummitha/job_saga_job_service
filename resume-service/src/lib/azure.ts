import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!accountName || !sasToken || !containerName) {
  throw new Error('Azure storage account name, SAS token, and container name must be provided');
}

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

export const uploadToBlob = async (buffer: Buffer, blobName: string, contentType: string) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  });
  return blockBlobClient.url;
};
