const express = require('express');
const router = express.Router();

// In-memory database
let siswa = [];
let idCounter = 1;

/**
 * @swagger
 * tags:
 *   name: Siswa
 *   description: Manajemen data siswa
 */

/**
 * @swagger
 * /siswa:
 *   get:
 *     summary: Mendapatkan daftar semua siswa
 *     tags: [Siswa]
 *     responses:
 *       200:
 *         description: Daftar siswa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Siswa'
 */
router.get('/', (req, res) => {
  res.json(siswa);
});

/**
 * @swagger
 * /siswa:
 *   post:
 *     summary: Menambah siswa baru
 *     tags: [Siswa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SiswaInput'
 *     responses:
 *       201:
 *         description: Siswa berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siswa'
 */
router.post('/', (req, res) => {
  const { nama } = req.body;
  const newSiswa = { id: idCounter++, nama };
  siswa.push(newSiswa);
  res.status(201).json(newSiswa);
});

/**
 * @swagger
 * /siswa/{id}:
 *   get:
 *     summary: Mendapatkan detail siswa berdasarkan ID
 *     tags: [Siswa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID siswa
 *     responses:
 *       200:
 *         description: Detail siswa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siswa'
 *       404:
 *         description: Siswa tidak ditemukan
 */
router.get('/:id', (req, res) => {
  const found = siswa.find(s => s.id === parseInt(req.params.id));
  if (!found) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  res.json(found);
});

/**
 * @swagger
 * /siswa/{id}:
 *   put:
 *     summary: Memperbarui data siswa
 *     tags: [Siswa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID siswa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SiswaInput'
 *     responses:
 *       200:
 *         description: Siswa berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siswa'
 *       404:
 *         description: Siswa tidak ditemukan
 */
router.put('/:id', (req, res) => {
  const idx = siswa.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  siswa[idx].nama = req.body.nama;
  res.json(siswa[idx]);
});

/**
 * @swagger
 * /siswa/{id}:
 *   delete:
 *     summary: Menghapus siswa
 *     tags: [Siswa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID siswa
 *     responses:
 *       204:
 *         description: Siswa berhasil dihapus
 *       404:
 *         description: Siswa tidak ditemukan
 */
router.delete('/:id', (req, res) => {
  const idx = siswa.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  siswa.splice(idx, 1);
  res.status(204).send();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Siswa:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nama:
 *           type: string
 *     SiswaInput:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *       required:
 *         - nama
 */

module.exports = router; 