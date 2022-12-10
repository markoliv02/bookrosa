/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import * as React from "react";

import { useRouter } from "next/router";
import supabase from "../../utils/supabase";
import Image from "next/image";

import whatsappIcon from "../../assets/whatsapp.svg";
import botaoVoltar from "../../assets/botaoVoltar02.svg";
import botaoVoltarGold from "../../assets/botaoVoltarGold.svg";

import logo from "../../assets/logo.svg";
import logoGold from "../../assets/logoGold.svg";

let docInit: Document;

const Profile = () => {
  const { query } = useRouter();

  const [id, setid] = React.useState<string>();
  const [Profile, setProfile] = React.useState<Array<any>>([]);
  const [profileImage, setProfileImage] = React.useState<string>();
  const [galery, setGalery] = React.useState<Array<string>>([]);
  const [videoUrl, setVideoUrl] = React.useState<string>();
  const [cell, setCell] = React.useState();

  const [currentPhotoInViewMode, setcurrentPhotoInViewMode] =
    React.useState<string>();
  const [viewPhotoMode, setViewPhotoMode] = React.useState<boolean>(false);

  const [Dom, setDom] = React.useState<Document>(docInit);

  const handleGetProfile = async () => {
    try {
      if (id !== undefined) {
        let { data: acompanhantes, error } = await supabase
          .from("acompanhantes")
          .select("*")

          // Filters
          .eq("id", id);

        if (acompanhantes) {
          setProfile(acompanhantes);
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Erro ao buscar perfil !!! f(handleGetProfile)");
    }
  };

  const handleGetProfileImage = async () => {
    try {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(`${Profile[0]?.id}/${Profile[0]?.id}_capa`);

      if (data) {
        setProfileImage(data?.publicUrl);
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao buscar imagem de perfil!!! f(handleGetProfileImage)"
      );
    }
  };

  const handleGetGaleryImages = async () => {
    try {
      let ar = [];
      for (let i = 0; i < 6; i++) {
        const { data } = supabase.storage
          .from("photos")
          .getPublicUrl(`${Profile[0]?.id}/galery/00${i + 1}`);

        if (data) {
          ar.push(data?.publicUrl);
        }
      }
      setGalery(ar);
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao buscar imagens na galeria do perfil !!! f(handleGetGaleryImages)"
      );
    }
  };

  const handleGetVideo = async () => {
    try {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(`${Profile[0]?.id}/${Profile[0]?.id}_video`);

      if (data) {
        setVideoUrl(data?.publicUrl);
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Erro ao buscar video na galeria do perfil!!! f(handleGetVideo)"
      );
    }
  };

  const handleChangeBodyColor = () => {
    try {
      if (Dom !== undefined) {
        const bd = Dom.querySelector("body");
        if (bd !== null) {
          if (Profile[0]?.destaque) {
            bd.style.backgroundImage = "none";
            bd.style.backgroundColor = "black";
          } else {
            bd.style.backgroundImage = "none";
            bd.style.backgroundColor = "white";
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

  React.useEffect(() => {
    if (Profile.length > 0) {
      handleGetProfileImage();
      handleGetGaleryImages();
      handleGetVideo();
      handleChangeBodyColor();
    }

    if (Profile.length !== 0) {
      let cell = Profile[0]?.celular;
      let cellArray = cell.split("");
      // console.log(cellArray);
      let formatedCell = [];
      for (let i = 0; i < cellArray.length; i++) {
        if (i === 0) {
          formatedCell.push(`(${cellArray[i]}`);
        } else if (i === 1) {
          formatedCell.push(`${cellArray[i]})`);
        } else if (i === 6) {
          formatedCell.push(`${cellArray[i]}-`);
        } else {
          formatedCell.push(cellArray[i]);
        }
      }

      setCell(formatedCell.join(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Profile]);

  React.useEffect(() => {
    setid(`${query.profile_id}`);
    setDom(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //não colocar ',[]' pois se colocar quando der reload na pagina não vai carregar os dados
  });

  React.useEffect(() => {
    handleGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container mx-auto px-7 text-black">
      <div className="grid grid-cols-4 md:grid-cols-1">
        {!viewPhotoMode && (
          <div
            className="mt-5 cursor-pointer md:hidden"
            onClick={() => document.location.replace("/")}
          >
            <Image
              src={Profile[0]?.destaque ? botaoVoltarGold : botaoVoltar}
              alt=""
              width={40}
              height={40}
            />
          </div>
        )}
        <div className="flex items-center justify-between md:justify-center mt-5 col-span-2">
          <Image
            src={Profile[0]?.destaque ? logoGold : logo}
            alt=""
            width={300}
            height={300}
          />
        </div>
      </div>
      {viewPhotoMode && (
        <div>
          <div
            className="flex justify-end cursor-pointer rounded-full"
            onClick={() => setViewPhotoMode(!viewPhotoMode)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 bg-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex justify-center items-center ">
            <div className="relative w-full h-screen">
              <Image
                quality={100}
                src={
                  currentPhotoInViewMode
                    ? currentPhotoInViewMode
                    : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                }
                alt=""
                className="z-10"
                fill={true}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      )}

      {viewPhotoMode === false && (
        <div>
          <div className="flex justify-center w-full">
            <div className="md:grid md:grid-cols-3 md:w-full md:justify-start">
              <div id="resume" className="grid grid-cols-3 md:py-5 w-full">
                <div
                  className={`grid grid-cols-3 py-5 col-span-3 rounded-3xl md:bg-[#D9D9D9] shadow-none mr-5 lg:pl-4 md:pl-0 pb-10 md:grid-cols-1 lg:grid-cols-3 ${
                    Profile[0]?.destaque
                      ? "md:shadow-[#FFB800] md:shadow-lg"
                      : "md:shadow-[#FF4DA2] md:shadow-md "
                  }`}
                >
                  <div className="flex justify-start md:justify-center">
                    <div
                      id="profile"
                      className={`relative bg-gray-500 w-24 h-24 xl:w-32 xl:h-32 rounded-full  shadow ${
                        Profile[0]?.destaque
                          ? "shadow-[#FFB800] shadow-lg"
                          : "shadow-[#FF4DA2] shadow-lg"
                      } `}
                    >
                      <Image
                        quality={100}
                        src={
                          profileImage
                            ? profileImage
                            : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                        }
                        alt=""
                        className="z-10 rounded-full"
                        fill={true}
                        objectFit="cover"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start items-center col-span-2 text-left text-black md:justify-center lg:justify-start">
                    <div className="ml-5">
                      <h1
                        className={`text-3xl font-semibold text-3xl md:text-2xl lg:text-3xl ${
                          Profile[0]?.destaque
                            ? "text-white lg:text-black"
                            : "text-black"
                        }`}
                      >
                        {Profile[0]?.nome}{" "}
                      </h1>
                      <div className="flex">
                        <Image
                          quality={100}
                          src={
                            whatsappIcon
                              ? whatsappIcon
                              : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                          }
                          alt=""
                          className="z-10 rounded-full"
                        />

                        <h3
                          onClick={() => {
                            window.open(
                              `https://api.whatsapp.com/send?phone=55${Profile[0]?.celular}&text=`
                            );
                          }}
                          className={`ml-1 cursor-pointer text-lg md:text-sm lg:text-lg ${
                            Profile[0]?.destaque
                              ? "text-white lg:text-black"
                              : "text-black"
                          }`}
                        >
                          {cell}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`overflow-x-auto relative shadow-md rounded-3xl my-10 col-span-3 mr-5 hidden md:block ${
                    Profile[0]?.destaque
                      ? "shadow shadow-[#FFB800] shadow-xl"
                      : "shadow-[#FF4DA2] shadow-md"
                  }`}
                >
                  <table className="w-full text-sm text-left ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-0 px-6"></th>
                        <th scope="col" className="py-0 px-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#D9D9D9] ">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Bairro/Cidade
                        </th>
                        <td className="py-4 px-6 text-lg md:text-sm md:px-2">
                          {Profile[0]?.bairro_cidade}
                        </td>
                      </tr>
                      <tr className="bg-[#EBE9E9]">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Idade
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.idade}
                        </td>
                      </tr>
                      <tr className="bg-[#D9D9D9]">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Peso
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.peso}
                        </td>
                      </tr>
                      <tr className="bg-[#EBE9E9] ">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Pés
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.pes}
                        </td>
                      </tr>
                      <tr className="bg-[#D9D9D9]">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Celular
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.celular}
                        </td>
                      </tr>
                      <tr className="bg-[#EBE9E9]">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Agenda
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.agenda}
                        </td>
                      </tr>
                      <tr className="bg-[#D9D9D9] ">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Acompanha
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.acompanha}
                        </td>
                      </tr>
                      <tr className="bg-[#EBE9E9] ">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Atende em:
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.atende_em}
                        </td>
                      </tr>
                      <tr className="bg-[#D9D9D9]">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Cachê
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.cache}
                        </td>
                      </tr>
                      <tr className="bg-[#EBE9E9]">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                        >
                          Pagamento
                        </th>
                        <td className="py-4 px-6 text-sm md:px-2">
                          {Profile[0]?.pagamento}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  className={`mb-5 hidden md:block col-span-3 h-64 overflow-hidden mr-3 lg:-mt-10  ${
                    Profile[0]?.destaque ? "text-white" : "text-black"
                  } `}
                >
                  <h1 className="text-xl font-semibold py-5">Descrição</h1>

                  <p className="text=lg lg:text-sm">{Profile[0]?.desc}</p>
                </div>
              </div>
              <div
                id="divisor"
                className={`w-full h-[4px]  rounded-full md:hidden ${
                  Profile[0]?.destaque ? "bg-[#FFB800]" : "bg-[#FF4DA2]"
                }`}
              />

              <div
                id="grade das fotos"
                className="grid grid-cols-3 mt-5 gap-2 md:gap-8 col-span-2 md:h-[780px]"
              >
                <div
                  onClick={() => {
                    setcurrentPhotoInViewMode(galery[0]);
                    setViewPhotoMode(true);
                  }}
                  className="relative w-full h-40 md:h-[33rem] bg-transparent cursor-pointer"
                >
                  <Image
                    id="01"
                    quality={100}
                    src={
                      galery[0]
                        ? galery[0]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                    className={`rounded-3xl shadow ${
                      Profile[0]?.destaque
                        ? "shadow shadow-[#FFB800] shadow-lg "
                        : "shadow-[#FF4DA2] shadow-md"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 md:gap-8 w-full h-48 md:h-[33rem] cursor-pointer">
                  <div
                    onClick={() => {
                      setcurrentPhotoInViewMode(galery[1]);
                      setViewPhotoMode(true);
                    }}
                    className="relative w-full bg-transparent "
                  >
                    <Image
                      id="02"
                      quality={100}
                      src={
                        galery[1]
                          ? galery[1]
                          : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                      }
                      alt=""
                      fill={true}
                      objectFit="cover"
                      className={`rounded-3xl shadow ${
                        Profile[0]?.destaque
                          ? "shadow-[#FFB800] shadow-lg"
                          : "shadow-[#FF4DA2] shadow-md"
                      }`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setcurrentPhotoInViewMode(galery[2]);
                      setViewPhotoMode(true);
                    }}
                    className="relative w-full bg-transparent cursor-pointer"
                  >
                    <Image
                      id="03"
                      quality={100}
                      src={
                        galery[2]
                          ? galery[2]
                          : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                      }
                      alt=""
                      fill={true}
                      objectFit="cover"
                      className={`rounded-3xl shadow ${
                        Profile[0]?.destaque
                          ? "shadow-[#FFB800] shadow-lg"
                          : "shadow-[#FF4DA2] shadow-md"
                      }`}
                    />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setcurrentPhotoInViewMode(galery[3]);
                    setViewPhotoMode(true);
                  }}
                  className="relative w-full h-48 md:h-[33rem] bg-transparent cursor-pointer"
                >
                  <Image
                    id="04"
                    quality={100}
                    src={
                      galery[3]
                        ? galery[3]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                    className={`rounded-3xl shadow ${
                      Profile[0]?.destaque
                        ? "shadow-[#FFB800] shadow-lg"
                        : "shadow-[#FF4DA2] shadow-md"
                    }`}
                  />
                </div>
                <div
                  onClick={() => {
                    setcurrentPhotoInViewMode(galery[4]);
                    setViewPhotoMode(true);
                  }}
                  className="relative w-full h-[190px] md:h-[33rem] md:mt-0 -mt-7 bg-transparent cursor-pointer"
                >
                  <Image
                    id="05"
                    quality={100}
                    src={
                      galery[4]
                        ? galery[4]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                    className={`rounded-3xl shadow ${
                      Profile[0]?.destaque
                        ? "shadow-[#FFB800] shadow-lg"
                        : "shadow-[#FF4DA2] shadow-md"
                    }`}
                  />
                </div>
                <div
                  onClick={() => {
                    setcurrentPhotoInViewMode(galery[5]);
                    setViewPhotoMode(true);
                  }}
                  className="col-span-2 h-40 md:h-[33rem] relative w-full bg-transparent cursor-pointer"
                >
                  <Image
                    id="06"
                    quality={100}
                    src={
                      galery[5]
                        ? galery[5]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                    className={`rounded-3xl shadow ${
                      Profile[0]?.destaque
                        ? "shadow-[#FFB800] shadow-lg"
                        : "shadow-[#FF4DA2] shadow-md"
                    }`}
                  />
                </div>
              </div>
              <div
                id="divisor 2"
                className={`w-full h-[4px] rounded-full mt-10 col-span-3 ${
                  Profile[0]?.destaque ? "bg-[#FFB800]" : "bg-[#FF4DA2]"
                }`}
              />
              <div className="col-span-3">
                <h1 className="text-xl font-semibold">Vídeo</h1>

                <div
                  className={`flex justify-center w-full h-48 md:h-[33rem] bg-gray-300 my-5 shadow rounded-3xl ${
                    Profile[0]?.destaque
                      ? "shadow-[#FFB800] shadow-lg"
                      : "shadow-[#FF4DA2] shadow-md"
                  }`}
                >
                  <video
                    className="w-full h-48 md:h-[33rem] rounded-3xl"
                    src={videoUrl}
                    // width={200}
                    // height={200}
                    controls
                  />
                </div>
              </div>
              <div
                className={`overflow-x-auto relative shadow-md rounded-3xl my-10 shadow shadow-md md:hidden ${
                  Profile[0]?.destaque
                    ? "shadow shadow-[#FFB800] shadow-xl"
                    : "shadow-[#FF4DA2] shadow-md"
                }`}
              >
                <table className="w-full text-sm text-left ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-0 px-6"></th>
                      <th scope="col" className="py-0 px-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#D9D9D9] ">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Bairro/Cidade
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.bairro_cidade}
                      </td>
                    </tr>
                    <tr className="bg-[#EBE9E9]">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Idade
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.idade}
                      </td>
                    </tr>
                    <tr className="bg-[#D9D9D9]">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Peso
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.peso}
                      </td>
                    </tr>
                    <tr className="bg-[#EBE9E9] ">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Pés
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.pes}
                      </td>
                    </tr>
                    <tr className="bg-[#D9D9D9]">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Celular
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.celular}
                      </td>
                    </tr>
                    <tr className="bg-[#EBE9E9]">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Agenda
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.agenda}
                      </td>
                    </tr>
                    <tr className="bg-[#D9D9D9] ">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Acompanha
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.acompanha}
                      </td>
                    </tr>
                    <tr className="bg-[#EBE9E9] ">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Atende em:
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.atende_em}
                      </td>
                    </tr>
                    <tr className="bg-[#D9D9D9]">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Cachê
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.cache}
                      </td>
                    </tr>
                    <tr className="bg-[#EBE9E9]">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap md:text-base md:px-2 xl:px-6 xl:text-lg"
                      >
                        Pagamento
                      </th>
                      <td className="py-4 px-6 text-sm md:px-2">
                        {Profile[0]?.pagamento}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className={`mb-5 md:hidden h-40 ${
                  Profile[0]?.destaque ? "text-white" : "text-black"
                }`}
              >
                <h1 className="text-xl font-semibold py-5">Descrição</h1>

                <p className="text=lg">{Profile[0]?.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
