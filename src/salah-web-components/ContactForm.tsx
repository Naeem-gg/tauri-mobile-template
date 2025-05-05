import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { useNavigate } from "@tanstack/react-router";
import { notify } from "@/lib/notify";

interface ContactData {
  masjidName: string;
  area: string;
  phone: string;
  message: string;
  role: string;
  userName: string;
}

interface Masjid {
  area: string;
  id: string;
  name: string;
  fajr: string;
  zohr: string;
  asr: string;
  isha: string;
  juma: string;
  maghrib: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  route: string;
  urduName: string;
  urduArea: string;
  userId: string;
}

interface ContactFormProps {
  masjids: Masjid[] | undefined;
}

export function ContactForm({ masjids }: ContactFormProps) {
  
  const router = useNavigate();

  const [formData, setFormData] = useState<ContactData>({
    masjidName: "",
    area: "",
    phone: "",
    message: "",
    role: "trusty",
    userName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<"english" | "urdu">("english");
  const [, setSearchTerm] = useState("");
  const [filteredMasjids, setFilteredMasjids] = useState<Masjid[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleConfirmSubmit = async (termsAccepted: boolean) => {
    if (!termsAccepted) {
      notify(language === "english" ? "Error" : "خرابی",
                  language === "english"
            ? "You must accept the terms to proceed."
            : "آپ کو آگے بڑھنے کے لیے شرائط کو قبول کرنا ہوگا۔",
        );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://salahtime.in/api/admins/masjid-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setFormData({
          masjidName: "",
          area: "",
          phone: "",
          message: "",
          role: "trusty",
          userName: "",
        });
        notify( language === "english" ? "Success " : "کامیابی",
          language === "english"
              ? "Thank you for contacting us! We will get back to you soon."
              : "آپ کا شکریہ! ہم جلد ہی آپ سے رابطہ کریں گے۔",
          );
        router({to:"/"});
      } else if (response.status === 409) {
        notify(language === "english" ? "Conflict" : "تنازعہ",
          language === "english"
              ? "Mobile number already registered."
              : "موبائل نمبر پہلے سے رجسٹرڈ ہے۔",
          );
      } else if (response.status === 410) {
        notify(language === "english" ? "Conflict" : "تنازعہ",
          language === "english"
              ? "Another request already registered with this mobile number."
              : "ایک دیگر درخواست پہلے سے رجسٹرڈ ہے ",
          );
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      notify(language === "english" ? "Error" : "خرابی",
          language === "english"
            ? "Failed to send message. Please try again later."
            : "پیغام بھیجنے میں ناکام۔ براہ کرم بعد میں کوشش کریں۔",
      );
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "urdu" : "english"));
  };

  const roles = [
    { value: "moazzin", label: language === "english" ? "Moazzin" : "موذن" },
    { value: "imam", label: language === "english" ? "Imam" : "امام" },
    { value: "trusty", label: language === "english" ? "Trusty" : "ٹرسٹی" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() && masjids) {
      const filtered = masjids.filter((masjid) =>
        language === "english"
          ? masjid.name.toLowerCase().includes(value.toLowerCase())
          : masjid.urduName.includes(value),
      );
      setFilteredMasjids(filtered);
    } else {
      setFilteredMasjids([]);
    }
  };

  const handleMasjidSelect = (masjid: Masjid) => {
    setFormData((prev) => ({
      ...prev,
      masjidName: masjid.name,
      area: masjid.area,
    }));
    setSearchTerm(
      language === "english"
        ? `${masjid.name} (${masjid.area})`
        : `${masjid.urduName} (${masjid.urduArea})`,
    );
    setFilteredMasjids([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Button
          variant="outline"
          type="button"
          onClick={toggleLanguage}
          className="mb-4"
        >
          {language === "english" ? "اردو" : "English"}
        </Button>

        <div>
          <Label htmlFor="masjidName">
            {language === "english" ? "Masjid Name" : "(انگریزی) مسجد کا نام"}
          </Label>
          <div className="relative">
            <Input
              id="masjidName"
              name="masjidName"
              value={formData.masjidName}
              onChange={(e) => {
                handleInputChange(e);
                handleChange(e);
              }}
              placeholder={
                language === "english"
                  ? "Search for your masjid"
                  : "اپنی مسجد تلاش کریں"
              }
              required
            />
            {filteredMasjids.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border rounded shadow max-h-60 overflow-y-auto z-10">
                <p className="text-red-500 mt-2">
                  {language === "english"
                    ? "Please check below if your masjid exists. Don't request the same masjid twice."
                    : "براہ کرم نیچے چیک کریں کہ آیا آپ کی مسجد موجود ہے۔ ایک ہی مسجد کے لئے دوبارہ درخواست نہ کریں۔"}
                </p>
                {filteredMasjids.map((masjid) => (
                  <li
                    key={masjid.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMasjidSelect(masjid)}
                  >
                    {language === "english"
                      ? `${masjid.name} (${masjid.area})`
                      : `${masjid.urduName} (${masjid.urduArea})`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="area">
            {language === "english" ? "Area" : "(انگریزی) علاقہ"}
          </Label>
          <Input
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder={
              language === "english" ? "Enter area" : "علاقہ درج کریں"
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">
            {language === "english"
              ? "Phone Number (WhatsApp)"
              : "(WhatsApp)فون نمبر"}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                handleChange({
                  target: { name: "phone", value },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
            placeholder={
              language === "english"
                ? "Enter phone number (WhatsApp)"
                : "فون نمبر درج کریں(WhatsApp)"
            }
            pattern="\d{10}"
            title="Phone number must be exactly 10 digits."
            required
          />
        </div>

        <div>
          <Label htmlFor="role">
            {language === "english" ? "Your Role" : "آپ کا کردار"}
          </Label>
          <Select
            onValueChange={(role) => setFormData((prev) => ({ ...prev, role }))}
            value={formData.role}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  language === "english"
                    ? "Select your role"
                    : "اپنا کردار منتخب کریں"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="userName">
            {language === "english" ? "Your Name" : "(انگریزی) آپ کا نام"}
          </Label>
          <Input
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder={
              language === "english"
                ? "Enter your name"
                : "براہ کرم اپنا نام صرف انگریزی میں درج کریں۔"
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="message">
            {language === "english" ? "Message (if any)" : "پیغام (اگر کوئی)"}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={
              language === "english"
                ? "Enter your message"
                : "اپنا پیغام درج کریں"
            }
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? language === "english"
              ? "Sending..."
              : "بھیج رہا ہے..."
            : language === "english"
              ? "Send Request"
              : "پیغام بھیجیں"}
        </Button>
      </form>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmSubmit}
        formData={formData}
        language={language}
        isLoading={isSubmitting}
      />
    </>
  );
}
