import { FeedbackForm } from '@/salah-web-components/FeedbackForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feedback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="container mx-auto max-w-2xl px-4 py-8">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
      Feedback
    </h1>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      Your feedback helps us improve our prayer times service. Please share
      your thoughts, suggestions, or report any issues you&apos;ve
      encountered.
    </p>

    <FeedbackForm />
  </div>
 
</div>
}
