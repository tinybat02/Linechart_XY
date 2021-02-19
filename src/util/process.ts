import { Buffer } from '../types';

export const processData = (buffer: Buffer) => {
  const data = buffer.buffer[0].x.map((x_value, i) => ({ x: x_value, y: buffer.buffer[0].y[i] }));

  return data;
};
