const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../db');

const router = express.Router();

router.get('/library', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT book_id, status FROM user_books WHERE user_id = $1',
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/library', authMiddleware, async (req, res) => {
  const { bookId, status } = req.body;
  if (!bookId) return res.status(400).json({ message: 'bookId обязателен' });
  try {
    await pool.query(
      'INSERT INTO user_books (user_id, book_id, status) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [req.userId, bookId, status || null]
    );
    res.status(201).json({ message: 'Книга добавлена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.put('/library/:bookId', authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;
  try {
    await pool.query(
      'UPDATE user_books SET status = $1 WHERE user_id = $2 AND book_id = $3',
      [status, req.userId, bookId]
    );
    res.json({ message: 'Статус обновлён' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.delete('/library/:bookId', authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  try {
    await pool.query(
      'DELETE FROM user_books WHERE user_id = $1 AND book_id = $2',
      [req.userId, bookId]
    );
    res.json({ message: 'Книга удалена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT book_id FROM user_favorites WHERE user_id = $1',
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/favorites', authMiddleware, async (req, res) => {
  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ message: 'bookId обязателен' });
  try {
    await pool.query(
      'INSERT INTO user_favorites (user_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.userId, bookId]
    );
    res.status(201).json({ message: 'Добавлено в избранное' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.delete('/favorites/:bookId', authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  try {
    await pool.query(
      'DELETE FROM user_favorites WHERE user_id = $1 AND book_id = $2',
      [req.userId, bookId]
    );
    res.json({ message: 'Удалено из избранного' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;