import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { route } from "../utils/route";

function Home({ result }) {
  console.log(`redirect to ${result}`);

  return (
    <div>
      <h1>Welcome to home</h1>
    </div>
  );
}

export default Home;

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
