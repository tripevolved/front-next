import type { PublicDestination } from '@/core/types/destination';
import { IconBestTimeToVisit, IconHowToArrive } from './icons';

interface DestinationSidebarPracticalInfoProps {
  destination: PublicDestination;
}

export function DestinationSidebarPracticalInfo({ destination }: DestinationSidebarPracticalInfoProps) {
  const { bestTimeToVisit, howToArrive } = destination;
  if (!bestTimeToVisit?.trim() && !howToArrive?.trim()) return null;

  return (
    <div className="mt-6 space-y-4">
      {bestTimeToVisit?.trim() ? (
        <div className="border border-gray-200 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-500/80 text-accent-600"
              aria-hidden
            >
              <IconBestTimeToVisit className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-baloo font-bold text-secondary-900 mb-2">Melhor época</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{bestTimeToVisit}</p>
            </div>
          </div>
        </div>
      ) : null}

      {howToArrive?.trim() ? (
        <div className="border border-gray-200 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-500/80 text-accent-600"
              aria-hidden
            >
              <IconHowToArrive className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-baloo font-bold text-secondary-900 mb-2">Como chegar</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{howToArrive}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
