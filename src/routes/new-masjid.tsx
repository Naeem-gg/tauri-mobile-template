import { createFileRoute } from '@tanstack/react-router'
import { WhatsApp } from "@/salah-web-components/SVGs";
import { useDataStore } from '@/store/data-store';
import { ContactForm } from '@/salah-web-components/ContactForm';

export const Route = createFileRoute('/new-masjid')({
  component: RouteComponent,
})

function RouteComponent() {
  const masjids = useDataStore(state => state.masjids)
  return <div className="container mx-auto px-4 py-12">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
      Request to add a new Masjid <i>(Malegaon Only)</i>
    </h1>

    <p className="mb-8 text-gray-600 dark:text-gray-300">
      Have questions about Salah Times? We&apos;re here to help. Fill out
      the form below and we&apos;ll get back to you as soon as possible.
    </p>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <ContactForm masjids={masjids} />
    </div>

    <div className="mt-12 grid md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <a
          href="https://wa.me/+918793566857"
          className="text-blue-600 hover:underline flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsApp />
          <span>Mohammed Naeem</span>
        </a>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Response Time
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          We typically respond within 24-48 hours.
        </p>
      </div>
    </div>
  </div>
</div>
}
