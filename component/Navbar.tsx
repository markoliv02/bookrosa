// @flow
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
type Props = {};
import logo from "../assets/logo.svg";
import supabase from "../utils/supabase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full bg-transparent my-10">
      <div
        onClick={() => {
          router.push("/adm/home");
        }}
        className="relative cursor-pointer"
      >
        <Image
          className="rounded-l-3xl"
          src={logo}
          alt=""
          width={200}
          height={200}
        />
      </div>
      <div
        onClick={async () => {
          let { error } = await supabase.auth.signOut();
          if (error) {
            console.log(error);
            toast.error(error.message);
          } else {
            router.push("/auth/login");
          }
        }}
        className="cursor-pointer font-semibold"
      >
        Sair
        <ToastContainer />
      </div>
    </div>
  );
};
export default Navbar;
