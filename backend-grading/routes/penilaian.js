const express = require('express');
const router = express.Router();

// In-memory database
let penilaian = [];
let idCounter = 1;

/**
 * @swagger
 * tags:
 *   name: Penilaian
 *   description: Manajemen data penilaian siswa
 */

/**
 * @swagger
 * /penilaian:
 *   get:
 *     summary: Mendapatkan daftar semua penilaian
 *     tags: [Penilaian]
 *     responses:
 *       200:
 *         description: Daftar penilaian
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Penilaian'
 */
router.get('/', (req, res) => {
  res.json(penilaian);
});

/**
 * @swagger
 * /penilaian:
 *   post:
 *     summary: Menambah penilaian baru
 *     tags: [Penilaian]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PenilaianInput'
 *     responses:
 *       201:
 *         description: Penilaian berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Penilaian'
 */
router.post('/', (req, res) => {
  const { siswaId, mapelId, nilai } = req.body;
  const newPenilaian = { id: idCounter++, siswaId, mapelId, nilai };
  penilaian.push(newPenilaian);
  res.status(201).json(newPenilaian);
});

/**
 * @swagger
 * /penilaian/{id}:
 *   get:
 *     summary: Mendapatkan detail penilaian berdasarkan ID
 *     tags: [Penilaian]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID penilaian
 *     responses:
 *       200:
 *         description: Detail penilaian
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Penilaian'
 *       404:
 *         description: Penilaian tidak ditemukan
 */
router.get('/:id', (req, res) => {
  const found = penilaian.find(p => p.id === parseInt(req.params.id));
  if (!found) return res.status(404).json({ message: 'Penilaian tidak ditemukan' });
  res.json(found);
});

/**
 * @swagger
 * /penilaian/{id}:
 *   put:
 *     summary: Memperbarui data penilaian
 *     tags: [Penilaian]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID penilaian
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PenilaianInput'
 *     responses:
 *       200:
 *         description: Penilaian berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Penilaian'
 *       404:
 *         description: Penilaian tidak ditemukan
 */
router.put('/:id', (req, res) => {
  const idx = penilaian.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Penilaian tidak ditemukan' });
  penilaian[idx] = { ...penilaian[idx], ...req.body };
  res.json(penilaian[idx]);
});

/**
 * @swagger
 * /penilaian/{id}:
 *   delete:
 *     summary: Menghapus penilaian
 *     tags: [Penilaian]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID penilaian
 *     responses:
 *       204:
 *         description: Penilaian berhasil dihapus
 *       404:
 *         description: Penilaian tidak ditemukan
 */
router.delete('/:id', (req, res) => {
  const idx = penilaian.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Penilaian tidak ditemukan' });
  penilaian.splice(idx, 1);
  res.status(204).send();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Penilaian:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         siswaId:
 *           type: integer
 *         mapelId:
 *           type: integer
 *         nilai:
 *           type: number
 *     PenilaianInput:
 *       type: object
 *       properties:
 *         siswaId:
 *           type: integer
 *         mapelId:
 *           type: integer
 *         nilai:
 *           type: number
 *       required:
 *         - siswaId
 *         - mapelId
 *         - nilai
 */

module.exports = router; 