/**
 * News Controller for handling legal news
 */

/**
 * Get all legal news
 */
exports.getAllNews = async (req, res) => {
  try {
    // Get all news articles, ordered by publish date (newest first)
    const news = await req.prisma.legalNews.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    
    res.json({
      status: 'success',
      count: news.length,
      news
    });
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve legal news',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get a specific news article by ID
 */
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the news article
    const newsItem = await req.prisma.legalNews.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!newsItem) {
      return res.status(404).json({
        status: 'error',
        message: 'News article not found'
      });
    }
    
    res.json({
      status: 'success',
      news: newsItem
    });
  } catch (error) {
    console.error('Get news by ID error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve news article',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Create a new news article
 */
exports.createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        status: 'error',
        message: 'Title and content are required'
      });
    }
    
    // Create news article
    const newsItem = await req.prisma.legalNews.create({
      data: {
        title,
        content,
        publishedAt: new Date()
      }
    });
    
    res.status(201).json({
      status: 'success',
      message: 'News article created successfully',
      news: newsItem
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create news article',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Update a news article
 */
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    // Check if news article exists
    const existingNews = await req.prisma.legalNews.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingNews) {
      return res.status(404).json({
        status: 'error',
        message: 'News article not found'
      });
    }
    
    // Update news article
    const updatedNews = await req.prisma.legalNews.update({
      where: { id: parseInt(id) },
      data: {
        title: title || existingNews.title,
        content: content || existingNews.content
      }
    });
    
    res.json({
      status: 'success',
      message: 'News article updated successfully',
      news: updatedNews
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update news article',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Delete a news article
 */
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if news article exists
    const existingNews = await req.prisma.legalNews.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingNews) {
      return res.status(404).json({
        status: 'error',
        message: 'News article not found'
      });
    }
    
    // Delete news article
    await req.prisma.legalNews.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({
      status: 'success',
      message: 'News article deleted successfully'
    });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete news article',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
