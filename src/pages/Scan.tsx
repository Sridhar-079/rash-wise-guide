import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, Loader2, Sun, Focus, ZoomIn } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const tips = [
  { icon: Sun, text: "Good lighting — avoid shadows" },
  { icon: ZoomIn, text: "Close-up of the area" },
  { icon: Focus, text: "Clear focus, steady hand" },
];

const Scan = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch {
      toast({ title: "Camera access denied", description: "Please allow camera access in your browser settings.", variant: "destructive" });
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const f = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setFile(f);
        setImage(URL.createObjectURL(blob));
        stopCamera();
      }
    }, "image/jpeg", 0.9);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setImage(URL.createObjectURL(f));
    stopCamera();
  };

  const clearImage = () => {
    setImage(null);
    setFile(null);
  };

  const analyzeImage = async () => {
    if (!file) return;
    setLoading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke("analyze-skin", {
        body: { image: base64, mimeType: file.type },
      });

      if (error) throw error;

      // Navigate to results with the analysis data
      navigate("/results", { state: { result: data, imageUrl: image } });
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast({ title: "Analysis failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-2 text-center text-3xl font-bold">Scan Your Skin</h1>
          <p className="mb-8 text-center text-muted-foreground">
            Take a photo or upload an image of the skin area you'd like to check.
          </p>

          {/* Tips */}
          <div className="mb-6 flex justify-center gap-6">
            {tips.map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <t.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">{t.text}</span>
              </div>
            ))}
          </div>

          {/* Camera / Preview area */}
          <Card className="mb-6 overflow-hidden border-2 border-dashed border-border">
            <CardContent className="p-0">
              {cameraActive && !image ? (
                <div className="relative">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    <Button onClick={capturePhoto} size="lg" className="rounded-full">
                      <Camera className="mr-2 h-5 w-5" /> Capture
                    </Button>
                    <Button onClick={stopCamera} variant="outline" size="lg" className="rounded-full">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : image ? (
                <div className="relative">
                  <img src={image} alt="Skin area preview" className="w-full" />
                  <button
                    onClick={clearImage}
                    className="absolute right-3 top-3 rounded-full bg-card/80 p-1.5 backdrop-blur-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
                    <Camera className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">No image selected</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          {!image && !cameraActive && (
            <div className="flex gap-3">
              <Button onClick={startCamera} variant="outline" className="flex-1 rounded-full">
                <Camera className="mr-2 h-4 w-4" /> Use Camera
              </Button>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1 rounded-full">
                <Upload className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {/* Analyze button */}
          {image && (
            <Button onClick={analyzeImage} disabled={loading} size="lg" className="w-full rounded-full text-base">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                </>
              ) : (
                "Analyze Skin"
              )}
            </Button>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default Scan;
