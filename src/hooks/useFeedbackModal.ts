import { useContext } from "react";
import { FeedbackModalContext } from "../contexts/FeedbackModalContext";

export function useFeedbackModal() {
  const value = useContext(FeedbackModalContext);

  return value;
}