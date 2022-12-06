import Head from "next/head";
import Image from "next/image";

import botaoX from "../assets/botaox.svg";
import botaoVoltar from "../assets/botaoVoltar.svg";
import botaoMatch from "../assets/botaoMatch.svg";
import botaoMatchGold from "../assets/botaoMatchGold.svg";

import logo from "../assets/logo.svg";
import logoGold from "../assets/logoGold.svg";

import React, { useEffect } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/router";

let initScreen: Screen;
let docInit: Document;

export default function Home() {
  const [girlNumberCount, setGirlNumberCount] = React.useState(0);
  const [AllGirls, setAllGirls] = React.useState<Array<any>>([]);

  const [currentGirl, setCurrentGirl] = React.useState<string>();
  const [previousGirl, setPreviousGirl] = React.useState<string>();
  const [nextGirl, setNextGirl] = React.useState<string>();

  const [currentScreenProps, setCurrentScreenProps] =
    React.useState<Screen>(initScreen);
  const [Dom, setDom] = React.useState<Document>(docInit);

  const router = useRouter();

  const handleGetAllGirls = async () => {
    try {
      let { data: acompanhantes, error } = await supabase
        .from("acompanhantes")
        .select("*");

      if (acompanhantes) {
        handleOrderAllGirls(acompanhantes);
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      console.log("Erro ao buscar dados das garotas !!! f(handleGetAllGirls)");
    }
  };

  const handleOrderAllGirls = (girls: Array<any>) => {
    try {
      let girlsOrdered: Array<any> = [];
      for (let i = 0; i < girls.length; i++) {
        if (girls[i]?.destaque) {
          girlsOrdered.unshift(girls[i]);
        } else {
          girlsOrdered.push(girls[i]);
        }
      }
      setAllGirls(girlsOrdered);
    } catch (error) {
      console.error(error);
      console.log("Erro ao ordenar as garotas !!! f(handleOrderAllGirls)");
    }
  };

  const handleGetCurrentGirlImage = async () => {
    try {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(
          `${AllGirls[girlNumberCount]?.id}/${AllGirls[girlNumberCount]?.id}_capa`
        );

      if (data) {
        setCurrentGirl(data?.publicUrl);
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao buscar foto de capa da garota atual!!! f(handleGetCurrentGirlImage)"
      );
    }
  };

  const handleGetPreviousGirlImage = async () => {
    try {
      if (girlNumberCount !== 0) {
        const { data } = supabase.storage
          .from("photos")
          .getPublicUrl(
            `${AllGirls[girlNumberCount - 1]?.id}/${
              AllGirls[girlNumberCount - 1]?.id
            }_capa`
          );

        if (data) {
          setPreviousGirl(data?.publicUrl);
        }
      } else {
        setPreviousGirl(undefined);
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao buscar foto de capa da garota anterior!!! f(handleGetPreviousGirlImage)"
      );
    }
  };

  const handleGetNextGirlImage = async () => {
    try {
      if (girlNumberCount + 1 === AllGirls.length) {
        setNextGirl(undefined);
      } else {
        const { data } = supabase.storage
          .from("photos")
          .getPublicUrl(
            `${AllGirls[girlNumberCount + 1]?.id}/${
              AllGirls[girlNumberCount + 1]?.id
            }_capa`
          );

        if (data) {
          setNextGirl(data?.publicUrl);
        }
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao buscar foto de capa da proxima garota!!! f(handleGetNextGirlImage)"
      );
    }
  };

  const changeBodyColor = () => {
    try {
      if (Dom !== undefined) {
        const bd = Dom.querySelector("body");

        if (bd !== null) {
          if (
            AllGirls[girlNumberCount]?.destaque &&
            currentScreenProps?.availWidth < 770
          ) {
            bd.style.backgroundColor = "black";
          } else if (currentScreenProps?.availWidth < 770) {
            bd.style.backgroundColor = "white";
          } else {
            bd.style.backgroundColor = "#ff93c6";
          }
        }
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao atualizar background color em body!!! f(handleChangeBodyColor)"
      );
    }
  };

  useEffect(() => {
    handleGetCurrentGirlImage();
    handleGetNextGirlImage();
    handleGetPreviousGirlImage();
    changeBodyColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [girlNumberCount, AllGirls]);

  useEffect(() => {
    handleGetAllGirls();
    setCurrentScreenProps(screen);
    setDom(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto text-black">
      <div className="md:grid md:grid-cols-3 md:h-screen">
        <div
          id="garota anterior"
          className="hidden md:flex flex-wrap justify-center items-center mr-10"
        >
          <div>
            <h1 className="w-full text-3xl font-semibold text-white my-5 ml-2">
              Anterior
            </h1>
            {girlNumberCount === 0 && (
              <div className="flex justify-center items-center text-2xl text-[#828282] bg-white w-full rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                <h1>Vazio</h1>
              </div>
            )}
            {girlNumberCount > 0 && (
              <div>
                <div className="rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                  <img
                    src={previousGirl}
                    alt=""
                    className="rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] brightness-75"
                  />
                </div>
                <div className="flex items-end z-10 h-5/6 2xl:ml-10 -mt-24 ml-5">
                  <div>
                    <h1 className="relative text-white text-4xl font-semibold">
                      {AllGirls[girlNumberCount - 1]?.nome}{" "}
                      <span className="text-3xl">
                        {AllGirls[girlNumberCount - 1]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl">
                      @{AllGirls[girlNumberCount - 1]?.social_midia}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          id="garota atual"
          style={{ transition: "background-color 0.5s ease" }}
          className={`flex items-center h-screen ${
            AllGirls[girlNumberCount]?.destaque ? "bg-black" : "bg-white"
          }`}
        >
          <div className="mb-82">
            <div className="flex items-center justify-center">
              <Image
                src={AllGirls[girlNumberCount]?.destaque ? logoGold : logo}
                alt=""
                width={200}
                height={100}
              />
            </div>
            <div
              id="img bnt"
              className="flex justify-center flex-wrap mb-5 mt-2 bg-transparent px-5"
            >
              <div
                onClick={() =>
                  router.push(`/profile/${AllGirls[girlNumberCount]?.id}`)
                }
                className="flex justify-center items-center md:h-auto cursor-pointer"
              >
                <img
                  src={currentGirl}
                  alt=""
                  className={`rounded-3xl shadow shadow-xl brightness-75 ${
                    AllGirls[girlNumberCount]?.destaque
                      ? "shadow-[#FFB800]"
                      : "shadow-[#FF4DA2]"
                  } ${
                    currentScreenProps?.availHeight > 800
                      ? "h-[700px]"
                      : "h-[500px]"
                  }  md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]`}
                />
              </div>

              <div
                id="nome e social"
                className={`z-10 flex flex-wrap items-end px-5 ${
                  currentScreenProps?.availHeight < 830 ? "-mt-96" : "-mt-64"
                } `}
              >
                <div
                  onClick={() =>
                    router.push(`/profile/${AllGirls[girlNumberCount]?.id}`)
                  }
                  className="flex items-end z-10 h-5/6 2xl:ml-10 cursor-pointer ml-2"
                >
                  <div>
                    <h1 className="relative text-white text-4xl font-semibold">
                      {AllGirls[girlNumberCount]?.nome}{" "}
                      <span className="text-3xl">
                        {AllGirls[girlNumberCount]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl">
                      @{AllGirls[girlNumberCount]?.social_midia}
                    </h3>
                  </div>
                </div>

                <div className="z-20 grid grid-cols-3 z-10 mt-0 md:mt-5 w-full ">
                  <div
                    id="voltar"
                    className="w-full flex justify-start cursor-pointer"
                  >
                    <Image
                      onClick={() => {
                        if (girlNumberCount === 0) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount - 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoVoltar}
                      alt=""
                      className="rounded-full drop-shadow-xl md:hidden"
                      width={90}
                      height={90}
                    />

                    <Image
                      onClick={() => {
                        if (girlNumberCount === 0) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount - 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoVoltar}
                      alt=""
                      className="rounded-full drop-shadow-xl hidden 2xl:block"
                      width={100}
                      height={100}
                    />

                    <Image
                      onClick={() => {
                        if (girlNumberCount === 0) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount - 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoVoltar}
                      alt=""
                      className="rounded-full drop-shadow-xl  hidden  lg:block 2xl:hidden"
                      width={80}
                      height={80}
                    />

                    <Image
                      onClick={() => {
                        if (girlNumberCount === 0) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount - 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoVoltar}
                      alt=""
                      className="rounded-full drop-shadow-xl  hidden  md:block lg:hidden 2xl:hidden"
                      width={60}
                      height={60}
                    />
                  </div>

                  <div
                    onClick={() =>
                      router.push(`/profile/${AllGirls[girlNumberCount]?.id}`)
                    }
                    className="z-20 -mt-10 sm:-mt-14 md:-mt-10 lg:-mt-14 xl:-mt-36 2xl:-mt-28 w-full flex justify-center cursor-pointer"
                  >
                    {/* mobile button */}
                    <Image
                      src={
                        AllGirls[girlNumberCount]?.destaque
                          ? botaoMatchGold
                          : botaoMatch
                      }
                      className="rounded-full drop-shadow-xl md:hidden"
                      alt=""
                      width={110}
                      height={110}
                    />

                    <Image
                      src={
                        AllGirls[girlNumberCount]?.destaque
                          ? botaoMatchGold
                          : botaoMatch
                      }
                      className="rounded-full drop-shadow-xl mt-5 hidden 2xl:block"
                      alt=""
                      width={150}
                      height={150}
                    />

                    <Image
                      src={
                        AllGirls[girlNumberCount]?.destaque
                          ? botaoMatchGold
                          : botaoMatch
                      }
                      className="rounded-full drop-shadow-xl mt-5 hidden lg:block 2xl:hidden"
                      alt=""
                      width={100}
                      height={100}
                    />

                    <Image
                      src={
                        AllGirls[girlNumberCount]?.destaque
                          ? botaoMatchGold
                          : botaoMatch
                      }
                      className="rounded-full drop-shadow-xl mt-5 hidden md:block lg:hidden 2xl:hidden"
                      alt=""
                      width={90}
                      height={90}
                    />
                  </div>
                  <div
                    id="x"
                    className="w-full flex justify-end cursor-pointer"
                  >
                    <Image
                      onClick={() => {
                        if (girlNumberCount + 1 === AllGirls.length) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount + 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoX}
                      alt=""
                      className="rounded-full drop-shadow-xl md:hidden"
                      width={90}
                      height={90}
                    />

                    <Image
                      onClick={() => {
                        if (girlNumberCount + 1 === AllGirls.length) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount + 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoX}
                      alt=""
                      className="rounded-full drop-shadow-xl hidden 2xl:block"
                      width={100}
                      height={100}
                    />

                    <Image
                      onClick={() => {
                        if (girlNumberCount + 1 === AllGirls.length) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount + 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoX}
                      alt=""
                      className="rounded-full drop-shadow-xl  hidden  lg:block 2xl:hidden"
                      width={80}
                      height={80}
                    />

                    <Image
                      onClick={() => {
                        if (girlNumberCount + 1 === AllGirls.length) {
                          setGirlNumberCount(0);
                        } else {
                          let index = girlNumberCount + 1;
                          setGirlNumberCount(index);
                        }
                      }}
                      src={botaoX}
                      alt=""
                      className="rounded-full drop-shadow-xl  hidden  md:block lg:hidden 2xl:hidden"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="proxima garota"
          className="hidden md:flex flex-wrap justify-center items-center abg-[#FF93C6] ml-10"
        >
          <div>
            <h1 className="w-full text-3xl font-semibold text-white my-5 ml-2">
              Próxima
            </h1>
            {girlNumberCount + 1 === AllGirls.length && (
              <div className="flex justify-center items-center text-2xl text-[#828282] bg-white w-full rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                <h1>Vazio</h1>
              </div>
            )}
            {girlNumberCount + 1 < AllGirls.length && (
              <div>
                <div className="rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                  <img
                    src={nextGirl}
                    alt=""
                    className="rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] brightness-75"
                  />
                </div>
                <div className="flex items-end z-10 h-5/6 2xl:ml-10 -mt-24 ml-5">
                  <div>
                    <h1 className="relative text-white text-4xl font-semibold">
                      {AllGirls[girlNumberCount + 1]?.nome}{" "}
                      <span className="text-3xl">
                        {AllGirls[girlNumberCount + 1]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl">
                      @{AllGirls[girlNumberCount + 1]?.social_midia}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
