export interface TroubleshootingItem {
  code: string;
  part: string;
  cause: string;
  repair: string;
  probability: number;
}

export interface DefectRate {
  date: string;
  rate: number;
  target: number;
}

export interface Bottleneck {
  process: string;
  time: number;
  standard: number;
}

export interface SupplyChainItem {
  part: string;
  status: 'Critical' | 'Warning' | 'Stable';
  endOfLife: string;
  replacements: string[];
}

export type ViewType = 'troubleshooting' | 'quality' | 'bottleneck' | 'supply-chain';
