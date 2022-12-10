// @flow
import Image from "next/image";
import * as React from "react";
type Props = {};

import logo from "../../../assets/logo.svg";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/router";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
import * as Yup from "yup";
import supabase from "../../utils/supabase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "@supabase/supabase-js";
import Navbar from "../../component/Navbar";

let docInit: Document;
const GirlsInfo = (props: Props) => {
  const [Dom, setDom] = React.useState<Document>(docInit);
  const [user, setUser] = React.useState<User>();
  const router = useRouter();

  const schema = Yup.object().shape({
    nome: Yup.string().required("nome é obrigatório"),
    pes: Yup.string().required("pes é obrigatório"),
    idade: Yup.string().required("idade é obrigatório"),
    peso: Yup.string().required("peso é obrigatório"),
    cache: Yup.string().required("cache é obrigatório"),
    cidade: Yup.string().required("cidade é obrigatório"),
    telefone: Yup.string()?.phone(
      "BR",
      false,
      "insira um numero de telefone válido"
    ),
    pagamento: Yup.string().required("pagamento é obrigatório"),
    agenda: Yup.string().required("agenda é obrigatório"),
    acompanha: Yup.string().required("acompanha é obrigatório"),
    redesocial: Yup.string().required("redesocial é obrigatório"),
    atendeem: Yup.string().required("redesocial é obrigatório"),
    altura: Yup.string().required("redesocial é obrigatório"),
    destaque: Yup.boolean(),
    desc: Yup.string(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

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

  const handleRegisterNewGirl = async (data: any) => {
    try {
      let Newid = uuidv4();
      const { data: newGirl, error } = await supabase
        .from("acompanhantes")
        .insert([
          {
            id: Newid,
            acompanha: data?.acompanha,
            agenda: data?.agenda,
            cache: data?.cache,
            bairro_cidade: data?.cidade,
            idade: data?.idade,
            nome: data?.nome,
            pagamento: data?.pagamento,
            pes: data?.pes,
            peso: data?.peso,
            social_midia: data?.redesocial,
            celular: data?.telefone,
            atende_em: data?.atendeem,
            altura: data?.altura,
            destaque: data?.destaque,
            desc: data?.desc,
          },
        ]);

      if (error) {
        console.log(error);
        await toast.error(error.message);
      } else {
        await toast.success("registrada com sucesso !");
        setTimeout(() => {
          router.push(`/adm/register-girl-photos/${Newid}`);
        }, 3000);
      }
    } catch (error) {}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setDom(document);
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
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-white shadow shadow-xl rounded-3xl">
              <div className="flex justify-center items-center col-span-2 bg-gradient-to-b from-[#FA00FF] to-[#FF06C8] rounded-l-3xl hidden lg:flex">
                <h1 className="text-4xl font-semibold text-white">
                  Cadastro de acompanhantes
                </h1>
              </div>
              <form
                onSubmit={handleSubmit(handleRegisterNewGirl)}
                className="grid grid-cols-2 p-5 gap-4"
              >
                <div id="01">
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Nome"
                      {...register("nome")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="nome"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Pés"
                      {...register("pes")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="pes"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Idade"
                      {...register("idade")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="idade"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Peso"
                      {...register("peso")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="peso"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Cachê"
                      {...register("cache")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="cache"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Cidade"
                      {...register("cidade")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="cidade"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Telefone"
                      {...register("telefone")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="telefone"
                    as={<div style={{ color: "red" }} />}
                  />
                </div>
                <div id="02">
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Pagamento"
                      {...register("pagamento")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="pagamento"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Agenda"
                      {...register("agenda")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="agenda"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Acompanha"
                      {...register("acompanha")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="acompanha"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="@ Rede Social"
                      {...register("redesocial")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="redesocial"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Atende em"
                      {...register("atendeem")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="atendeem"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Altura"
                      {...register("altura")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="altura"
                    as={<div style={{ color: "red" }} />}
                  />
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <input
                      className="bg-transparent placeholder:text-[#616161] placeholder:font-semibold placeholder:text-xl ml-5 focus:outline-none"
                      type="text"
                      placeholder="Descrição"
                      {...register("desc")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="desc"
                    as={<div style={{ color: "red" }} />}
                  />
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      {...register("destaque")}
                    />

                    <div className="w-11 h-6 bg-[#D9D9D9] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA00FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA00FF]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      GAROTA DESTAQUE
                    </span>
                  </label>
                </div>
                <div className="flex justify-center w-full col-span-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-b from-[#FA00FF] to-[#FF06C8] py-4 px-14 rounded-3xl text-2xl font-semibold my-5 text-white"
                  >
                    REGISTRAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default GirlsInfo;
