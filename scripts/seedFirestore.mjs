import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGm_kwVMTL8G5ouzaE3ZvR0Uha8E_NS-g',
  authDomain: 'barbearia-pocam.firebaseapp.com',
  projectId: 'barbearia-pocam',
  storageBucket: 'barbearia-pocam.firebasestorage.app',
  messagingSenderId: '1067636686295',
  appId: '1:1067636686295:web:660f59363df95f97575f92',
  measurementId: 'G-VP93HFQ85Y',
};

const seed = JSON.parse(readFileSync(new URL('../firestore.seed.json', import.meta.url), 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedCollection(collectionName, records) {
  const writes = Object.entries(records).map(([id, data]) =>
    setDoc(
      doc(db, collectionName, id),
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
  );

  await Promise.all(writes);
  console.log(`Seeded ${collectionName}: ${writes.length} docs`);
}

await seedCollection('services', seed.services);
await seedCollection('barbers', seed.barbers);
await seedCollection('plans', seed.plans);

console.log('Firestore seed complete.');
