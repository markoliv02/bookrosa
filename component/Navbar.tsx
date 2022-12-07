// @flow
import Image from "next/image";
import * as React from "react";
type Props = {};
import logo from "../assets/logo.svg";

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between w-full bg-transparent my-10">
      <div className="relative">
        <Image
          className="rounded-l-3xl"
          src={logo}
          alt=""
          width={200}
          height={200}
        />
      </div>
      <div>jhean</div>
    </div>
  );
};
export default Navbar;
