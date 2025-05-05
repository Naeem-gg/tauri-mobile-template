import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from "framer-motion";
import {
  Download,
  List,
  Mail,
  Search,
  ThumbsUp,
  ToggleLeft,
} from "lucide-react";
export const Route = createFileRoute('/implemented-features')({
  component: RouteComponent,
})
const features = [
  {
    icon: <List className="w-6 h-6 text-blue-600" />,
    title: "Sort Masjids",
    description:
      "Sort masjids by name, area, and prayer times for easy browsing.",
  },
  {
    icon: <Download className="w-6 h-6 text-green-600" />,
    title: "QR Code Poster Download",
    description: "Generate and download posters with QR codes for your masjid.",
  },
  {
    icon: <ToggleLeft className="w-6 h-6 text-purple-600" />,
    title: "Language Toggle",
    description: "Switch between Urdu and English seamlessly.",
  },
  {
    icon: <Search className="w-6 h-6 text-pink-600" />,
    title: "Search in Urdu",
    description: "Find masjids using Urdu names for better accessibility.",
  },
  {
    icon: <Mail className="w-6 h-6 text-orange-600" />,
    title: "Request a New Masjid",
    description: (
      <>
        Easily request the addition of new masjids through our{" "}
        <Link to="/new-masjid" className="text-indigo-600 underline">
          Request Masjid
        </Link>{" "}
        feature.
      </>
    ),
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-yellow-600" />,
    title: "Submit Feedback",
    description: (
      <>
        Share your suggestions and feedback to help us improve your experience
        through our{" "}
        <Link to="/feedback" className="text-indigo-600 underline">
          Feedback
        </Link>{" "}
        feature.
      </>
    ),
  },
];
function RouteComponent() {
  return  <>
  <motion.div
    className="max-w-3xl mx-auto my-10 px-6"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Features Already Implemented ✅
    </h1>
    <p className="text-center text-gray-600 mb-8">
      Here are the features you can already use:
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