export interface LeadRef {
  ref: string;
  friends: number | string;
  position: number | string;
}

export interface Lead extends Partial<LeadRef> {
  uid?: string;
  name: string;
  email: string;
  phone: string;
}
