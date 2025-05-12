/**
 * Chat Controller for handling chat sessions and messages
 */

/**
 * Create a new chat session
 */
exports.createSession = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Create a new chat session
    const session = await req.prisma.chatSession.create({
      data: {
        userId,
        sessionName: req.body.sessionName || `Session ${new Date().toLocaleDateString()}`
      }
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Chat session created',
      session
    });
  } catch (error) {
    console.error('Create chat session error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create chat session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get all chat sessions for a user
 */
exports.getUserSessions = async (req, res) => {
  try {
    // Use the authenticated user's ID from the request object
    const userId = req.user.id;
    
    // Get all sessions for the user
    const sessions = await req.prisma.chatSession.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { startedAt: 'desc' },
      include: {
        _count: {
          select: { messages: true }
        }
      }
    });
    
    res.json({
      status: 'success',
      sessions
    });
  } catch (error) {
    console.error('Get user sessions error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve chat sessions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get a specific chat session with its messages
 */
exports.getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Get session with messages
    const session = await req.prisma.chatSession.findUnique({
      where: { id: parseInt(sessionId) },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        },
        files: true
      }
    });
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat session not found'
      });
    }
    
    res.json({
      status: 'success',
      session
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve chat session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Add a message to a chat session
 */
exports.addMessage = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message, sender } = req.body;
    
    // Validate sender
    if (!['user', 'bot'].includes(sender)) {
      return res.status(400).json({
        status: 'error',
        message: "Sender must be either 'user' or 'bot'"
      });
    }
    
    // Check if session exists
    const session = await req.prisma.chatSession.findUnique({
      where: { id: parseInt(sessionId) }
    });
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat session not found'
      });
    }
    
    // Add message to session
    const newMessage = await req.prisma.chatMessage.create({
      data: {
        sessionId: parseInt(sessionId),
        sender,
        message
      }
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Message added successfully',
      chatMessage: newMessage
    });
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Process a user message and generate AI response
 */
exports.processMessage = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    
    // Check if session exists
    const session = await req.prisma.chatSession.findUnique({
      where: { id: parseInt(sessionId) }
    });
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat session not found'
      });
    }
    
    // Save user message
    await req.prisma.chatMessage.create({
      data: {
        sessionId: parseInt(sessionId),
        sender: 'user',
        message
      }
    });
    
    // TODO: Process with AI and generate response
    // This is a placeholder - in a real implementation, you would call your AI service here
    const aiResponse = `This is a placeholder AI response to: "${message}". In a production environment, this would be processed by an AI service.`;
    
    // Save AI response
    const botMessage = await req.prisma.chatMessage.create({
      data: {
        sessionId: parseInt(sessionId),
        sender: 'bot',
        message: aiResponse
      }
    });
    
    res.json({
      status: 'success',
      userMessage: message,
      botResponse: botMessage
    });
  } catch (error) {
    console.error('Process message error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Delete a chat session
 */
exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Check if session exists
    const session = await req.prisma.chatSession.findUnique({
      where: { id: parseInt(sessionId) }
    });
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat session not found'
      });
    }
    
    // Delete session (cascade will delete messages and files)
    await req.prisma.chatSession.delete({
      where: { id: parseInt(sessionId) }
    });
    
    res.json({
      status: 'success',
      message: 'Chat session deleted successfully'
    });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete chat session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
