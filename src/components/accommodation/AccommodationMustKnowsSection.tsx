import type { PublicAccommodationMustKnow } from '@/core/types/accommodations';
import { MUST_KNOW_LABELS, mustKnowIconMap } from '@/components/accommodation/icons/must-knows/mustKnowIconMap';

interface AccommodationMustKnowsSectionProps {
  mustKnows: PublicAccommodationMustKnow[];
  title?: string;
}

export function AccommodationMustKnowsSection({
  mustKnows,
  title = 'Você precisa saber',
}: AccommodationMustKnowsSectionProps) {
  const items = mustKnows.filter((item) => item.description?.trim());
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => {
          const Icon = mustKnowIconMap[item.type];
          const label = MUST_KNOW_LABELS[item.type] ?? item.type;
          return (
            <li key={item.type} className="flex gap-3 items-start">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary-600"
                aria-hidden
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
