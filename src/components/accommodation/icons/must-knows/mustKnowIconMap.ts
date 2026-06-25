import type { ComponentType } from 'react';
import type { AccommodationMustKnowDeliveryType } from '@/core/types/accommodations';
import { IconCheckInOut } from './IconCheckInOut';
import { IconMealPlan } from './IconMealPlan';
import { IconParking } from './IconParking';
import { IconIdealFor } from './IconIdealFor';
import { IconNonIdealFor } from './IconNonIdealFor';
import { IconWorthInvesting } from './IconWorthInvesting';
import { IconWhatSurprisesMost } from './IconWhatSurprisesMost';
import { IconRecommendedNights } from './IconRecommendedNights';
import { IconHowToUse } from './IconHowToUse';

export const MUST_KNOW_LABELS: Record<AccommodationMustKnowDeliveryType, string> = {
  CheckInOut: 'Check-in e check-out',
  MealPlan: 'Alimentação',
  Parking: 'Estacionamento',
  IdealFor: 'Ideal para',
  NonIdealFor: 'Não ideal para',
  WorthInvesting: 'Vale investir',
  WhatSurprisesMost: 'O que mais surpreende',
  RecommendedNights: 'Noites recomendadas',
  HowToUse: 'Como aproveitar',
};

export const mustKnowIconMap: Record<
  AccommodationMustKnowDeliveryType,
  ComponentType<{ className?: string }>
> = {
  CheckInOut: IconCheckInOut,
  MealPlan: IconMealPlan,
  Parking: IconParking,
  IdealFor: IconIdealFor,
  NonIdealFor: IconNonIdealFor,
  WorthInvesting: IconWorthInvesting,
  WhatSurprisesMost: IconWhatSurprisesMost,
  RecommendedNights: IconRecommendedNights,
  HowToUse: IconHowToUse,
};
