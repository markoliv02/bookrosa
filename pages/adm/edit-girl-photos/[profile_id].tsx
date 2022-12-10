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

const EditGirlsPhotos = (props: Props) => {
  const { query } = useRouter();
  const newID = query.profile_id;
  const router = useRouter();

  const [user, setUser] = React.useState<User>();
  const [Profile, setProfile] = React.useState<Array<any>>([]);

  const [galery, setGalery] = React.useState<Array<string>>([]);

  const [Dom, setDom] = React.useState<Document>(docInit);

  const [uploadsCount, setuploadsCount] = React.useState<Array<Number>>([
    1, 2, 3, 4, 5, 6,
  ]);

  const handleRemovePhotos = async (num: Number) => {
    if (query.profile_id !== undefined) {
      const { data, error } = await supabase.storage
        .from("photos")
        .remove([`${query.profile_id}/galery/` + `00${num}`]);
      if (data) {
        console.log(data);
        toast.success(`Foto ${num} deletada com sucesso !`);
      } else if (error) {
        console.log(error);
        toast.error(error.message);
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
      // handleGetGaleryImages(query.profile_id);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setDom(document);
  });

  React.useEffect(() => {
    handleChangeBodyColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dom]);

  return (
    <div className="container mx-auto text-black">
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

            <div className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-96 h-40 my-10 cursor-pointer">
              Excluir Video
            </div>

            <div className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-96 h-40 my-10 cursor-pointer">
              Excluir foto da capa
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <div
              onClick={() => {
                handleRemovePhotos(1);
              }}
              className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-full h-40 cursor-pointer"
            >
              Excluir foto 1
            </div>
            <div
              onClick={() => {
                handleRemovePhotos(2);
              }}
              className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-full h-40 cursor-pointer"
            >
              Excluir foto 2
            </div>
            <div
              onClick={() => {
                handleRemovePhotos(3);
              }}
              className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-full h-40 cursor-pointer"
            >
              Excluir foto 3
            </div>
            <div
              onClick={() => {
                handleRemovePhotos(4);
              }}
              className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-full h-40 cursor-pointer"
            >
              Excluir foto 4
            </div>
            <div
              onClick={() => {
                handleRemovePhotos(5);
              }}
              className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-full h-40 cursor-pointer"
            >
              Excluir foto 5
            </div>
            <div
              onClick={() => {
                handleRemovePhotos(6);
              }}
              className="flex justify-center items-center rounded-[50px] bg-[#890082]  text-white text-3xl font-semibold w-full text-center w-full h-40 cursor-pointer"
            >
              Excluir foto 6
            </div>

            <div
              onClick={() => {
                router.push(`/adm/register-girl-photos/${newID}`);
              }}
              className="flex justify-center items-center bg-gradient-to-b from-[#FF004C] to-[#FF00D6] text-white  font-semibold text-2xl col-span-2 rounded-xl p-5"
            >
              NOVAS FOTOS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGirlsPhotos;
