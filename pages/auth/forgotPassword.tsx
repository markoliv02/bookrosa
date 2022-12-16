// @flow
import Image from "next/image";
import * as React from "react";

import logo from "../../assets/logo.svg";

import { useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import supabase from "../../utils/supabase";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let docInit: Document;

const ForgotPassword = () => {
  const [Dom, setDom] = React.useState<Document>(docInit);
  const router = useRouter();
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

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("O e-mail é obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleResetPassword = async (data: any) => {
    try {
      const { data: updateUser, error } =
        await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: "https://casabranca.vercel.app/auth/redefinePassword/aaa",
        });

      if (error) {
        await toast.error(error.message);
      }

      if (updateUser) {
        await toast.success("E-mail de recuperação enviado");
      }
    } catch (error) {
      toast.error(`${error}`);
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
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-3 bg-white rounded-3xl shadow shadow-2xl">
          <div className="col-span-2 hidden xl:block">
            <img
              className="w-full rounded-l-3xl"
              src="https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/092206d1-c899-4d65-8554-3fe7d1be4fa2/galery/006"
              alt=""
            />
          </div>
          <div className="px-5">
            <div className="w=full flex justify-center mt-10">
              <div className="relative">
                <Image className="rounded-l-3xl" src={logo} alt="" />
                <h1>Esqueci minha senha</h1>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="p-2 flex justify-center items-center flex-wrap mt-10"
            >
              <ErrorMessage
                errors={errors}
                className="w-full"
                name="email"
                as={<div style={{ color: "red" }} />}
              />
              <div className="bg-[#D9D9D9] py-6 px-3 w-full rounded-xl my-3">
                <input
                  className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl focus:outline-none w-full"
                  type="text"
                  placeholder="E-mail"
                  {...register("email")}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#FF004C] to-[#FF00D6] py-4 px-14 rounded-3xl text-2xl font-semibold my-5 text-white"
              >
                RECUPERAR
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
