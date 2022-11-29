// @flow
import { useRouter } from "next/router";
import * as React from "react";
import supabase from "../../utils/supabase";

const Profile = () => {
  const router = useRouter();

  const [url, seturl] = React.useState<string>();
  const [Profile, setProfile] = React.useState<Array<any>>([]);

  const getProfile = async () => {
    let { data: acompanhantes, error } = await supabase
      .from("acompanhantes")
      .select("*")

      // Filters
      .eq("id", router.query.profile_id);
  };

  const getImage = async (name: string) => {
    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(`${name}/${name}001`);

    if (data) {
      // console.log(data);
      seturl(data?.publicUrl);
    }
  };

  return (
    <div className="container mx-auto px-2 text-black ">
      <div className="grid grid-cols-3" id="resume">
        <div id="profile img">asasd</div>
        <div className="col-span-2">
          <h1>nopme</h1>
          <h3>telefone</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
