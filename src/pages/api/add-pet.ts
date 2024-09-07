import { NextApiResponse, NextApiRequest } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {

  const client = await pool.connect();

  try {
    
    const petName = request.query.petName as string;
    const ownerName = request.query.ownerName as string;
    if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await client.query(`CREATE TABLE IF NOT EXISTS Pets (
      ID SERIAL PRIMARY KEY,
      Name VARCHAR(100),
      Owner VARCHAR(100)
    )`);
await client.query(`INSERT INTO Pets (Name, Owner) VALUES ($1, $2)`, [petName, ownerName]);
  } catch (error) {
    return response.status(500).json({ error: (error as Error)?.message || 'An unknown error occurred' });
  } finally {
    // Release the client back to the pool instead of closing the connection
    client.release();
  }

  try {
    const result = await client.query('SELECT * FROM Pets');
    const pets = result.rows;
    return response.status(200).json({ pets });
  } catch (error) {
    return response.status(500).json({ error: (error as Error)?.message || 'An unknown error occurred' });
  }
}