import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const version = '1.0.0';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (_, res) => {
  res.json({ version, error: 0 });
});

export default handler;
