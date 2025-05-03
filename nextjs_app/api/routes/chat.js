const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatController = require('../controllers/chatController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only certain file types
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, JPG, JPEG, and PNG are allowed.'));
    }
  }
});

// Chat session routes
router.post('/sessions', auth, chatController.createSession);
router.get('/sessions/:userId', auth, chatController.getUserSessions);
router.get('/sessions/:id', auth, chatController.getSession);
router.post('/sessions/:id/messages', auth, chatController.addMessage);
router.post('/sessions/:id/process', auth, chatController.processMessage);
router.delete('/sessions/:id', auth, chatController.deleteSession);

// File upload route
router.post('/sessions/:id/files', auth, upload.single('file'), async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }
    
    // Check if session exists and belongs to user
    const session = await req.prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: req.user.id
      }
    });
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat session not found'
      });
    }
    
    // Save file info to database
    const uploadedFile = await req.prisma.uploadedFile.create({
      data: {
        sessionId,
        fileName: req.file.originalname,
        filePath: req.file.path
      }
    });
    
    res.status(201).json({
      status: 'success',
      message: 'File uploaded successfully',
      file: uploadedFile
    });
  } catch (error) {
    console.error('Upload file error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload file',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
