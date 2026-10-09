/**
 * Promptwar Cloud Firestore Schema & Collection Names
 * This file defines the collection structures and standard data models for Promptwar.
 */

export const COLLECTIONS = {
  USERS: "users",
  PROMPTS: "prompts",
  BATTLES: "battles",
  VOTES: "votes",
  LEADERBOARD: "leaderboard",
  OTPS: "otps",
};

/**
 * Example Document Schemas:
 *
 * 1. User Document (users/{userId}):
 * {
 *   uid: string,
 *   username: string,
 *   email: string,
 *   avatarUrl: string,
 *   wins: number,
 *   losses: number,
 *   rating: number,
 *   createdAt: timestamp,
 *   updatedAt: timestamp
 * }
 *
 * 2. Prompt Document (prompts/{promptId}):
 * {
 *   id: string,
 *   userId: string,
 *   authorName: string,
 *   promptText: string,
 *   aiOutput: string,
 *   category: string, // e.g., 'coding', 'story', 'image-gen'
 *   tags: string[],
 *   totalVotes: number,
 *   createdAt: timestamp
 * }
 *
 * 3. Battle Document (battles/{battleId}):
 * {
 *   id: string,
 *   challengeTheme: string,
 *   status: 'waiting' | 'active' | 'completed',
 *   player1: {
 *     userId: string,
 *     username: string,
 *     promptText: string,
 *     aiOutput: string,
 *     votesCount: number
 *   },
 *   player2: {
 *     userId: string,
 *     username: string,
 *     promptText: string,
 *     aiOutput: string,
 *     votesCount: number
 *   },
 *   winnerId: string | null,
 *   roundDurationSeconds: number,
 *   expiresAt: timestamp,
 *   createdAt: timestamp
 * }
 *
 * 4. Vote Document (votes/{voteId}):
 * {
 *   id: string,
 *   battleId: string,
 *   userId: string, // voter
 *   votedForPlayerId: string,
 *   votedAt: timestamp
 * }
 *
 * 5. OTP Document (otps/{email}):
 * {
 *   email: string,
 *   otpHash: string,
 *   expiresAt: timestamp,
 *   attempts: number,
 *   verified: boolean,
 *   createdAt: timestamp
 * }
 */
