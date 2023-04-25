export interface LeadRef {
  ref: string;
  friends?: number | string;
  position?: number | string;
}

export interface LeadWithUid extends Lead {
  uid: string;
}

export interface Lead extends LeadRef {
  uid?: string;
  name: string;
  email: string;
  phone: string;
}
