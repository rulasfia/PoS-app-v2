import React from "react";
import { GetServerSideProps } from "next";
import { route } from "../../utils/route";

function Riwayat() {
  return (
    <div>
      <h1>Welcome to toko riwayat</h1>
    </div>
  );
}

export default Riwayat;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = route(context);
  if (result !== "") {
    context.res.statusCode = 302;
    context.res.setHeader("Location", result);
    return {
      props: {},
    };
  }
  return {
    props: { result },
  };
};
