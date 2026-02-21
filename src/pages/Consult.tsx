import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, User } from "lucide-react";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

const Consult = () => {
  const { t } = useLanguage();
  const [inCall, setInCall] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setInCall(true);
    } catch {
      // Fallback: start call without camera
      setInCall(true);
    }
  };

  const endCall = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setInCall(false);
    setVideoOn(true);
    setMicOn(true);
  };

  const toggleVideo = () => {
    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
    }
  };

  const toggleMic = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-2 text-center text-3xl font-bold">{t("consultTitle")}</h1>
          <p className="mb-8 text-center text-muted-foreground">{t("consultDesc")}</p>

          {!inCall ? (
            <Card className="text-center">
              <CardContent className="flex flex-col items-center gap-6 p-10">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent">
                  <Video className="h-12 w-12 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{t("consultDoctor")}</h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {t("consultDesc")}
                  </p>
                </div>
                <Button onClick={startCall} size="lg" className="rounded-full px-8 gap-2">
                  <Phone className="h-5 w-5" /> {t("startCall")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Video area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Self view */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0 relative aspect-video bg-muted">
                    {videoOn ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <VideoOff className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 text-xs bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
                      You
                    </span>
                  </CardContent>
                </Card>

                {/* Doctor placeholder */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0 relative aspect-video bg-muted">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground text-center px-4">
                        {t("waitingRoom")}
                      </p>
                    </div>
                    <span className="absolute bottom-2 left-2 text-xs bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
                      Doctor
                    </span>
                  </CardContent>
                </Card>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  variant={micOn ? "outline" : "destructive"}
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={toggleMic}
                >
                  {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <Button
                  variant={videoOn ? "outline" : "destructive"}
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={toggleVideo}
                >
                  {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={endCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-muted-foreground">
            {t("disclaimer_text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Consult;
