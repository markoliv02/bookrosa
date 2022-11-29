// @flow
import React, { useEffect } from "react";
import supabase from "../utils/supabase";

const uploadImgs = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setname] = React.useState<string>();

  const getAllEscorts = async () => {
    let { data: acompanhantes, error } = await supabase
      .from("acompanhantes")
      .select("*");

    if (acompanhantes) {
      console.log(acompanhantes);
    }
  };

  const getName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setname(event.target.value);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage
      .from("photos")
      .upload(`${name}/` + `${name}001`, file as File);

    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllEscorts();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen container mx-auto px-2 text-black ">
      <div className="grid grid-cols-1 gap-4">
        <div className="flexw-full bg-gray-400 rounded-xl p-5">
          <input
            onChange={getName}
            className="bg-transparent w-full placeholder:text-gray-700 focus:outline-none"
            type="text"
            placeholder="nome da garota"
          />
        </div>

        <input
          type="file"
          onChange={handleUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
        />
      </div>
    </div>
  );
};

export default uploadImgs;
