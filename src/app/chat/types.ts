export type ChatMessage = {
  id: string;
  sender: "coach" | "user";
  text: string;
  time?: string;
};
