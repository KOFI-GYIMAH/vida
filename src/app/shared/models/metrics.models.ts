interface PredictionStatistic {
  date: string;
  count: number;
}

interface PieChartData {
  [key: string]: number;
}

export interface DoctorMetrics {
  totalAnalyzedImages: number;
  totalMedicalReports: number;
  pieChartData: PieChartData;
  predictionStatistics: PredictionStatistic[];
  totalPatients: number;
}

export interface AdminMetrics {
  totalAnalyzedImages: number;
  averageConfidence: number;
  totalUsers: number;
  totalMedicalReports: number;
  totalReferrals: number;
  pieChartData: PieChartData;
  predictionStatistics: PredictionStatistic[];
  totalPatients: number;
}
