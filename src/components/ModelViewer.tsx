
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCw, Maximize2 } from 'lucide-react';
import { MeasurementsType } from '@/types/measurements';
import { useToast } from "@/components/ui/use-toast";

interface ModelViewerProps {
  measurements: MeasurementsType | null;
  objData: string | null;
  onDownload: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ measurements, objData, onDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!canvasRef.current || !measurements) return;
    
    // In a real application, we would use three.js here to render the 3D model
    // For demonstration purposes, we'll just draw a simple placeholder
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#E3F2FD');
    gradient.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simple humanoid figure
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = canvas.height / 300;
    
    // Draw head
    ctx.beginPath();
    ctx.arc(centerX, centerY - 80 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#64B5F6';
    ctx.fill();
    
    // Draw body
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 60 * scale);
    ctx.lineTo(centerX, centerY + 30 * scale);
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 15 * scale;
    ctx.stroke();
    
    // Draw arms
    ctx.beginPath();
    ctx.moveTo(centerX - 50 * scale, centerY - 30 * scale);
    ctx.lineTo(centerX, centerY - 40 * scale);
    ctx.lineTo(centerX + 50 * scale, centerY - 30 * scale);
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 10 * scale;
    ctx.stroke();
    
    // Draw legs
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 30 * scale);
    ctx.lineTo(centerX - 25 * scale, centerY + 100 * scale);
    ctx.moveTo(centerX, centerY + 30 * scale);
    ctx.lineTo(centerX + 25 * scale, centerY + 100 * scale);
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 12 * scale;
    ctx.stroke();
    
    // Add text
    ctx.fillStyle = '#1565C0';
    ctx.font = `${14 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('3D Body Model Preview', centerX, centerY - 120 * scale);
    
    // Add some measurement annotations
    if (measurements) {
      const height = parseFloat(measurements.height) || 175;
      const chest = parseFloat(measurements.chest) || 95;
      
      ctx.fillStyle = 'rgba(33, 150, 243, 0.7)';
      ctx.font = `${10 * scale}px Arial`;
      ctx.fillText(`Height: ${height} cm`, centerX, centerY + 130 * scale);
      ctx.fillText(`Chest: ${chest} cm`, centerX, centerY - 10 * scale);
    }
    
  }, [measurements, canvasRef]);

  const handleFullscreen = () => {
    if (!canvasRef.current) return;
    
    if (canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>3D Model Preview</CardTitle>
            <CardDescription>
              Interactive preview of your generated body model
            </CardDescription>
          </div>
          {objData && (
            <Badge variant="outline" className="bg-bodyModel-light text-bodyModel-dark">
              {objData.length > 10000 ? 'High-Resolution' : 'Standard'} Model
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-2 sm:p-6">
        {measurements ? (
          <div className="relative w-full h-full min-h-[300px]">
            <canvas 
              ref={canvasRef} 
              className="model-canvas w-full h-full"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={handleFullscreen}
                className="bg-white/80 hover:bg-white"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                className="bg-white/80 hover:bg-white"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center border border-dashed border-border rounded-md p-10 h-full min-h-[300px]">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-bodyModel-light flex items-center justify-center animate-pulse-slow">
                <div className="w-8 h-8 rounded-full bg-bodyModel-main" />
              </div>
              <h3 className="text-lg font-medium">No Model Generated Yet</h3>
              <p className="text-sm text-muted-foreground">
                Enter your measurements and generate a 3D model
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          onClick={onDownload}
          disabled={!objData}
          className="w-full bg-bodyModel-main hover:bg-bodyModel-dark gap-2"
        >
          <Download className="h-4 w-4" />
          Download .OBJ File
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelViewer;
