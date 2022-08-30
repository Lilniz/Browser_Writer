import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const contentDb = await openDB('jate', 1);
  const wx = contentDb.transaction('jate', 'readwrite');
  const store = wx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
}

export const getDb = async () => {
  const contentDb = await openDB('jate', 1);
  const wx = contentDb.transaction('jate', 'readonly');
  const store = wx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  return result.value;
}

initdb();
