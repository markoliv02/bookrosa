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
import supabase from "../../../utils/supabase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "@supabase/supabase-js";
import Navbar from "../../../component/Navbar";
import { profile } from "console";

let docInit: Document;
const EditGirlsInfo = (props: Props) => {
  const { query } = useRouter();
  const router = useRouter();

  const [user, setUser] = React.useState<User>();
  const [Dom, setDom] = React.useState<Document>(docInit);

  const [id, setid] = React.useState<string>();
  const [Profile, setProfile] = React.useState<Array<any>>([]);

  const [nomeEdit, setNomeEdit] = React.useState<boolean>(false);
  const [pesEdit, setPesEdit] = React.useState<boolean>(false);
  const [ageEdit, setAgeEdit] = React.useState<boolean>(false);
  const [weightEdit, setWeightEdit] = React.useState<boolean>(false);
  const [cacheEdit, setCacheEdit] = React.useState<boolean>(false);
  const [cityEdit, setCityEdit] = React.useState<boolean>(false);
  const [cellEdit, setCellEdit] = React.useState<boolean>(false);
  const [payEdit, setPayEdit] = React.useState<boolean>(false);
  const [scheduleEdit, setScheduleEdit] = React.useState<boolean>(false);
  const [companionEdit, setCompanionEdit] = React.useState<boolean>(false);
  const [socialEdit, setSocialEdit] = React.useState<boolean>(false);
  const [atendeEdit, setAtendeEdit] = React.useState<boolean>(false);
  const [heightEdit, setHeightEdit] = React.useState<boolean>(false);
  const [descEdit, setDescEdit] = React.useState<boolean>(false);

  const [newName, setNewName] = React.useState<string>();
  const [newFeet, setNewFeet] = React.useState<string>();
  const [newAge, setNewAge] = React.useState<string>();
  const [newWeight, setNewWeight] = React.useState<string>();
  const [newCache, setNewCache] = React.useState<string>();
  const [newCity, setNewCity] = React.useState<string>();
  const [newCell, setNewCell] = React.useState<string>();
  const [newPay, setNewPay] = React.useState<string>();
  const [newSchedule, setNewSchedule] = React.useState<string>();
  const [newCompanion, setNewCompanion] = React.useState<string>();
  const [newSocial, setNewSocial] = React.useState<string>();
  const [newAtende, setNewAtende] = React.useState<string>();
  const [newHeight, setNewHeight] = React.useState<string>();
  const [newDesc, setNewDesc] = React.useState<string>();

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

  const getName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };
  const getFeet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeet(event.target.value);
  };
  const getAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAge(event.target.value);
  };
  const getWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(event.target.value);
  };
  const getCache = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCache(event.target.value);
  };
  const getCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(event.target.value);
  };
  const getCell = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCell(event.target.value);
  };
  const getPay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPay(event.target.value);
  };
  const getSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSchedule(event.target.value);
  };
  const getCompanion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompanion(event.target.value);
  };
  const getSocial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSocial(event.target.value);
  };
  const getAtende = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAtende(event.target.value);
  };
  const getHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHeight(event.target.value);
  };
  const getDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDesc(event.target.value);
  };

  const handleEditDestaque = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ destaque: !Profile[0]?.destaque })
        .eq("id", id);

      if (error) {
        console.error("Error updating ", error);
      } else {
        toast.success("alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 1000);
      }
    } catch (error) {}
  };

  const handleEditStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ destaque: !Profile[0]?.status })
        .eq("id", id);

      if (error) {
        console.error("Error updating ", error);
      } else {
        toast.success("status alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 1000);
      }
    } catch (error) {}
  };

  const handleEditName = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ nome: newName })
        .eq("id", id);
      if (error) {
        console.error("Error updating name ", error);
      } else {
        toast.success("Nome alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditFeet = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ pes: newFeet })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("tamanho dos pés alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };
  const handleEditAge = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ idade: newAge })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("idade alterada com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };
  const handleEditWeight = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ peso: newWeight })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("peso alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditCache = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ cache: newCache })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("cachê alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };
  const handleEditCity = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ bairro_cidade: newCity })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("cidade/bairro alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditCell = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ celular: newCell })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("celular alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditPay = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ pagamento: newPay })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("pagamento alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ agenda: newSchedule })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("pagamento alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditCompanion = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ acompanha: newCompanion })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("acompanha alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };
  const handleEditSocial = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ social_midia: newSocial })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("midia social alterada com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleEditAtende = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ atende_em: newAtende })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("atendimento alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };
  const handleEditHeight = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ altura: newHeight })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("altura alterado com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };
  const handleEditDesc = async () => {
    try {
      const { data, error } = await supabase
        .from("acompanhantes")
        .update({ desc: newDesc })
        .eq("id", id);
      if (error) {
        console.error("Error updating pes ", error);
      } else {
        toast.success("descrição alterada com sucesso !");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

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

  const handleDeleteAllPhotos = async () => {
    try {
      if (id !== undefined) {
        const { data, error } = await supabase.storage
          .from("photos")
          .remove([`${id}`]);

        if (error) {
          toast.error("Erro ao deletar perfil");
        } else {
          toast.info("Deletando photos...", { autoClose: 1500 });
          handleDeleteProfileDB();
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Erro ao buscar perfil !!! f(handleGetProfile)");
    }
  };

  const handleDeleteProfileDB = async () => {
    try {
      if (id !== undefined) {
        const { data, error } = await supabase
          .from("acompanhantes")
          .delete()
          .eq("id", id);

        if (error) {
          toast.error("Erro ao deletar perfil");
        } else {
          toast.info("Deletando informações...", { autoClose: 2000 });
          setTimeout(() => {
            toast.success("perfil deletado com sucesso !");
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Erro ao buscar perfil !!! f(handleGetProfile)");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setDom(document);
    setid(`${query.profile_id}`);
  });
  React.useEffect(() => {
    handleChangeBodyColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dom]);
  React.useEffect(() => {
    getUser();
    handleGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container mx-auto text-black">
      {user && (
        <>
          <Navbar />
          <div className="flex justify-center items-center my-5">
            <div className="bg-white shadow shadow-xl rounded-3xl w-full">
              <div className="flex justify-center md:justify-end w-full md:ml-5 -mt-5">
                <div
                  onClick={() => {
                    handleDeleteAllPhotos();
                  }}
                  className="bg-gradient-to-b from-red-700 to-red-500 py-4 px-14 rounded-3xl text-2xl font-semibold my-5 text-white cursor-pointer"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
              <form className="grid grid-cols-2 p-5 gap-4">
                <div id="01">
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      NOME
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getName}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.nome}
                        disabled={!nomeEdit}
                      />
                      <svg
                        onClick={() => {
                          setNomeEdit(!nomeEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {nomeEdit && (
                    <div
                      onClick={handleEditName}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      PÉS
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getFeet}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.pes}
                        disabled={!pesEdit}
                      />
                      <svg
                        onClick={() => {
                          setPesEdit(!pesEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {pesEdit && (
                    <div
                      onClick={handleEditFeet}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      IDADE
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getAge}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.idade}
                        disabled={!ageEdit}
                      />
                      <svg
                        onClick={() => {
                          setAgeEdit(!ageEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {ageEdit && (
                    <div
                      onClick={handleEditAge}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      PESO
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getWeight}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.peso}
                        disabled={!weightEdit}
                      />
                      <svg
                        onClick={() => {
                          setWeightEdit(!weightEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {weightEdit && (
                    <div
                      onClick={handleEditWeight}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    CACHE
                    <div className="flex justify-between">
                      <input
                        onChange={getCache}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.cache}
                        disabled={!cacheEdit}
                      />
                      <svg
                        onClick={() => {
                          setCacheEdit(!cacheEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {cacheEdit && (
                    <div
                      onClick={handleEditCache}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      CIDADE
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getCity}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.bairro_cidade}
                        disabled={!cityEdit}
                      />
                      <svg
                        onClick={() => {
                          setCityEdit(!cityEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {cityEdit && (
                    <div
                      onClick={handleEditCity}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      TELEFONE
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getCell}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.celular}
                        disabled={!cellEdit}
                      />
                      <svg
                        onClick={() => {
                          setCellEdit(!cellEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {cellEdit && (
                    <div
                      onClick={handleEditCell}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      PAGAMENTO
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getPay}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.pagamento}
                        disabled={!payEdit}
                      />
                      <svg
                        onClick={() => {
                          setPayEdit(!payEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {payEdit && (
                    <div
                      onClick={handleEditPay}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}
                </div>
                <div id="02">
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      AGENDA
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getSchedule}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.agenda}
                        disabled={!scheduleEdit}
                      />
                      <svg
                        onClick={() => {
                          setScheduleEdit(!scheduleEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {scheduleEdit && (
                    <div
                      onClick={handleEditSchedule}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      ACOMPANHA
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getCompanion}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.acompanha}
                        disabled={!companionEdit}
                      />
                      <svg
                        onClick={() => {
                          setCompanionEdit(!companionEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {companionEdit && (
                    <div
                      onClick={handleEditCompanion}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      REDE SOCIAL
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getSocial}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.social_midia}
                        disabled={!socialEdit}
                      />
                      <svg
                        onClick={() => {
                          setSocialEdit(!socialEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {socialEdit && (
                    <div
                      onClick={handleEditSocial}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    ATENDE
                    <div className="flex justify-between">
                      <input
                        onChange={getAtende}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.atende_em}
                        disabled={atendeEdit}
                      />
                      <svg
                        onClick={() => {
                          setAtendeEdit(!atendeEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {atendeEdit && (
                    <div
                      onClick={handleEditAtende}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}

                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      ALTURA
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getHeight}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        type="text"
                        placeholder={Profile[0]?.altura}
                        disabled={!heightEdit}
                      />
                      <svg
                        onClick={() => {
                          setHeightEdit(!heightEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {heightEdit && (
                    <div
                      onClick={handleEditHeight}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}
                  <div className="bg-[#D9D9D9] py-5 px-3 w-full rounded-xl my-3">
                    <label htmlFor="nome" className="text-sm">
                      DESCRIÇÃO
                    </label>
                    <div className="flex justify-between">
                      <input
                        onChange={getDesc}
                        className="bg-transparent placeholder:text-[#616161] w-full placeholder:font-semibold placeholder:text-xl focus:outline-none"
                        placeholder={Profile[0]?.desc}
                        disabled={!descEdit}
                      />
                      <svg
                        onClick={() => {
                          setDescEdit(!descEdit);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  {descEdit && (
                    <div
                      onClick={handleEditDesc}
                      className="flex justify-center items-center px-3 py-2 border border-green-500 rounded-3xl text-green-500 font-semibold cursor-pointer w-32"
                    >
                      Salvar
                    </div>
                  )}
                  <div className="cursor-pointer flex items-center my-3">
                    <input
                      type="checkbox"
                      onChange={handleEditDestaque}
                      className="w-10 h-10 rounded-3xl  cursor-pointer"
                      checked={Profile[0]?.destaque}
                    />

                    <span className="ml-3 text-sm font-medium text-gray-900 ">
                      GAROTA DESTAQUE
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer my-3">
                    <input
                      type="checkbox"
                      onChange={handleEditStatus}
                      className="w-10 h-10 rounded-3xl cursor-pointer"
                      checked={Profile[0]?.status}
                    />

                    <span className="ml-3 text-sm font-medium text-gray-900 ">
                      ATIVA ?
                    </span>
                  </div>
                  <div className="flex justify-end w-full">
                    <div
                      onClick={() => {
                        // window.open(`/profile/${id}`);
                        router.push(`/adm/edit-girl-photos/${id}`);
                      }}
                      className="bg-gradient-to-b from-[#FF004C] to-[#FF00D6] py-4 px-14 rounded-3xl text-2xl font-semibold my-5 text-white mt-10 cursor-pointer"
                    >
                      EDITAR FOTOS
                    </div>
                  </div>
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

export default EditGirlsInfo;
