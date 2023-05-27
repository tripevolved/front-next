export interface LeadRef {
  ref: string;
  friends?: number | string;
  position?: number | string;
  affiliateId: string;
  referredEmail: string;
}

export interface Lead extends LeadRef {
  uid: string;
  name: string;
  email: string;
  phone: string;
  inviterId?: string;
}
