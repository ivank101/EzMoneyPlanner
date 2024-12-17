import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    try {
      const { id, ...data } = req.body;
      const docRef = doc(db, 'items', id);
      await updateDoc(docRef, data);
      res.status(200).json({ id });
    } catch (e) {
      res.status(500).json({ error: 'Error updating document' });
    }
  } else {
    res.status(405).end();
  }
}
