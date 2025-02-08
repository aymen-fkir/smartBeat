import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Measurement {
  time: number;
  ecg: number;
  RestingECG:string;
  Oldpeak:number;
}

interface MeasurementsTableProps {
  data: Measurement[];
}

export const MeasurementsTable: React.FC<MeasurementsTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>ECG Reading</TableHead>
          <TableHead>RestingEGC</TableHead>
          <TableHead>Oldpeak</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((measurement) => (
          <TableRow key={measurement.time}>
            <TableCell>{measurement.time}</TableCell>
            <TableCell>{measurement.ecg.toFixed(3)}</TableCell>
            <TableCell>{measurement.RestingECG} </TableCell>
            <TableCell>{measurement.Oldpeak.toFixed(3)}</TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </Table>
  );
};

