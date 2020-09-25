import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';

import connectMongoDB from '../../lib/middlewares/mongodb';

// Type definition - add client and db to req. (typescript only)
interface RequestWithDbInfo extends NextApiRequest {
  client: MongoClient;
  db: Db;
}

// Using different collections depends on it's environment (development or production)
const collectionName = process.env.NODE_ENV === 'production' ? 'memo' : 'test';

// Request handler using next-connect.js
const handler = nextConnect<RequestWithDbInfo, NextApiResponse>();

// Connect mongodb by using a middleware.
handler.use(connectMongoDB);

// Handling HTTP Request GET /api/artwork
handler.get(async (req, res) => {
  try {
    // Wait until recieving finish
    const data = await new Promise((resolve, reject) => {
      req.db
        .collection(collectionName)
        .find({})
        .toArray((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
    });
    return res.json(data);
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

// Handling HTTP Request POST /api/artwork (accepts json data)
handler.post(async (req, res) => {
  const { name, content } = req.body;
  if (!name) return res.json({ error: 'Name field is required!' });
  try {
    // Wait until recieving finish
    await new Promise((resolve, reject) => {
      req.db.collection(collectionName).insertOne(
        {
          name,
          content,
        },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
    return res.json({ error: 0 });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
