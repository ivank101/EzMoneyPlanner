import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
}
