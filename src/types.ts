import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {}

export const defaults: PanelOptions = {};

export interface Buffer extends Vector {
  buffer: Array<{ x1: number[]; y1: number[]; x2: number[]; y2: number[] }>;
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}
