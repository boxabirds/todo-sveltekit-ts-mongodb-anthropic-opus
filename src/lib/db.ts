import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'todoapp';

let client: MongoClient;

export async function connectToDatabase() {
  client = await MongoClient.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  return client.db(DB_NAME);
}

export function getClient() {
  return client;
}