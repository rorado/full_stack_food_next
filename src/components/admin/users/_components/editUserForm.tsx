import ProfileForm from "@/components/profile/ProfileForm";
import { authOptions } from "@/server/auth";
import { Translations } from "@/types/translations";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

interface Iprop {
  user: User;
  translate: Translations;
}

const EditUserAdmin = async ({ user, translate }: Iprop) => {
  const { Profile } = translate;
  const initialSession = await getServerSession(authOptions);
  return (
    <div>
      <ProfileForm
        translate={Profile}
        initialSession={initialSession}
        userUpdate={user}
      />
    </div>
  );
};

export default EditUserAdmin;
