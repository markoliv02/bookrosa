// @flow
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
type Props = {};

const Teste = (props: Props) => {
  const { query } = useRouter();

  const [image_url, setImage_url] = React.useState<string>();

  React.useEffect(() => {
    setImage_url(`${query?.img_url}`);
  }, []);

  return (
    <div className="container mx-auto px-7 text-black ">
      <div id="image" className="relative">
        <Image
          quality={100}
          src={
            image_url
              ? image_url
              : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
          }
          alt=""
          className="z-10"
          fill={true}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Teste;
