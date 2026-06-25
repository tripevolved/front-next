import type { PublicDestination } from '@/core/types/destination';

const PROSE_CONTAINED =
  'prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full';

interface DestinationStorySectionProps {
  destination: PublicDestination;
}

export function DestinationStorySection({ destination }: DestinationStorySectionProps) {
  const description = destination.description?.trim();
  const highlight = destination.descriptionHighlight?.trim();
  if (!description && !highlight) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {description ? (
            <div className={`md:col-span-2 min-w-0 ${PROSE_CONTAINED}`} dangerouslySetInnerHTML={{ __html: description }} />
          ) : null}

          {highlight ? (
            <blockquote
              className={`border-l-4 border-accent-500 bg-white px-6 py-5 rounded-r-lg shadow-sm ${description ? '' : 'md:col-span-3 max-w-2xl mx-auto'}`}
            >
              <p className="font-comfortaa text-lg md:text-xl text-secondary-900 leading-relaxed italic">
                &ldquo;{highlight}&rdquo;
              </p>
            </blockquote>
          ) : null}
        </div>
      </div>
    </section>
  );
}
