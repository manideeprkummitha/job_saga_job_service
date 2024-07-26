// import { containerClient } from '@/lib/azure';
// import { BlockBlobClient } from '@azure/storage-blob';

// export const uploadToBlob = async (fileBuffer: Buffer, fileName: string, mimetype: string): Promise<string> => {
//   const blockBlobClient = containerClient.getBlockBlobClient(fileName);
//   await blockBlobClient.uploadData(fileBuffer, {
//     blobHTTPHeaders: { blobContentType: mimetype },
//   });
//   return blockBlobClient.url;
// };
