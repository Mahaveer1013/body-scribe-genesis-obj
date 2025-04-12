
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Ruler, Camera, Loader2 } from 'lucide-react';
import { MeasurementsType } from '@/types/measurements';

interface MeasurementFormProps {
  onMeasurementsSubmit: (measurements: MeasurementsType) => void;
  isProcessing: boolean;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onMeasurementsSubmit, isProcessing }) => {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [measurements, setMeasurements] = useState<MeasurementsType>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    shoulders: '',
    neck: '',
    bicep: '',
    forearm: '',
    wrist: '',
    thigh: '',
    calf: '',
    ankle: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate measurements
    const requiredFields = ['height', 'weight', 'chest', 'waist', 'hips'];
    const missingFields = requiredFields.filter(field => !measurements[field as keyof MeasurementsType]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing measurements",
        description: `Please provide values for: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    onMeasurementsSubmit(measurements);
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload a photo for measurement extraction",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would process the image here
    // For demo purposes, we'll use dummy measurements
    toast({
      title: "Image uploaded",
      description: "Processing image to extract measurements...",
    });
    
    // Simulate image processing delay
    setTimeout(() => {
      const extractedMeasurements: MeasurementsType = {
        height: '175',
        weight: '70',
        chest: '95',
        waist: '80',
        hips: '92',
        inseam: '82',
        shoulders: '45',
        neck: '38',
        bicep: '32',
        forearm: '28',
        wrist: '17',
        thigh: '55',
        calf: '37',
        ankle: '22',
      };
      
      setMeasurements(extractedMeasurements);
      onMeasurementsSubmit(extractedMeasurements);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Body Measurements</CardTitle>
        <CardDescription>
          Enter your measurements or upload photos for automatic extraction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              <span>Manual Input</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Photo Upload</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    name="height"
                    placeholder="175"
                    value={measurements.height}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    name="weight"
                    placeholder="70"
                    value={measurements.weight}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (cm) *</Label>
                  <Input
                    id="chest"
                    name="chest"
                    placeholder="95"
                    value={measurements.chest}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (cm) *</Label>
                  <Input
                    id="waist"
                    name="waist"
                    placeholder="80"
                    value={measurements.waist}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hips">Hips (cm) *</Label>
                  <Input
                    id="hips"
                    name="hips"
                    placeholder="92"
                    value={measurements.hips}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inseam">Inseam (cm)</Label>
                  <Input
                    id="inseam"
                    name="inseam"
                    placeholder="82"
                    value={measurements.inseam}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shoulders">Shoulders (cm)</Label>
                  <Input
                    id="shoulders"
                    name="shoulders"
                    placeholder="45"
                    value={measurements.shoulders}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="neck">Neck (cm)</Label>
                  <Input
                    id="neck"
                    name="neck"
                    placeholder="38"
                    value={measurements.neck}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bicep">Bicep (cm)</Label>
                  <Input
                    id="bicep"
                    name="bicep"
                    placeholder="32"
                    value={measurements.bicep}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thigh">Thigh (cm)</Label>
                  <Input
                    id="thigh"
                    name="thigh"
                    placeholder="55"
                    value={measurements.thigh}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="calf">Calf (cm)</Label>
                  <Input
                    id="calf"
                    name="calf"
                    placeholder="37"
                    value={measurements.calf}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ankle">Ankle (cm)</Label>
                  <Input
                    id="ankle"
                    name="ankle"
                    placeholder="22"
                    value={measurements.ankle}
                    onChange={handleInputChange}
                    className="measurement-input"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-bodyModel-main hover:bg-bodyModel-dark"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Model...
                    </>
                  ) : (
                    'Generate 3D Model'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">* Required fields</p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="photo">
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="photo-upload">Upload Body Photos</Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="measurement-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload front and side view photos for best results.
                  </p>
                </div>
                
                <div className="border border-dashed border-border rounded-md p-6 text-center">
                  {imageFile ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Image selected:</p>
                      <p className="text-sm text-muted-foreground">{imageFile.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Instructions</p>
                      <p className="text-xs text-muted-foreground">
                        For best results, use clear full body photos against a plain background.
                        Wear form-fitting clothes for accurate measurements.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-bodyModel-main hover:bg-bodyModel-dark"
                disabled={!imageFile || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Image...
                  </>
                ) : (
                  'Extract Measurements & Generate Model'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
