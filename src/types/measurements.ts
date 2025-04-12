
export interface MeasurementsType {
  // Basic measurements
  height: string;
  weight: string;
  
  // Torso measurements
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  neck: string;
  
  // Arm measurements
  bicep: string;
  forearm: string;
  wrist: string;
  
  // Leg measurements
  inseam: string;
  thigh: string;
  calf: string;
  ankle: string;
  
  // Advanced measurements (optional)
  headCircumference: string;
  neckToWaist: string;
  shoulderToElbow: string;
  elbowToWrist: string;
  waistToKnee: string;
  kneeToAnkle: string;
  footLength: string;
  
  // Allow for dynamic properties
  [key: string]: string;
}
