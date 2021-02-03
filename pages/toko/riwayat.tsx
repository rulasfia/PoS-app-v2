import React from "react";
import { GetServerSideProps } from "next";
import { route } from "../../utils/route";
import axios from "axios";
import { useQuery } from "react-query";

const URL = process.env.URL || "http://localhost:3000";

function Riwayat({ riwayatData }) {
  const { data } = useQuery("gudangData", getRiwayatData, {
    initialData: riwayatData,
  });
  console.log(data);

  return (
    <div>
      <h1>Welcome to toko riwayat</h1>
    </div>
  );
}

export default Riwayat;

const getRiwayatData = async () => {
  try {
    const { data } = await axios.get(`${URL}/api/toko/riwayat`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = route(context);
  if (result !== "") {
    context.res.statusCode = 302;
    context.res.setHeader("Location", result);
    return {
      props: {},
    };
  }

  const riwayatData = await getRiwayatData();

  return {
    props: { riwayatData },
  };
};
