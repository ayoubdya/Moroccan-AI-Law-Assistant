import { PrismaClient, Chat, Sender } from "../generated/prisma";
const prisma = new PrismaClient();

export const chatService = {
  async create(data: {
    userId: string;
    sessionId: string;
    sender: Sender;
    message: string;
  }): Promise<Chat> {
    return prisma.chat.create({
      data: {
        userId: data.userId,
        sessionId: data.sessionId,
        sender: data.sender,
        message: data.message,
      },
    });
  },

  async findBySession(sessionId: string): Promise<Chat[]> {
    return prisma.chat.findMany({
      where: { sessionId },
      orderBy: { sentAt: "asc" },
      include: { user: true },
    });
  },

  async findRecentByUser(userId: string, limit = 20): Promise<Chat[]> {
    return prisma.chat.findMany({
      where: { userId },
      orderBy: { sentAt: "desc" },
      take: limit,
      include: { season: true },
    });
  },

  async delete(id: string): Promise<Chat> {
    return prisma.chat.delete({ where: { id } });
  },
};
