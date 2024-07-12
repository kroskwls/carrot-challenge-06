import { Tabs } from "@/components/tabs";
import { Layoutprops } from "../layout";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default function TabLayout({ children }: Readonly<Layoutprops>) {
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    console.log("요기");
    redirect("/log-in");
  };

  return (
    <div className="">
      {children}
      <Tabs logout={logout} />
    </div>
  );
}