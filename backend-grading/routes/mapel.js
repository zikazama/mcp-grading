const express = require('express');
const router = express.Router();

// In-memory database
let mapel = [];
let idCounter = 1;

/**
 * @swagger
 * tags:
 *   name: Mapel
 *   description: Manajemen data mata pelajaran
 */

/**
 * @swagger
 * /mapel:
 *   get:
 *     summary: Mendapatkan daftar semua mata pelajaran
 *     tags: [Mapel]
 *     responses:
 *       200:
 *         description: Daftar mata pelajaran
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mapel'
 */
router.get('/', (req, res) => {
  res.json(mapel);
});

/**
 * @swagger
 * /mapel:
 *   post:
 *     summary: Menambah mata pelajaran baru
 *     tags: [Mapel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MapelInput'
 *     responses:
 *       201:
 *         description: Mata pelajaran berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mapel'
 */
router.post('/', (req, res) => {
  const { nama } = req.body;
  const newMapel = { id: idCounter++, nama };
  mapel.push(newMapel);
  res.status(201).json(newMapel);
});

/**
 * @swagger
 * /mapel/{id}:
 *   get:
 *     summary: Mendapatkan detail mata pelajaran berdasarkan ID
 *     tags: [Mapel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID mata pelajaran
 *     responses:
 *       200:
 *         description: Detail mata pelajaran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mapel'
 *       404:
 *         description: Mata pelajaran tidak ditemukan
 */
router.get('/:id', (req, res) => {
  const found = mapel.find(m => m.id === parseInt(req.params.id));
  if (!found) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
  res.json(found);
});

/**
 * @swagger
 * /mapel/{id}:
 *   put:
 *     summary: Memperbarui data mata pelajaran
 *     tags: [Mapel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID mata pelajaran
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MapelInput'
 *     responses:
 *       200:
 *         description: Mata pelajaran berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mapel'
 *       404:
 *         description: Mata pelajaran tidak ditemukan
 */
router.put('/:id', (req, res) => {
  const idx = mapel.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
  mapel[idx].nama = req.body.nama;
  res.json(mapel[idx]);
});

/**
 * @swagger
 * /mapel/{id}:
 *   delete:
 *     summary: Menghapus mata pelajaran
 *     tags: [Mapel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID mata pelajaran
 *     responses:
 *       204:
 *         description: Mata pelajaran berhasil dihapus
 *       404:
 *         description: Mata pelajaran tidak ditemukan
 */
router.delete('/:id', (req, res) => {
  const idx = mapel.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
  mapel.splice(idx, 1);
  res.status(204).send();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Mapel:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nama:
 *           type: string
 *     MapelInput:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *       required:
 *         - nama
 */

module.exports = router; 