import { Facebook, Snapchat, Twitter, WhatsApp } from "@/salah-web-components/SVGs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { Masjid } from "./SingleTable";
import { getTimeAgo } from "@/lib/getTmeAgo";
import { openUrl } from '@tauri-apps/plugin-opener';


const socialPlatforms = [
  { name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { name: "Twitter", icon: Twitter, color: "text-sky-500" },
  { name: "WhatsApp", icon: WhatsApp, color: "text-green-500" },
  { name: "Snapchat", icon: Snapchat, color: "text-yellow-400" },
];

export function ShareDialog({ url, masjid }: { url: string; masjid: Masjid }) {
  const message = `
  ${url}
  
🌹🌹اوقات نماز 🌹🌹
🕌 ${masjid.urduName} 🕌
${masjid.urduArea} 

فجر            ${masjid.fajr}    Fajar 
ظہر           ${masjid.zohr}     Zuhar 
عصر         ${masjid.asr}     Asr 
مغرب         اذان کے فورا بعد
عشاء         ${masjid.isha}      Isha
جمعہ         ${masjid.juma}     Juma 

  ${masjid.name}
  ${masjid.area}

  Updated : ${getTimeAgo(masjid.updatedAt)}
`;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
        break;
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(message)}`;
        break;
      case "WhatsApp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case "Snapchat":
        shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(message)}`;
        break;
    }
    openUrl(shareUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-6 rounded-lg bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Share <span className="font-bold text-blue-600">{masjid.name}</span>{" "}
            Jamat Timings
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex items-center space-x-3">
          <div className="flex-1">
            <Input
              id="link"
              defaultValue={url}
              readOnly
              className="border border-gray-300 rounded-lg py-2 px-3 text-sm"
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          {socialPlatforms.map((platform) => (
            <span
              key={platform.name}
              // variant="outline"
              // size="icon"
              className={`w-10 h-10 flex justify-center items-center rounded-full ${platform.color} hover:bg-gray-100 transition-all`}
              onClick={() => shareToSocial(platform.name)}
            >
              <platform.icon height="150" width="150" />
              <span className="sr-only">Share to {platform.name}</span>
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
