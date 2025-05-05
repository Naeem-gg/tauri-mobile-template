import { createFileRoute } from '@tanstack/react-router';
import { motion } from "framer-motion";
import { Bell, MapPin, Star } from "lucide-react";
export const Route = createFileRoute('/upcoming')({
  component: RouteComponent,
})
const features = [
  {
    icon: <MapPin className="w-6 h-6 text-indigo-600" />,
    title: "Nearby Search Option",
    description:
      "Easily search for masjids near your location with real-time data.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-indigo-600" />,
    title: "Direction on Map",
    description: "Get step-by-step navigation to your favorite masjids.",
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    title: "Add to Favorite",
    description: "Save your preferred masjids for quick access later.",
  },
  {
    icon: <Bell className="w-6 h-6 text-red-500" />,
    title: "Notifications for Timings",
    description:
      "Get notified whenever your favorite masjid’s prayer times change.",
  },
];
function RouteComponent() {
  return <>
  <motion.div
    className="max-w-3xl mx-auto my-10 px-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Exciting Upcoming Features 🎉
    </h1>
    <p className="text-center text-gray-600 mb-8">
      We’re constantly improving! Here’s what’s coming next:
    </p>
    <div className="space-y-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-4 bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.03 }}
        >
          <div className="p-3 bg-gray-200 rounded-full">{feature.icon}</div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {feature.title}
            </h2>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
  </>
}
