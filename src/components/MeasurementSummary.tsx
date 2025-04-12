
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MeasurementsType } from '@/types/measurements';

interface MeasurementSummaryProps {
  measurements: MeasurementsType | null;
}

const MeasurementSummary: React.FC<MeasurementSummaryProps> = ({ measurements }) => {
  if (!measurements) {
    return null;
  }
  
  const formatMeasurement = (value: string) => {
    return value ? `${value} cm` : '--';
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Measurement Summary</CardTitle>
        <CardDescription>
          Body measurements used for model generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Height</p>
            <p className="font-medium">{formatMeasurement(measurements.height)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Weight</p>
            <p className="font-medium">{measurements.weight ? `${measurements.weight} kg` : '--'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Chest</p>
            <p className="font-medium">{formatMeasurement(measurements.chest)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Waist</p>
            <p className="font-medium">{formatMeasurement(measurements.waist)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Hips</p>
            <p className="font-medium">{formatMeasurement(measurements.hips)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Inseam</p>
            <p className="font-medium">{formatMeasurement(measurements.inseam)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Shoulders</p>
            <p className="font-medium">{formatMeasurement(measurements.shoulders)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Neck</p>
            <p className="font-medium">{formatMeasurement(measurements.neck)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Bicep</p>
            <p className="font-medium">{formatMeasurement(measurements.bicep)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Thigh</p>
            <p className="font-medium">{formatMeasurement(measurements.thigh)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Calf</p>
            <p className="font-medium">{formatMeasurement(measurements.calf)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Ankle</p>
            <p className="font-medium">{formatMeasurement(measurements.ankle)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementSummary;
