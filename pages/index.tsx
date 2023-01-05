import Head from "next/head";
import Image from "next/image";

import botaoX from "../assets/botaoX.png";
import botaoVoltar from "../assets/botaoVoltar.png";

import botaoMatch from "../assets/botaoMatchP.png";

import verificada from "../assets/verificadoIcon.svg";
import destaque from "../assets/destaque.svg";
import menuIcon from "../assets/menuIcon.svg";
import menuIconBlack from "../assets/menuIconBlack.svg";

import logoGold from "../assets/logoRosa.png";

import React, { useEffect } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/router";
import Script from "next/script";
import Profile from "./profile/[profile_id]";

let initScreen: Screen;
let docInit: Document;

export default function Home() {
  const [girlNumberCount, setGirlNumberCount] = React.useState(0);
  const [AllGirls, setAllGirls] = React.useState<Array<any>>([]);

  const [currentGirl, setCurrentGirl] = React.useState<string>();
  const [previousGirl, setPreviousGirl] = React.useState<string>();
  const [nextGirl, setNextGirl] = React.useState<string>();
  const [currentName, setCurrentName] = React.useState([]);

  const [currentScreenProps, setCurrentScreenProps] =
    React.useState<Screen>(initScreen);
  const [Dom, setDom] = React.useState<Document>(docInit);

  const router = useRouter();

  const handleGetAllGirls = async () => {
    try {
      let { data: acompanhantes, error } = await supabase
        .from("acompanhantes")
        .select("*");

      let activeGirls = [];
      if (acompanhantes) {
        for (let i = 0; i < acompanhantes.length; i++) {
          if (acompanhantes[i]?.status) {
            activeGirls.push(acompanhantes[i]);
          }
        }
        handleOrderAllGirls(activeGirls);
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
      let girlsRandom: Array<any> = [];
      const maxNumbers = girls.length;
      let list = [];
      for (let i = 0; i < maxNumbers; i++) {
        list[i] = i;
      }
      let randomNumber;
      let tmp;
      for (let i = list.length; i; ) {
        randomNumber = (Math.random() * i--) | 0;
        tmp = list[randomNumber];
        // troca o número aleatório pelo atual
        list[randomNumber] = list[i];
        // troca o atual pelo aleatório
        list[i] = tmp;
      }
      for (let i = 0; i < list.length; i++) {
        girlsRandom.push(girls[list[i]]);
      }
      // ordenando por destaque primeiro e depois comuns
      for (let i = 0; i < girlsRandom.length; i++) {
        if (girlsRandom[i]?.destaque) {
          girlsOrdered.unshift(girlsRandom[i]);
        } else {
          girlsOrdered.push(girlsRandom[i]);
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
            bd.style.backgroundImage = "none";
          } else if (currentScreenProps?.availWidth < 770) {
            bd.style.backgroundColor = "white";
            bd.style.backgroundImage = "none";
          } else {
            if (AllGirls[girlNumberCount]?.destaque) {
              bd.style.backgroundColor = "black";
              bd.style.backgroundImage = "none";
            } else {
              bd.style.backgroundColor = "white";
              bd.style.backgroundImage = "none";
            }
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

  const handleCountClick = async () => {
    const { data, error } = await supabase
      .from("acompanhantes")
      .update({ clicks: AllGirls[girlNumberCount]?.clicks + 1 })
      .eq("id", AllGirls[girlNumberCount]?.id);

    await router.push(`/profile/${AllGirls[girlNumberCount]?.id}`);
  };

  useEffect(() => {
    handleGetCurrentGirlImage();
    handleGetNextGirlImage();
    handleGetPreviousGirlImage();
    changeBodyColor();
    let currentName = AllGirls[girlNumberCount]?.nome;

    if (currentName !== undefined) {
      const nameArray = currentName.split(" ");
      setCurrentName(nameArray);
    }
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
      <Head>
        <title>Casa Branca - Home</title>
        <meta
          name="description"
          content="Diversas garotas acompanhantes para qualquer gosto e qualquer hora"
        />
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YNJE9LHTDH"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YNJE9LHTDH');
          
          `}
      </Script>
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
              <div className="flex justify-center shadow-md shadow-[#EC268F] items-center text-2xl text-[#828282] bg-white w-full rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                <h1>Vazio</h1>
              </div>
            )}
            {girlNumberCount > 0 && (
              <div>
                <div className="rounded-3xl shadow-md shadow-[#EC268F] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
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
          className={`flex items-center `}
        >
          <div className="mb-82">
            <div className="flex justify-end w-full ">
              <Image
                src={
                  AllGirls[girlNumberCount]?.destaque ? menuIcon : menuIconBlack
                }
                alt=""
                className="mr-5 md:-mt-32 mt-5 cursor-pointer"
                onClick={() => {
                  document.location.replace("/contato");
                }}
              />
            </div>
            <div className="flex items-center justify-center md:-mt-20 mb-10 mt-3">
              <Image
                src={AllGirls[girlNumberCount]?.destaque ? logoGold : logoGold}
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div
              id="img bnt"
              className="flex justify-center flex-wrap mb-5 mt-2 bg-transparent px-5 "
            >
              {AllGirls[girlNumberCount]?.destaque && (
                <div className="flex justify-center w-full">
                  <Image src={destaque} alt="" className="mr-2 a-mt-[280px]" />
                </div>
              )}
              <div
                onClick={() =>
                  router.push(`/profile/${AllGirls[girlNumberCount]?.id}`)
                }
                className="flex justify-center items-center md:h-auto cursor-pointer"
              >
                {/* em currentScreenProps, posso definir diferentes tamanhos para a foto de acordo com a altura ou largura do display do celular */}
                {/* className={`rounded-3xl shadow shadow-xl brightness-75 shadow-[#EC268F] ${
                    currentScreenProps?.availHeight > 800
                      ? "h-[450px]"
                      : "h-[450px]"
                  }  md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]`} */}
                {/* <img
                  src={currentGirl}
                  alt=""
                  className={`rounded-3xl shadow shadow-xl brightness-75 shadow-[#EC268F] ${
                    AllGirls[girlNumberCount]?.destaque
                      ? "h-[450px]"
                      : "h-[500px]"
                  }  md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]`}
                /> */}
                <img
                  src={currentGirl}
                  alt=""
                  className={`rounded-3xl shadow shadow-xl brightness-75 shadow-[#EC268F]  md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]`}
                />
              </div>

              <div
                id="nome e social"
                className={`z-10 flex flex-wrap items-end px-5 ml-3 ${
                  currentScreenProps?.availHeight < 830 ? "-mt-96" : "-mt-80"
                } `}
              >
                <div
                  onClick={() =>
                    router.push(`/profile/${AllGirls[girlNumberCount]?.id}`)
                  }
                  className="flex items-end z-10 h-5/6 2xl:ml-10 cursor-pointer ml-2"
                >
                  <div>
                    <h1 className="flex items-center w-full relative text-white text-4xl font-semibold">
                      <Image src={verificada} alt="" className="mr-1" />
                      {currentName[0]}{" "}
                      <span className="ml-2 text-3xl">
                        {AllGirls[girlNumberCount]?.idade === "0"
                          ? " "
                          : AllGirls[girlNumberCount]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl h-7 w-full bg-transparent">
                      {/* @{AllGirls[girlNumberCount]?.social_midia} */}
                    </h3>
                  </div>
                </div>

                <div className="z-20 grid grid-cols-3 z-10 mt-3 md:mt-10 w-full ">
                  {/* reposicionar e ajustar o tamanho do botão */}

                  <div id="botao voltar" className="flex justify-start">
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
                      quality={100}
                      className="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 cursor-pointer"
                    />
                  </div>

                  <div
                    id="botao match"
                    onClick={() => handleCountClick()}
                    className="z-20 -mt-10 sm:-mt-14 md:-mt-10 lg:-mt-14 xl:-mt-36 2xl:-mt-28 w-full flex justify-center items-center md:items-end cursor-pointer"
                  >
                    <Image
                      src={botaoMatch}
                      quality={100}
                      alt=""
                      className="w-24 h-24 md:w-20 md:h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32"
                    />
                  </div>

                  <div id="botao X" className="flex justify-end">
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
                      quality={100}
                      className="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 cursor-pointer"
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
              <div className="flex justify-center shadow-md shadow-[#EC268F] items-center text-2xl text-[#828282] bg-white w-full rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                <h1>Vazio</h1>
              </div>
            )}
            {girlNumberCount + 1 < AllGirls.length && (
              <div>
                <div className="rounded-3xl shadow-md shadow-[#EC268F] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
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
