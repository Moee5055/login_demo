import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: [
      'https://faceboook-dreammotors.netlify.app',
      'http://localhost:5173',
    ], // Include your Vite dev server port (usually 5173)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

(async function () {
  try {
    await prisma.$connect();
    console.log('mongodb connection succesfull');
  } catch (error) {
    console.error(`Error connecting to db:`, error);
  } finally {
    await prisma.$disconnect();
  }
})();

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
