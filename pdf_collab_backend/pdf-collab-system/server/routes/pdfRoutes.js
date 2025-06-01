
const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const PDF = require('../models/PDF');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  const pdf = await PDF.create({
    name: req.file.originalname,
    filePath: `/uploads/${req.file.filename}`,
    owner: req.user.id
  });
  res.json(pdf);
});

router.get('/dashboard', auth, async (req, res) => {
  const pdfs = await PDF.find({ owner: req.user.id });
  res.json(pdfs);
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
