export type NotificationStatus = "PENDING" | "READ" | "IGNORED";

export type NotificationType = "NEWS" | "BLOG" | "TRIP";

export interface Notification {
  id: string;
  status: NotificationStatus;
  type: NotificationType;
  date: Date;
  title: string;
  subtitle: string;
  description: string;
  tripId: string;
  tripPendingActionId: string;
  tripDocumentId: string;
  tripTipId: string;
}
