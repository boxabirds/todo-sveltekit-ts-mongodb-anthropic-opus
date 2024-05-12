// src/routes/todos/+server.ts
import type { RequestHandler } from './$types';
import { connectToDatabase } from '$lib/db';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async () => {
  const db = await connectToDatabase();
  const todos = await db.collection('todos').find().toArray();
  return new Response(JSON.stringify({ todos }));
};

export const POST: RequestHandler = async ({ request }) => {
  const db = await connectToDatabase();
  const data = await request.json();
  const result = await db.collection('todos').insertOne(data);
  return new Response(JSON.stringify({ _id: result.insertedId }));
};

export const PUT: RequestHandler = async ({ request }) => {
  const db = await connectToDatabase();
  const data = await request.json();
  await db.collection('todos').updateOne(
    { _id: new ObjectId(data._id) },
    { $set: { completed: data.completed } }
  );
  return new Response(null, { status: 204 });
};

export const DELETE: RequestHandler = async ({ request }) => {
  const db = await connectToDatabase();
  const data = await request.json();
  await db.collection('todos').deleteOne({ _id: new ObjectId(data._id) });
  return new Response(null, { status: 204 });
};