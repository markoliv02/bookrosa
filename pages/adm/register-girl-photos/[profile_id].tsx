// @flow
import Image from "next/image";
import * as React from "react";
type Props = {};

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../../utils/supabase";
import { User } from "@supabase/supabase-js";
import Navbar from "../../../component/Navbar";

let docInit: Document;
const GirlsPhotos = (props: Props) => {
  const { query } = useRouter();
  const router = useRouter();

  const [user, setUser] = React.useState<User>();

  const [Dom, setDom] = React.useState<Document>(docInit);
  const [id, setid] = React.useState<string>();
  const [uploadsCount, setuploadsCount] = React.useState<Array<Number>>([
    1, 2, 3, 4, 5, 6,
  ]);

  const handleUpload001 = async (
    e: React.ChangeEvent<HTMLInputElement>,
    num: Number
  ) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

    if (id !== undefined) {
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(`${id}/galery/` + `00${num}`, file as File);
      if (data) {
        console.log(data);
        toast.success(`Foto ${num} enviada com sucesso !`);
      } else if (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleUploadCapa = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

    if (id !== undefined) {
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(`${id}/${id}` + "_capa", file as File);
      if (data) {
        console.log(data);
        toast.success(`foto de capa enviada com sucesso !`);
      } else if (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

    if (id !== undefined) {
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(`${id}/${id}` + "_video", file as File);

      if (error) {
        toast.error(error.message);
      } else {
        console.log(data);
        toast.success(`video enviado com sucesso !`);
      }
    }
  };

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

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    getUser();
    setDom(document);
    setid(`${query.profile_id}`);
  });
  React.useEffect(() => {
    handleChangeBodyColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dom]);

  return (
    <div className="container mx-auto text-black">
      {user && (
        <>
          <Navbar />
          <div className="flex justify-center items-center my-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-white shadow shadow-xl rounded-3xl w-[1100px]">
              <div className="flex flex-wrap justify-center items-center col-span-2 bg-gradient-to-b from-[#FA00FF] to-[#FF06C8] rounded-3xl lg:rounded-l-3xl w-full">
                <h1
                  className="text-4xl font-semibold text-white mt-10 w-full text-center
            "
                >
                  Video e capa
                </h1>
                <div className="flex flex-wrap justify-center items-center">
                  <div className="mt-10 px-10 py-5">
                    <label
                      className="flex flex-wrap justify-center bg-[#D9D9D9] w-full rounded-[50px] pb-5 shadow shadow-lg cursor-pointer"
                      htmlFor="video"
                    >
                      <span className="rounded-[50px] bg-[#890082] py-20 text-white text-3xl font-semibold w-full text-center">
                        Escolha um video
                      </span>
                      <input
                        type={"file"}
                        className="mt-5 text-[#9C9C9C] text-3xl w-10 md:w-10 lg:w-32 xl:w-40 2xl:w-60"
                        id="video"
                        accept="video/mp4"
                        onChange={handleUploadVideo}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center items-center">
                  <div className="mt-10 px-10 py-5">
                    <label
                      className="flex flex-wrap justify-center bg-[#D9D9D9] w-full rounded-[50px] pb-5 shadow shadow-lg cursor-pointer"
                      htmlFor="capa"
                    >
                      <span className="rounded-[50px] bg-[#890082] py-20 text-white text-3xl font-semibold w-full text-center">
                        Escolha uma capa
                      </span>
                      <input
                        type={"file"}
                        className="mt-5 text-[#9C9C9C] text-3xl w-10 md:w-10 lg:w-32 xl:w-40 2xl:w-60"
                        id="capa"
                        onChange={handleUploadCapa}
                        accept="image/png, image/jpeg, image/jpeg"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-5">
                <div>
                  {uploadsCount.map((item: Number, index) => (
                    <div key={index} className="mt-20">
                      <label
                        className="bg-[#D9D9D9] w-full rounded-full py-8 shadow shadow-lg cursor-pointer"
                        htmlFor={`photo0${item}`}
                      >
                        <span className="rounded-full bg-[#FD03E9] p-8 text-white font-semibold ">
                          {`Escolha a Foto 0${item}`}
                        </span>
                        <input
                          type={"file"}
                          className="ml-2 text-[#9C9C9C] w-10 md:w-10 lg:w-20 xl:w-28 2xl:w-32"
                          id={`photo0${item}`}
                          accept="image/png, image/jpeg, image/jpeg"
                          onChange={(e) => {
                            handleUpload001(e, item);
                          }}
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      router.push("/adm/home");
                    }}
                    className="bg-gradient-to-b from-[#FF004C] to-[#FF00D6] py-4 px-14 rounded-3xl text-2xl font-semibold my-5 text-white mt-10"
                  >
                    FINALIZAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default GirlsPhotos;
