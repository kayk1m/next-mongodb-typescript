import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect, { NextHandler } from 'next-connect';

import { DB_URI, DB_NAME } from '../../defines';

// Type definition - add client and db to req. (typescript only)
interface RequestWithDbInfo extends NextApiRequest {
  client: MongoClient;
  db: Db;
}

// Temp variables (대문자 치기가 어려워서...)
const uri = DB_URI;
const dbName = DB_NAME;

// Can't fint DB information
if (!uri || !dbName) {
  throw new Error('Insufficient DB Info');
}

// Create new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connecting MongoDb
const database = async (
  req: RequestWithDbInfo,
  _res: NextApiResponse,
  next: NextHandler,
) => {
  if (!client.isConnected()) await client.connect();
  req.client = client;
  req.db = client.db(dbName);

  return next();
};

// Request handler using next-connect.js
const handler = nextConnect<RequestWithDbInfo, NextApiResponse>();

handler.use(database);

export default handler;
