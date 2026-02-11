"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

export function VoteButtons({
  upvote,
  downvote,
  votes,
  existingVote,
  isLoggedIn,
}) {
  const { pending, data, method, action } = useFormStatus();

  return (
    <>
      <button className="vote-btn" formAction={upvote} disabled={!isLoggedIn}>
        {existingVote?.vote === 1 ? (
          <TbArrowBigUpFilled
            size={24}
            className={clsx("hover:text-orange-600 vote-button", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        ) : (
          <TbArrowBigUp
            size={24}
            className={clsx("hover:text-orange-600 vote-button", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        )}
      </button>
      <span className="vote-button w-6 text-center tabular-nums">
        {pending ? (
          <span className="animate-spin h-6  w-6 flex items-center justify-center">
            <FaSpinner />
          </span>
        ) : (
          votes
        )}
      </span>
      <button className="vote-btn" formAction={downvote} disabled={!isLoggedIn}>
        {existingVote?.vote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600 vote-button", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600 vote-button", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        )}
      </button>
      <div>
        {!isLoggedIn && (
          <p className="mt-1 text-sm text-red-500 font-extrabold">
            Cannot vote without being logged in
          </p>
        )}
      </div>
    </>
  );
}
