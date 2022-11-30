import Head from "next/head";
import Image from "next/image";

import botaoX from "../assets/botaox.svg";
import botaoVoltar from "../assets/botaoVoltar.svg";
import botaoCoracao from "../assets/botaoCoracao.svg";
import logo from "../assets/logo.svg";

import React, { useEffect } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/router";

export default function Home() {
  const [escortCount, setescortCount] = React.useState(0);
  const [AllEscorts, setAllEscorts] = React.useState<Array<any>>([]);

  const [currentGirl, setCurrentGirl] = React.useState<string>();
  const [previousGirl, setPreviousGirl] = React.useState<string>();
  const [nextGirl, setNextGirl] = React.useState<string>();

  const router = useRouter();

  const getAllEscorts = async () => {
    let { data: acompanhantes, error } = await supabase
      .from("acompanhantes")
      .select("*");

    if (acompanhantes) {
      // console.log(acompanhantes);
      setAllEscorts(acompanhantes);
    }
  };

  const getCurrentGirlImage = async () => {
    console.log("length " + AllEscorts.length);
    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(
        `${AllEscorts[escortCount]?.nome}/${AllEscorts[escortCount]?.nome}001`
      );

    if (data) {
      // console.log(data);
      setCurrentGirl(data?.publicUrl);
    }
  };

  const getPreviousGirlImage = async () => {
    if (escortCount !== 0) {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(
          `${AllEscorts[escortCount - 1]?.nome}/${
            AllEscorts[escortCount - 1]?.nome
          }001`
        );

      if (data) {
        setPreviousGirl(data?.publicUrl);
      }
    } else {
      setPreviousGirl(undefined);
    }
  };

  const getNextGirlImage = async () => {
    // console.log("length " + AllEscorts.length);
    if (escortCount + 1 === AllEscorts.length) {
      setNextGirl(undefined);
    } else {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(
          `${AllEscorts[escortCount + 1]?.nome}/${
            AllEscorts[escortCount + 1]?.nome
          }001`
        );

      if (data) {
        // console.log(data);
        setNextGirl(data?.publicUrl);
      }
    }
  };

  useEffect(() => {
    getCurrentGirlImage();
    getNextGirlImage();
    getPreviousGirlImage();
  }, [escortCount, AllEscorts]);

  useEffect(() => {
    getAllEscorts();
    console.log(screen);
  }, []);

  return (
    <div className="container mx-auto text-black">
      <Head>
        <title>Book Rosa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:grid md:grid-cols-3 md:h-screen">
        <div
          id="garota anterior"
          className="hidden md:flex flex-wrap justify-center items-center mr-10"
        >
          <div>
            <h1 className="w-full text-3xl font-semibold text-white my-5 ml-2">
              Anterior
            </h1>
            {escortCount === 0 && (
              <div className="flex justify-center items-center text-2xl text-white  w-full h-[600px] rounded-3xl">
                <h1>Vazio</h1>
              </div>
            )}
            {escortCount > 0 && (
              <div>
                <div className="rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                  <img src={previousGirl} alt="" className="rounded-3xl" />
                </div>
                <div className="flex items-end z-10 h-5/6 2xl:ml-10 -mt-24 ml-5">
                  <div>
                    <h1 className="relative text-white text-4xl font-semibold">
                      {AllEscorts[escortCount - 1]?.nome}{" "}
                      <span className="text-3xl">
                        {AllEscorts[escortCount - 1]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl">
                      @{AllEscorts[escortCount - 1]?.social_midia}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="garota atual" className="flex items-center bg-white">
          <div className="mb-82">
            {/* <div className="flex items-center justify-center -mt-24">
              <Image src={logo} alt="" width={200} height={100} />
            </div> */}
            <div
              id="img bnt"
              className="flex justify-center flex-wrap my-5 bg-transparent px-5"
            >
              <div className="flex justify-center items-center h-[600px]">
                <img src={currentGirl} alt="" className="rounded-3xl" />
              </div>

              <div
                id="nome e social"
                className="z-10 flex flex-wrap items-end px-5 -mt-56"
              >
                <div className="flex items-end z-10 h-5/6 2xl:ml-10">
                  <div>
                    <h1 className="relative text-white text-4xl font-semibold">
                      {AllEscorts[escortCount]?.nome}{" "}
                      <span className="text-3xl">
                        {AllEscorts[escortCount]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl">
                      @{AllEscorts[escortCount]?.social_midia}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 z-10 mt-5 w-full ">
                  <div
                    id="voltar"
                    className="w-full flex justify-start  cursor-pointer"
                  >
                    <Image
                      onClick={() => {
                        if (escortCount === 0) {
                          setescortCount(0);
                        } else {
                          let index = escortCount - 1;
                          setescortCount(index);
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
                        if (escortCount === 0) {
                          setescortCount(0);
                        } else {
                          let index = escortCount - 1;
                          setescortCount(index);
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
                        if (escortCount === 0) {
                          setescortCount(0);
                        } else {
                          let index = escortCount - 1;
                          setescortCount(index);
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
                        if (escortCount === 0) {
                          setescortCount(0);
                        } else {
                          let index = escortCount - 1;
                          setescortCount(index);
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
                      router.push(`/profile/${AllEscorts[escortCount]?.id}`)
                    }
                    className="z-20 -mt-10 sm:-mt-14 md:-mt-10 lg:-mt-14 xl:-mt-36 2xl:-mt-28 w-full flex justify-center cursor-pointer"
                  >
                    {/* mobile button */}
                    <Image
                      src={botaoCoracao}
                      className="rounded-full drop-shadow-xl md:hidden"
                      alt=""
                      width={110}
                      height={110}
                    />

                    <Image
                      src={botaoCoracao}
                      className="rounded-full drop-shadow-xl mt-5 hidden 2xl:block"
                      alt=""
                      width={150}
                      height={150}
                    />

                    <Image
                      src={botaoCoracao}
                      className="rounded-full drop-shadow-xl mt-5 hidden lg:block 2xl:hidden"
                      alt=""
                      width={100}
                      height={100}
                    />

                    <Image
                      src={botaoCoracao}
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
                        console.log("length " + AllEscorts.length);

                        if (escortCount + 1 === AllEscorts.length) {
                          setescortCount(0);
                        } else {
                          let index = escortCount + 1;
                          setescortCount(index);
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
                        console.log("length " + AllEscorts.length);

                        if (escortCount + 1 === AllEscorts.length) {
                          setescortCount(0);
                        } else {
                          let index = escortCount + 1;
                          setescortCount(index);
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
                        console.log("length " + AllEscorts.length);

                        if (escortCount + 1 === AllEscorts.length) {
                          setescortCount(0);
                        } else {
                          let index = escortCount + 1;
                          setescortCount(index);
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
                        console.log("length " + AllEscorts.length);

                        if (escortCount + 1 === AllEscorts.length) {
                          setescortCount(0);
                        } else {
                          let index = escortCount + 1;
                          setescortCount(index);
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
            {escortCount + 1 === AllEscorts.length && (
              <div className="flex justify-center items-center text-2xl text-white  w-full h-[600px] rounded-3xl">
                <h1>Vazio</h1>
              </div>
            )}
            {escortCount + 1 < AllEscorts.length && (
              <div>
                <div className="rounded-3xl md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                  <img src={nextGirl} alt="" className="rounded-3xl " />
                </div>
                <div className="flex items-end z-10 h-5/6 2xl:ml-10 -mt-24 ml-5">
                  <div>
                    <h1 className="relative text-white text-4xl font-semibold">
                      {AllEscorts[escortCount + 1]?.nome}{" "}
                      <span className="text-3xl">
                        {AllEscorts[escortCount + 1]?.idade}
                      </span>
                    </h1>
                    <h3 className="relative text-white text-xl">
                      @{AllEscorts[escortCount + 1]?.social_midia}
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
