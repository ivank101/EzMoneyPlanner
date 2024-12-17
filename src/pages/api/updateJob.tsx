import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { userId, jobName } = req.body;

    if (!userId || !jobName) {
      res.status(400).json({ error: 'Missing userId or jobName' });
      return;
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        JobName: jobName,
      });
      res.status(200).json({ message: 'Job name updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating job name' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
