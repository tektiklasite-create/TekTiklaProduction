export interface Package {
  id: number;
  name: string;
  price: string;
  period: string;
  badge: string | null;
  features: string[];
  highlighted: boolean;
  /** Kuruş cinsinden — null ise online ödeme kapalı */
  priceAmount: number | null;
}

export type LeadStatus = "new" | "contacted" | "won" | "lost";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  package_name: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
}

export interface LeadStats {
  total: number;
  last7: number;
  new: number;
  contacted: number;
  won: number;
  lost: number;
}
