# Caribe Planejar — lead automation handoff

## What the app sends

On lead capture (`POST /customers` via `LeadCaptureStep`), metadata includes:

| Key | Value | Purpose |
|-----|-------|---------|
| `source` | `consultoria-caribe-planejar` | RD Station conversion source (see `CustomerLeadService.TrySendToRdStationAsync`) |
| `funnel` | `caribe-planejar-v2` | Segment / trigger identifier for automations |
| `destination` | `caribe` | Macro destination locked for this funnel |

UTM keys (`utm_*`) are appended when present on the landing URL.

In Production, travel-service also upserts the contact to the marketing email provider. **No transactional welcome email is sent from the app** for this funnel.

## Ops / growth (outside this repo)

1. Create a **Caribe Planejar** welcome journey in RD Station (distinct from Círculo Evolved welcome).
2. Trigger on conversion source `consultoria-caribe-planejar` and/or metadata `funnel=caribe-planejar-v2`.
3. CTA should point users to login / continue planning (`/auth/login`).
4. QA the automation in a Production-like RD Station config before relying on it for live traffic.
