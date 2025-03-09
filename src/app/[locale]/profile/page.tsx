import ProfileForm from "@/components/profile/ProfileForm";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

const ProfilePage = async () => {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const { Profile } = await getTrans(locale);
  return (
    <div className="section-gap container">
      <h2 className="text-primary text-center text-6xl font-[700]">Profile</h2>
      <ProfileForm translate={Profile} initialSession={initialSession} />
    </div>
  );
};

export default ProfilePage;
