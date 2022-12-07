// @flow
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import Navbar from "../../component/Navbar";
import supabase from "../../utils/supabase";

let docInit: Document;

const Home = () => {
  const router = useRouter();

  const [Dom, setDom] = React.useState<Document>(docInit);
  const [AllGirls, setAllGirls] = React.useState<Array<any>>([]);
  const [allGirlImagesUrls, setAllGirlImagesUrls] = React.useState<Array<any>>(
    []
  );

  const handleChangeBodyColor = () => {
    try {
      if (Dom !== undefined) {
        const bd = Dom.querySelector("body");
        if (bd !== null) {
          bd.style.backgroundColor = "white";
        }
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao atualizar background color em body!!! f(handleChangeBodyColor)"
      );
    }
  };

  const handleGetAllGirls = async () => {
    try {
      let { data: acompanhantes, error } = await supabase
        .from("acompanhantes")
        .select("*");

      if (acompanhantes) {
        setAllGirls(acompanhantes);
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      console.log("Erro ao buscar dados das garotas !!! f(handleGetAllGirls)");
    }
  };

  const handleGetAllGirlsImages = async () => {
    try {
      let allGirlImagesUrls: Array<any> = [];
      AllGirls.map((girl, index) => {
        const { data } = supabase.storage
          .from("photos")
          .getPublicUrl(`${girl?.id}/${girl?.id}_capa`);
        if (data) {
          allGirlImagesUrls.push(data?.publicUrl);
        }
      });

      setAllGirlImagesUrls(allGirlImagesUrls);
    } catch (error) {}
  };

  React.useEffect(() => {
    setDom(document);
    handleChangeBodyColor();
  });

  React.useEffect(() => {
    handleChangeBodyColor();
    handleGetAllGirls();
  }, []);

  React.useEffect(() => {
    if (AllGirls.length > 0) {
      handleGetAllGirlsImages();
    }
  }, [AllGirls]);

  return (
    <div className="container mx-auto text-black">
      <Navbar />
      <div className="grid grid-cols-6 gap-8 mx-10 h-full">
        <div
          onClick={() => {
            router.push("/adm/girlinfo");
          }}
          className="col-span-2 cursor-pointer hover:brightness-75"
        >
          <div className="relative rounded-3xl h-80">
            <Image
              src={
                "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/8b1d70e0-f7e6-4d3a-9f77-f35eecf1b94c/galery/006"
              }
              alt=""
              className="rounded-3xl brightness-75 h-82"
              fill={true}
              objectFit="cover"
            />
          </div>
          <div className="flex items-end z-10 h-5/6 2xl:ml-10 xl-mt-56 2xl:-mt-80 ml-5">
            <div>
              <h1 className="relative text-white text-xl font-semibold">
                CADASTRAR
              </h1>
            </div>
          </div>
        </div>
        {AllGirls.map((girl, index) => (
          <div key={index} className="h-80 hover:brightness-75">
            <div className="relative rounded-3xl h-80 cursor-pointer">
              <Image
                src={
                  allGirlImagesUrls[index]
                    ? allGirlImagesUrls[index]
                    : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                }
                alt=""
                className="rounded-3xl brightness-75"
                fill={true}
                objectFit="cover"
              />
            </div>
            <div className="flex items-end z-10 h-5/6 2xl:ml-10 xl-mt-56 2xl:-mt-80 ml-5">
              <div>
                <h1 className="relative text-white text-xl font-semibold">
                  {girl?.nome}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;