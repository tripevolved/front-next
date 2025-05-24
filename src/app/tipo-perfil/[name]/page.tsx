import { ProfileType } from "@/components/profile/ProfileType";
import { ProfileEnum } from "@/profile.enum";

type Props = {
  params: Promise<{ name: ProfileEnum }>
}

export default async function Page({ params }: Props) {
  const { name } = await params

  return (
    <>
      <div className="w-screen min-h-screen bg-primary-500">
        <ProfileType name={name} />
      </div>
    </>
  );
}
