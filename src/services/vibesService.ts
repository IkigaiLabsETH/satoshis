import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateVibeData {
  content: string;
  source?: string;
  userId?: string;
  category?: string;
}

export interface VibeData {
  id: string;
  content: string;
  source: string;
  userId: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class VibesService {
  /**
   * Add a new vibe to the database
   */
  static async addVibe(data: CreateVibeData): Promise<VibeData> {
    try {
      const vibe = await prisma.vibe.create({
        data: {
          content: data.content,
          source: data.source || 'user',
          userId: data.userId || 'default',
          category: data.category || 'personality_influence',
        },
      });

      return vibe;
    } catch {
      // Error adding vibe to database
      throw new Error('Failed to add vibe to database');
    }
  }

  /**
   * Get all active vibes for a user
   */
  static async getVibes(userId: string = 'default'): Promise<VibeData[]> {
    try {
      const vibes = await prisma.vibe.findMany({
        where: {
          userId,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return vibes;
    } catch {
      // Error fetching vibes from database
      throw new Error('Failed to fetch vibes from database');
    }
  }

  /**
   * Get vibes by category
   */
  static async getVibesByCategory(category: string, userId: string = 'default'): Promise<VibeData[]> {
    try {
      const vibes = await prisma.vibe.findMany({
        where: {
          userId,
          category,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return vibes;
    } catch {
      // Error fetching vibes by category
      throw new Error('Failed to fetch vibes by category');
    }
  }

  /**
   * Soft delete a vibe (mark as inactive)
   */
  static async removeVibe(vibeId: string): Promise<boolean> {
    try {
      await prisma.vibe.update({
        where: { id: vibeId },
        data: { isActive: false },
      });

      return true;
    } catch {
      // Error removing vibe
      throw new Error('Failed to remove vibe');
    }
  }

  /**
   * Hard delete a vibe (permanently remove)
   */
  static async deleteVibe(vibeId: string): Promise<boolean> {
    try {
      await prisma.vibe.delete({
        where: { id: vibeId },
      });

      return true;
    } catch {
      // Error deleting vibe
      throw new Error('Failed to delete vibe');
    }
  }

  /**
   * Update a vibe's content
   */
  static async updateVibe(vibeId: string, content: string): Promise<VibeData> {
    try {
      const vibe = await prisma.vibe.update({
        where: { id: vibeId },
        data: { content },
      });

      return vibe;
    } catch {
      // Error updating vibe
      throw new Error('Failed to update vibe');
    }
  }

  /**
   * Get vibe statistics
   */
  static async getVibeStats(userId: string = 'default'): Promise<{
    total: number;
    active: number;
    byCategory: Record<string, number>;
  }> {
    try {
      const [total, active, categoryStats] = await Promise.all([
        prisma.vibe.count({ where: { userId } }),
        prisma.vibe.count({ where: { userId, isActive: true } }),
        prisma.vibe.groupBy({
          by: ['category'],
          where: { userId, isActive: true },
          _count: { category: true },
        }),
      ]);

      const byCategory = categoryStats.reduce((acc, stat) => {
        acc[stat.category] = stat._count.category;
        return acc;
      }, {} as Record<string, number>);

      return { total, active, byCategory };
    } catch {
      // Error fetching vibe stats
      throw new Error('Failed to fetch vibe stats');
    }
  }

  /**
   * Search vibes by content
   */
  static async searchVibes(query: string, userId: string = 'default'): Promise<VibeData[]> {
    try {
      const vibes = await prisma.vibe.findMany({
        where: {
          userId,
          isActive: true,
          content: {
            contains: query,
            mode: 'insensitive', // Case-insensitive search
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return vibes;
    } catch {
      // Error searching vibes
      throw new Error('Failed to search vibes');
    }
  }
} 