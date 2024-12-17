import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const docRef = await addDoc(collection(db, 'items'), req.body);
      res.status(201).json({ id: docRef.id });
    } catch (e) {
      res.status(500).json({ error: 'Error adding document' });
    }
  } else {
    res.status(405).end();
  }
}
