import React from "react";
import { GetServerSideProps } from "next";
import { route } from "../utils/route";

function Toko() {
  return (
    <div>
      <h1>Welcome to toko</h1>
    </div>
  );
}

export default Toko;

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
