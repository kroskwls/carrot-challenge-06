import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findFirst({
      where: { id: session.id }
    });

    if (user) {
      return user;
    }
  }

  notFound();
};

export default async function Profile() {
  const user = await getUser();

  return (
    <div>
      <div>Profile Page</div>
      <div>Welcome : {user.username}</div>
      <div>Your email is {user.email}</div>
    </div>
  );
}