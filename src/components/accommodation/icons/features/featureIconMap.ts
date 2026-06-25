import type { ComponentType } from 'react';
import { IconAdrenaline, IconCulture, IconDefault } from '@/components/destinations/FeatureIconGlyphs';
import { IconLuxury } from './IconLuxury';
import { IconPersonnel } from './IconPersonnel';
import { IconComfort } from './IconComfort';
import { IconClean } from './IconClean';
import { IconRustic } from './IconRustic';
import { IconLocation } from './IconLocation';
import { IconPersonality } from './IconPersonality';
import { IconInfrastructure } from './IconInfrastructure';
import { IconPerceivedValue } from './IconPerceivedValue';
import { IconSocial } from './IconSocial';
import { IconRomance } from './IconRomance';
import { IconSophistication } from './IconSophistication';
import { IconExclusivity } from './IconExclusivity';
import { IconDesign } from './IconDesign';
import { IconFun } from './IconFun';
import { IconWellness } from './IconWellness';
import { IconAuthenticity } from './IconAuthenticity';

export const featureIconMap: Record<string, ComponentType<{ className?: string }>> = {
  luxury: IconLuxury,
  personnel: IconPersonnel,
  comfort: IconComfort,
  clean: IconClean,
  rustic: IconRustic,
  location: IconLocation,
  personality: IconPersonality,
  infrastructure: IconInfrastructure,
  'perceived-value': IconPerceivedValue,
  social: IconSocial,
  romance: IconRomance,
  sophistication: IconSophistication,
  exclusivity: IconExclusivity,
  culture: IconCulture,
  design: IconDesign,
  fun: IconFun,
  adventure: IconAdrenaline,
  wellness: IconWellness,
  authenticity: IconAuthenticity,
};

export function getFeatureIcon(iconName: string | undefined): ComponentType<{ className?: string }> {
  if (!iconName) return IconDefault;
  return featureIconMap[iconName] ?? IconDefault;
}
