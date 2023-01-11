// @flow
import Image from "next/image";
import * as React from "react";

import logo from "../../assets/logoPreta.png";

import whatsappIcon from "../../assets/whatsapp.svg";

let docInit: Document;

const Contato = () => {
  const [Dom, setDom] = React.useState<Document>(docInit);

  const changeBodyColor = () => {
    try {
      console.log(Dom !== undefined);

      if (Dom !== undefined) {
        const bd = Dom.querySelector("body");

        if (bd !== null) {
          bd.style.backgroundColor = "black";
          bd.style.backgroundImage = "none";
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
    changeBodyColor();
    setDom(document);
  }, []);

  React.useEffect(() => {
    changeBodyColor();
  }, [Dom]);

  return (
    <div className="p-7">
      <div className="bg-white rounded-2xl text-black p-5">
        <div className="flex justify-end  rounded-full mb-3">
          <svg
            onClick={() => document.location.replace("/")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 bg-white rounded-full cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center  mt-3">
          <Image src={logo} alt="" width={200} height={200} />
        </div>

        <h1 className="text-2xl font-semibold text-center mt-5">
          Anuncie agora mesmo com A Casa Branca São Paulo{" "}
        </h1>

        <p className="text-center mt-3">
          A maior e mais completa rede de acompanhantes de São Paulo. A Casa
          Branca possui uma rede de clientes via Telegram - Twitter - Site.
          Entre em contato e escolha seu pacote de divulgação.
        </p>

        {/* wpp */}

        <h1 className="text-2xl font-semibold text-center mt-5">Whatsapp</h1>

        <p className="text-center mt-3 text-2xl">(11)95398-6786</p>

        {/* botao wpp */}

        <div className="w-full flex justify-center">
          <a
            href="https://wa.me/5511953986786?text=Ol%C3%A1%2C+gostaria+de+divulgar+com+a+Base+Rosa"
            className="text-white flex justify-center items-center bg-[#64B161] rounded-full p-5 w-40 my-5 cursor-pointer"
          >
            <Image
              quality={50}
              src={
                whatsappIcon
                  ? whatsappIcon
                  : "https://viudhkddfyymxinmimyo.supabase.co/storage/v1/object/public/photos/default"
              }
              alt=""
              className="z-10 rounded-full"
            />
            CONVERSAR
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contato;
