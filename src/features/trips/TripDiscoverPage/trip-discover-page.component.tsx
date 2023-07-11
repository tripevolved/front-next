import { useAppStore } from "@/core/store";
import { useState, useEffect, useRef } from "react";
import { TravelerProfileType } from "@/core/types";
import { ProfileBuilderSection } from "./traveler-profile-builder.section";
import { ProfileSection } from "./traveler-profile.section";
import { ProfileStartSection } from "./traveler-profile-start.section";
import { RegisterCity, TripConfigurationSet, CreateTrip } from "@/features";
import { DestinationQuestions } from "./destination-questions.section";
import { TripGoalQuestions } from "./trip-goal-questions.section";
import { Notification } from "mars-ds";
import { CreateTripDto } from "@/services/api/trip/create";
import { TripsApiService } from "@/services/api";

const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Montando o seu perfil...",
    iconName: "settings",
  },
  {
    text: "Achamos 3 lugares para você curtir",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

type TripDiscoverStep = "none" | "build-profile" | "profile" | "register-city" | "destinations" | "configuration" | "trip-goal" | "finish";

export const TripDiscoverPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const createTrip = useRef<CreateTripDto>({} as CreateTripDto);
  const tripId = useRef<string>();

  const { travelerState } = useAppStore();

  const [step, setStep] = useState<TripDiscoverStep>("none");
  const [travelerId, setTravelerId] = useState("");
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfileType>("relax");

  useEffect(() => {
    setTravelerProfile(!travelerState.travelerProfile ? "relax" : travelerState.travelerProfile);
    setTravelerId(travelerState.id);
  }, [travelerState]);

  const handleCreateTrip = (tripDto?: CreateTripDto) => {
    if (tripDto) {
      tripDto.travelerId = travelerId;
      createTrip.current = tripDto;
    }
    sendCreateTrip();
  };

  const sendCreateTrip = async () => {
    try {
      setSubmitting(true);
      const result = await TripsApiService.postCreate(createTrip.current);
      tripId.current = result.id;
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  const setNextStep = (nextStep: TripDiscoverStep) => {
    if (nextStep === "build-profile" && travelerState.travelerProfile) nextStep = "profile";
    if (nextStep === "register-city" && travelerState.hasValidAddress) nextStep = "destinations";
    
    setStep(nextStep);
  }

  if (submitting) {
    return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Card className="profile-questions__card">
        <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
      </Card>
    </SectionBase>);
  }

  if (step === "build-profile") return (<ProfileBuilderSection travelerId={travelerId} onSubmit={() => setNextStep("profile")} />);
  if (step === "profile") return (<ProfileSection travelerProfile={travelerProfile} onSubmit={() => setNextStep("register-city")} />);
  if (step === "register-city") return (<RegisterCity travelerId={travelerId} onFinish={() => setNextStep("destinations")} />);
  if (step === "destinations") return (<DestinationQuestions travelerId={travelerId} onSubmit={() => setNextStep("configuration")} />);
  if (step === "configuration") return (<TripConfigurationSet onSubmit={() => setNextStep("trip-goal")} />);
  if (step === "trip-goal") return (<TripGoalQuestions travelerId={travelerId} onSubmit={() => setNextStep("finish")} />);
  if (step === "finish") return (<CreateTrip onFinish={handleCreateTrip} redirectTo={"/app/viagens/descobrir/destinos/"} />);

  return (
    <ProfileStartSection 
      title={!travelerState.travelerProfile ? undefined : "Responda a seguir e descubra nossas recomendações de destinos."}
      subtitle={!travelerState.travelerProfile ? undefined : "Você também pode refazer seu perfil de viajante, se achar necessário"}
      onSubmit={() => setNextStep("build-profile")}
    />);
}
