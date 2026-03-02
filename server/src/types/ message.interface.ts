type status = "sending" | "delivered" | "Read" | "failed";
type messageType = "text" | "voice" | "photo" | "emoji" | "gifs";

export interface IMessage {
  chat_id: String;
  sender_id: String;
  receiver_id: String;
  status: status;
  type: messageType;
  content: String;
  media_url: String;
  is_deleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
