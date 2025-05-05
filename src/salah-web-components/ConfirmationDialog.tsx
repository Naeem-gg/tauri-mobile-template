import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (termsAccepted: boolean) => void;
  formData: {
    masjidName: string;
    area: string;
    phone: string;
    role: string;
    userName: string;
    message: string;
  };
  language: "english" | "urdu";
  isLoading: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  formData,
  language,
  isLoading,
}: ConfirmationDialogProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleConfirm = () => {
    onConfirm(termsAccepted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {language === "english"
              ? "Confirm Your Request"
              : "اپنی درخواست کی تصدیق کریں"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            {language === "english"
              ? "Please review your information:"
              : "براہ کرم اپنی معلومات کا جائزہ لیں:"}
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>
                {language === "english" ? "Masjid Name:" : "مسجد کا نام:"}
              </strong>{" "}
              {formData.masjidName}
            </li>
            <li>
              <strong>{language === "english" ? "Area:" : "علاقہ:"}</strong>{" "}
              {formData.area}
            </li>
            <li>
              <strong>{language === "english" ? "Phone:" : "فون:"}</strong>{" "}
              {formData.phone}
            </li>
            <li>
              <strong>{language === "english" ? "Role:" : "کردار:"}</strong>{" "}
              {formData.role}
            </li>
            <li>
              <strong>
                {language === "english" ? "Your Name:" : "آپ کا نام:"}
              </strong>{" "}
              {formData.userName}
            </li>
            {formData.message && (
              <li>
                <strong>
                  {language === "english" ? "Message:" : "پیغام:"}
                </strong>{" "}
                {formData.message}
              </li>
            )}
          </ul>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) =>
                setTermsAccepted(checked as boolean)
              }
            />
            <Label htmlFor="terms">
              {language === "english"
                ? "I acknowledge that I am responsible for updating the timings accurately and on time. I understand that any delay or inaccuracy in updating the masjid timings may result in the termination of my account."
                : "میں تصدیق کرتا ہوں کہ فراہم کردہ معلومات درست ہیں اور وقت پر اوقات کو صحیح طریقے سے اپ ڈیٹ کرنا میری ذمہ داری ہے۔ میں سمجھتا ہوں کہ کسی بھی تاخیر یا غلطی کی صورت میں میرا اکاؤنٹ معطل ہو سکتا ہے۔"}
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {language === "english" ? "Cancel" : "منسوخ کریں"}
          </Button>
          <Button onClick={handleConfirm} disabled={!termsAccepted}>
            {isLoading && <Loader2 className="w-6 h-6 animate-spin" />}
            {language === "english"
              ? "Confirm and Submit"
              : "تصدیق کریں اور جمع کرائیں"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
