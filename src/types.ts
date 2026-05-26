export type CategoryId = "geopolitics" | "politics" | "crime" | "all";

export interface GlobalIndicator {
  label: string;
  value: number;
  trend: "up" | "down" | "stable";
  color?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  highlighted?: boolean;
}

export interface ResearchArticle {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  role: string;
  date: string;
  category: "geopolitics" | "politics" | "crime";
  tags: string[];
  readTime: string;
  summary: string;
  introduction: string;
  sections: {
    subtitle: string;
    content: string;
  }[];
  indicators: GlobalIndicator[];
  visualType: "map" | "chart" | "network" | "map-china" | "none";
  visualData?: {
    nodes?: any[];
    links?: any[];
    chartPoints?: ChartDataPoint[];
    mapHighlights?: string[];
  };
  imageUrl?: string;
  isPinned?: boolean;
  documentUrl?: string;
}

export interface IntelResponse {
  title: string;
  summary: string;
  introduction: string;
  sections: {
    subtitle: string;
    content: string;
  }[];
  indicators: { label: string; value: number }[];
  strategy: string;
  source: string;
  isDemo?: boolean;
  notice?: string;
}
