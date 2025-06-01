
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const auth = require('../middleware/auth');
const PDF = require('../models/PDF');
const router = express.Router();

const mongoURI = process.env.MONGO_URI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs and bucket for streaming files
let gfs, bucket;
conn.once('open', () => {
  bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'pdfs'
  });
  gfs = bucket;
});

// Setup multer storage with GridFS
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        resolve({
          filename: filename,
          bucketName: 'pdfs'
        });
      });
    });
  }
});


const upload = multer({ storage });

router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  const pdf = await PDF.create({
    name: req.file.originalname,
      fileId: req.file.id,
    owner: req.user.id
  });
  res.json(pdf);
});

router.get('/dashboard', auth, async (req, res) => {
  const pdfs = await PDF.find({ owner: req.user.id });
  res.json(pdfs);
});

router.get('/file/:id', async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const pdf = await PDF.findOne({ fileId });

    if (!pdf) return res.status(404).send('PDF not found');

    const downloadStream = bucket.openDownloadStream(fileId);

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename="${pdf.name}"`);

    downloadStream.pipe(res);

    downloadStream.on('error', () => {
      res.status(404).send('File not found');
    });

  } catch (err) {
    res.status(400).send('Invalid file id');
  }
});

const sendInviteEmail = require('../utils/mailer');

router.post('/share/:id', auth, async (req, res) => {
  const { email } = req.body;
  const pdf = await PDF.findById(req.params.id);

  if (!pdf.sharedWith.includes(email)) {
    pdf.sharedWith.push(email);
    await pdf.save();
  }

  const link = `https://pdfcollaboration1.vercel.app/shared/${pdf._id}?email=${email}`;
  await sendInviteEmail(email, link);

  res.json({ message: 'Invite sent', link });
});


router.get('/shared/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;
  const pdf = await PDF.findById(id);
  if (pdf.sharedWith.includes(email)) {
    res.json(pdf);
  } else {
    res.status(403).send("Access denied");
  }
});

router.post('/comment/:id', async (req, res) => {
  const pdf = await PDF.findById(req.params.id);
  pdf.comments.push({ email: req.body.email, text: req.body.text });
  await pdf.save();
  res.json(pdf.comments);
});
router.delete('/delete/:id', auth, async (req, res) => {
  const pdf = await PDF.findById(req.params.id);
  if (!pdf) return res.status(404).send("PDF not found");
  if (pdf.owner.toString() !== req.user.id) return res.status(403).send("Unauthorized");

  await pdf.deleteOne();
  res.send({ message: "PDF deleted" });
});


module.exports = router;
