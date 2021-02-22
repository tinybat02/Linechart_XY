import { Buffer } from '../types';

export const processData = (buffer: Buffer) => {
  const data1 = buffer.buffer[0].x1.map((x_value, i) => ({ x: x_value, y: buffer.buffer[0].y1[i] }));
  const data2 = buffer.buffer[0].x2.map((x_value, i) => ({ x: x_value, y: buffer.buffer[0].y2[i] }));

  return [
    { id: 'Trilateration', data: data1 },
    { id: 'Mlearning', data: data2 },
  ];
};
