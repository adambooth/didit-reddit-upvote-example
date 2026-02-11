"use client";

import { useEffect } from "react";

export function Alert({ message }) {
  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  return null;
}
