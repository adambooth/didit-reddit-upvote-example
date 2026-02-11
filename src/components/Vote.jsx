import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { VoteButtons } from "./VoteButtons";

async function getExistingVote(userId, postId) {
  const { rows: existingVotes } = await db.query(
    "SELECT * FROM votes WHERE user_id = $1 AND post_id = $2 LIMIT 1",
    [userId, postId],
  );
  return existingVotes?.[0];
}

async function handleVote(userId, postId, newVote) {
  if (!userId) {
  }

  const existingVote = await getExistingVote(userId, postId);

  if (existingVote) {
    if (existingVote.vote === newVote) {
      await db.query("DELETE FROM votes WHERE id = $1", [existingVote.id]);
    } else {
      await db.query("UPDATE votes SET vote = $1 WHERE id = $2", [
        newVote,
        existingVote.id,
      ]);
    }
  } else {
    await db.query(
      "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, 'post')",
      [userId, postId, newVote],
    );
  }

  revalidatePath(`/post/${postId}`);
}

export async function Vote({ postId, votes }) {
  const session = await auth();
  const existingVote = await getExistingVote(session?.user?.id, postId);
  const isLoggedIn = !!session?.user;

  async function upvote() {
    "use server";
    await handleVote(session?.user?.id, postId, 1);
  }

  async function downvote() {
    "use server";
    await handleVote(session?.user?.id, postId, -1);
  }

  return (
    <form className="flex items-center space-x-3 pl-3">
      <VoteButtons
        upvote={upvote}
        downvote={downvote}
        votes={votes}
        existingVote={existingVote}
        isLoggedIn={isLoggedIn}
      />
    </form>
  );
}
