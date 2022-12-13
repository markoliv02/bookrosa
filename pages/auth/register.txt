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

let docInit: Document;

const Register = () => {
  const router = useRouter();
  const [Dom, setDom] = React.useState<Document>(docInit);
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
      .required("E-mail é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha é obrigatória"),
    confirmPassword: Yup.string()
      .required("Repetir a senha é obrigatório")
      .oneOf([Yup.ref("password")], "As senhas não conferem"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data: any) => {
    try {
      let { data: signup, error } = await supabase.auth.signUp({
        email: data?.email,
        password: data?.password,
      });

      if (error) {
        console.log(error.message);
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
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
              </div>
            </div>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="p-2 flex justify-center items-center flex-wrap mt-10"
            >
              <div className="bg-[#D9D9D9] py-6 px-3 w-full rounded-xl my-3">
                <input
                  className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl  focus:outline-none w-full"
                  type="text"
                  placeholder="E-mail"
                  {...register("email")}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name="email"
                as={<div style={{ color: "red" }} />}
              />
              <div className="bg-[#D9D9D9] py-6 px-3 w-full rounded-xl my-3">
                <input
                  className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl focus:outline-none w-full"
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name="password"
                as={<div style={{ color: "red" }} />}
              />
              <div className="bg-[#D9D9D9] py-6 px-3 w-full rounded-xl my-3">
                <input
                  className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl focus:outline-none w-full"
                  type="password"
                  placeholder="Repita a senha"
                  {...register("confirmPassword")}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                as={<div style={{ color: "red" }} />}
              />
              <div className="w-full text-[#FF00D6] font-semibold cursor-pointer">
                <span onClick={() => router.push("/auth/login")}>
                  Fazer Login
                </span>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#FF004C] to-[#FF00D6] py-4 px-14 rounded-3xl text-2xl font-semibold my-5 text-white"
              >
                REGISTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
