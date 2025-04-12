
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MeasurementForm from '@/components/MeasurementForm';
import ModelViewer from '@/components/ModelViewer';
import MeasurementSummary from '@/components/MeasurementSummary';
import { MeasurementsType } from '@/types/measurements';
import { generateBodyModel, downloadObjFile } from '@/utils/modelGenerator';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<MeasurementsType | null>(null);
  const [objData, setObjData] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMeasurementsSubmit = (newMeasurements: MeasurementsType) => {
    setIsProcessing(true);
    setMeasurements(newMeasurements);
    
    toast({
      title: "Processing measurements",
      description: "Generating high-resolution 3D body model...",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        const generatedObj = generateBodyModel(newMeasurements);
        setObjData(generatedObj);
        setIsProcessing(false);
        
        toast({
          title: "Model generated successfully",
          description: "Your 3D body model is ready for download.",
        });
      } catch (error) {
        setIsProcessing(false);
        console.error("Error generating model:", error);
        
        toast({
          title: "Model generation failed",
          description: "There was a problem creating your 3D model. Please try again.",
          variant: "destructive"
        });
      }
    }, 2500);
  };

  const handleDownload = () => {
    if (!objData) return;
    
    try {
      downloadObjFile(objData);
      
      toast({
        title: "Download started",
        description: "Your 3D body model (.OBJ) file is being downloaded.",
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      
      toast({
        title: "Download failed",
        description: "There was a problem downloading your file. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8 px-4">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-bodyModel-dark mb-3">BodyScribe 3D Generator</h1>
          <p className="text-lg text-muted-foreground">
            Create accurate 3D body models from your measurements or photos
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MeasurementForm 
            onMeasurementsSubmit={handleMeasurementsSubmit}
            isProcessing={isProcessing}
          />
          
          <ModelViewer 
            measurements={measurements}
            objData={objData}
            onDownload={handleDownload}
          />
        </div>
        
        {measurements && (
          <MeasurementSummary measurements={measurements} />
        )}
        
        <div className="mt-8 border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How It Works</h3>
              <p className="text-sm text-muted-foreground">
                Our algorithm converts your body measurements into a detailed 3D model
                using advanced mathematical modeling and machine learning techniques.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Technical Details</h3>
              <p className="text-sm text-muted-foreground">
                Generated .OBJ files contain up to 80,000 vertices for maximum accuracy
                and are compatible with all major 3D software.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Privacy</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens in your browser. Your measurements and photos
                are never stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
