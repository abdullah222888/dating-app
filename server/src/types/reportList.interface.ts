type reportStatus = "pending" | "approved";

export interface IReportList {
  reporter_id: String;
  reported_user_id: String;
  message_id: String;
  reason: String;
  description: String;
  status: reportStatus;
  createdAt: Date;
}
