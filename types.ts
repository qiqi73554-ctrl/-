
export interface GlucoseRecord {
  date: string;
  time: string;
  value: number;
  label: string; // e.g. "针2", "针4"
  isInjection: boolean;
  injectionDose?: number;
  injectionIndex?: number;
  food?: string;
}

export interface InjectionCycle {
  index: number;
  startDate: string;
  startValue: number;
  dose: number;
  records: GlucoseRecord[];
  min: number;
  max: number;
  avg: number;
  nadir?: number; // Lowest point
}
