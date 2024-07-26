// import type { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import nextConnect from 'next-connect';
// import { uploadToBlob } from '../../../../lib/azure';
// import { saveResumeDetails, getResumeById, updateResume, deleteResume, connectDB } from '../../../../services/mongoService';

// // Multer configuration
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// const uploadMiddleware = upload.single('resume');

// // Type definitions for middleware
// interface ExtendedRequest extends NextApiRequest {
//   file: Express.Multer.File;
// }

// const handler = nextConnect<NextApiRequest, NextApiResponse>({
//   onError: (err, req, res) => {
//     console.error("Error in handler: ", err);
//     res.status(500).end(`Something went wrong! ${(err as Error).toString()}`);
//   },
//   onNoMatch: (req, res) => {
//     res.status(405).end('Method not allowed');
//   },
// });

// handler.use((req, res, next) => {
//   uploadMiddleware(req as any, res as any, (err: any) => {
//     if (err) {
//       console.error("Error in uploadMiddleware: ", err);
//       return res.status(500).send(`Error uploading file: ${err.message}`);
//     }
//     next();
//   });
// });

// handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
//   await connectDB();

//   const { userId } = req.query;
//   const { resumeName, jobPosition, company } = req.body;
//   const file = req.file;

//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   try {
//     const blobUrl = await uploadToBlob(file.buffer, `${userId}/${file.originalname}`, file.mimetype);
//     await saveResumeDetails({
//       userId: userId as string,
//       resumeName,
//       resumeDocument: blobUrl,
//       jobPosition,
//       company,
//     });

//     res.status(200).send('Resume uploaded and details saved successfully.');
//   } catch (error) {
//     console.error("Error in POST handler: ", error);
//     res.status(500).send(`Error uploading resume: ${(error as Error).message}`);
//   }
// });

// handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectDB();
//   const { userId, resumeId } = req.query;

//   try {
//     const resume = await getResumeById(userId as string, resumeId as string);
//     if (resume) {
//       res.status(200).json(resume);
//     } else {
//       res.status(404).json({ message: 'Resume not found' });
//     }
//   } catch (error) {
//     console.error("Error in GET handler: ", error);
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectDB();
//   const { resumeId } = req.query;

//   try {
//     const updatedResume = await updateResume(resumeId as string, req.body);
//     res.status(200).json(updatedResume);
//   } catch (error) {
//     console.error("Error in PUT handler: ", error);
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectDB();
//   const { resumeId } = req.query;

//   try {
//     await deleteResume(resumeId as string);
//     res.status(200).json({ message: 'Resume deleted successfully' });
//   } catch (error) {
//     console.error("Error in DELETE handler: ", error);
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

// export default handler;
