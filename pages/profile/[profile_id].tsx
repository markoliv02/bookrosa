// @flow
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import supabase from "../../utils/supabase";

import wpp from "../../assets/whatsapp.svg";
import logo from "../../assets/logo.svg";
import voltar from "../../assets/botaoVoltar02.svg";

const Profile = () => {
  const { query } = useRouter();
  const router = useRouter();

  const [id, setid] = React.useState<string>();
  const [url, seturl] = React.useState<string>();
  const [Profile, setProfile] = React.useState<Array<any>>([]);
  const [galery, setGalery] = React.useState<Array<string>>([]);
  const [videoUrl, setVideoUrl] = React.useState<string>();

  const [photoView, setPhotoView] = React.useState<string>();
  const [viewPhoto, setViewPhoto] = React.useState<boolean>(false);

  const handleGetProfile = async () => {
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
  };

  const handleGetProfileImage = async () => {
    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(`${Profile[0]?.nome}/${Profile[0]?.nome}001`);

    if (data) {
      // console.log(data);
      seturl(data?.publicUrl);
    }
  };

  const handleGetGaleryImages = async () => {
    let ar = [];
    for (let i = 0; i < 6; i++) {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(`${Profile[0]?.nome}/galery/00${i + 1}`);

      if (data) {
        ar.push(data?.publicUrl);
      }
    }
    setGalery(ar);
  };

  const handleGetVideo = async () => {
    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(`${Profile[0]?.nome}/${Profile[0]?.nome}_video`);

    if (data) {
      setVideoUrl(data?.publicUrl);
    }
  };

  React.useEffect(() => {
    if (Profile.length > 0) {
      handleGetProfileImage();
      handleGetGaleryImages();
      handleGetVideo();
    }
  }, [Profile]);

  React.useEffect(() => {
    console.log(query.profile_id);
    setid(`${query.profile_id}`);
  });

  React.useEffect(() => {
    handleGetProfile();
  }, [id]);

  return (
    <div className="container mx-auto px-7 text-black ">
      <div className="grid grid-cols-4">
        {!viewPhoto && (
          <div className="mt-5 cursor-pointer" onClick={() => router.push("/")}>
            <Image src={voltar} alt="" width={40} height={40} />
          </div>
        )}
        <div className="flex items-center justify-between mt-5 col-span-2">
          <Image src={logo} alt="" width={300} height={300} />
        </div>
      </div>
      {viewPhoto && (
        <div>
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => setViewPhoto(!viewPhoto)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
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
                  photoView
                    ? photoView
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

      {viewPhoto === false && (
        <div>
          <div className="flex justify-center w-full">
            <div id="resume" className="grid grid-cols-3 py-5 w-full">
              <div className="flex justify-start ">
                <div
                  id="profile img"
                  className="relative bg-gray-500 w-28 h-28 rounded-full shadow shadow-[#FF4DA2]"
                >
                  <Image
                    quality={50}
                    src={
                      url
                        ? url
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    className="z-10 rounded-full"
                    fill={true}
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center col-span-2 text-left text-black">
                <div className="ml-5">
                  <h1 className="text-3xl font-semibold">
                    {Profile[0]?.nome} smith
                  </h1>
                  <div className="flex">
                    <Image
                      quality={50}
                      src={
                        wpp
                          ? wpp
                          : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                      }
                      alt=""
                      className="z-10 rounded-full"
                    />

                    <h3 className="ml-1 text-lg">{Profile[0]?.celular}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="divisor"
            className="w-full h-[4px] bg-[#FF4DA2] rounded-full"
          />

          {id && (
            <div id="galeria de fotos" className="py-3">
              <h1 className="text-xl font-semibold">Fotos</h1>

              <div id="grade das fotos" className="grid grid-cols-3 mt-5 gap-2">
                <div
                  onClick={() => {
                    setPhotoView(galery[0]);
                    setViewPhoto(true);
                  }}
                  className="relative w-full h-40 bg-gray-300 cursor-pointer "
                >
                  <Image
                    quality={50}
                    src={
                      galery[0]
                        ? galery[0]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 w-full h-48 cursor-pointer">
                  <div
                    onClick={() => {
                      setPhotoView(galery[1]);
                      setViewPhoto(true);
                    }}
                    className="relative w-full bg-gray-300 "
                  >
                    <Image
                      quality={50}
                      src={
                        galery[1]
                          ? galery[1]
                          : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                      }
                      alt=""
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                  <div
                    onClick={() => {
                      setPhotoView(galery[2]);
                      setViewPhoto(true);
                    }}
                    className="relative w-full bg-gray-300 cursor-pointer"
                  >
                    <Image
                      quality={50}
                      src={
                        galery[2]
                          ? galery[2]
                          : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                      }
                      alt=""
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setPhotoView(galery[3]);
                    setViewPhoto(true);
                  }}
                  className="relative w-full h-48 bg-gray-300 cursor-pointer"
                >
                  <Image
                    quality={50}
                    src={
                      galery[3]
                        ? galery[3]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                  />
                </div>
                <div
                  onClick={() => {
                    setPhotoView(galery[4]);
                    setViewPhoto(true);
                  }}
                  className="relative w-full h-40 bg-gray-300 -mt-8 cursor-pointer"
                >
                  <Image
                    quality={50}
                    src={
                      galery[4]
                        ? galery[4]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                  />
                </div>
                <div
                  onClick={() => {
                    setPhotoView(galery[5]);
                    setViewPhoto(true);
                  }}
                  className="col-span-2 relative w-full bg-gray-300 cursor-pointer"
                >
                  <Image
                    quality={50}
                    src={
                      galery[5]
                        ? galery[5]
                        : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
                    }
                    alt=""
                    fill={true}
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          )}

          <div
            id="divisor"
            className="w-full h-[4px] bg-[#FF4DA2] rounded-full my-3 cursor-pointer"
          />
          <div>
            <h1 className="text-xl font-semibold">Vídeo</h1>

            <div className="flex justify-center w-full h-48 bg-gray-300 mt-5 shadow shadow-[#FF4DA2]">
              <video
                className="w-full h-48"
                src={videoUrl}
                // width={200}
                // height={200}
                controls
              />
            </div>
          </div>

          <div className="overflow-x-auto relative shadow-md rounded-3xl my-10 shadow shadow-[#FF4DA2]">
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
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Bairro/Cidade
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.bairro_cidade}</td>
                </tr>
                <tr className="bg-[#EBE9E9]">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Idade
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.idade}</td>
                </tr>
                <tr className="bg-[#D9D9D9]">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Peso
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.peso}</td>
                </tr>
                <tr className="bg-[#EBE9E9] ">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Pés
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.pes}</td>
                </tr>
                <tr className="bg-[#D9D9D9]">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Celular
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.celular}</td>
                </tr>
                <tr className="bg-[#EBE9E9]">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Agenda
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.agenda}</td>
                </tr>
                <tr className="bg-[#D9D9D9] ">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Acompanha
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.acompanha}</td>
                </tr>
                <tr className="bg-[#EBE9E9] ">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Atende em:
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.atende_em}</td>
                </tr>
                <tr className="bg-[#D9D9D9]">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Cachê
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.cache}</td>
                </tr>
                <tr className="bg-[#EBE9E9]">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap"
                  >
                    Pagamento
                  </th>
                  <td className="py-4 px-6">{Profile[0]?.pagamento}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-5">
            <h1 className="text-xl font-semibold py-5">Descrição</h1>

            <p className="text=lg">{Profile[0]?.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
