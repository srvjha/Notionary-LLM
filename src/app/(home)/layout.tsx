import Header from "@/modules/layout/components/header";
import Footer from "@/modules/layout/components/footer";
import React from "react";
import { currentUser } from "@/modules/authentication/actions";
export const dynamic = "force-dynamic"; 

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div>
      <Header user={user!} />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
