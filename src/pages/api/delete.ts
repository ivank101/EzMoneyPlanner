import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const docRef = doc(db, 'items', id);
      await deleteDoc(docRef);
      res.status(200).json({ id });
    } catch (e) {
      res.status(500).json({ error: 'Error deleting document' });
    }
  } else {
    res.status(405).end();
  }
}
