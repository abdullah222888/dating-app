type notificationType = "new_match" | "new_message" | "like_found";

export interface INotification {
  user_id: String;
  title: String;
  description: String;
  user_relating: String;
  type: notificationType;
  isRead: Boolean;
  createdAt: Date;
}
