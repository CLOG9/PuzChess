import { options } from "@/app/api/auth/[...nextauth]/options";
import UserCard from "@/components/layout/userCard";
import { showUser } from "@/server/db/data/users/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function User({ params }: { params: { user: string } }) {
  // console.log(params.user.replace(/[0-9]|%20/g, " "));
  let thePlayer;
  const session = await getServerSession(options);
  if (!session) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }
  if (session) {
    const player = await showUser(params?.user, session?.user?.email);
    thePlayer = player;
    console.log("passed boy", thePlayer);
  }

  return (
    <div className="pt-[10rem] w-full flex justify-center  pb-[12rem] md:px-24  ">
      {/* <p>{thePlayer?.name}</p> */}
      <UserCard user={thePlayer} />
    </div>
  );
}

export default User;