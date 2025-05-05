import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { notify } from "@/lib/notify";


interface FeedbackData {
  name: string;
  phone: string;
  feedback: string;
}

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    phone: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useNavigate();

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
    if (!formData.feedback.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("https://salahtime.in/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", phone: "", feedback: "" });
        notify(
          "Success",
          "Thank you for your feedback!",
        );
        router({to:"/"});
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      notify( "Error",
       "Failed to submit feedback. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
          >
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
          >
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
          >
            Your Feedback
          </label>
          <Textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Please share your thoughts..."
            className="min-h-[200px]"
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}
