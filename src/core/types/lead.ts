export interface LaunchList {
  id: string;
  friends: number;
  position: number;
}

export interface LeadCreateDTO {
  email: string;
  phone: string;
  name: string;
  affiliateId?: string;
  inviterId?: string;
  inviterName?: string;
  inviterEmail?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;

  uniqueId?: string;

  launchList?: null | LaunchList;
  invitedBy?: null | Inviter;
  profile?: null | Profile;

  // TODO: remove this in the future
  uid?: string;
}

interface Profile {
  slug: string;
}

interface Inviter {
  id?: string;
  affiliateId?: string;
  name?: string;
  email?: string;
}
