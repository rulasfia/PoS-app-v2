import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import LoginAlert from "../components/LoginAlert";
import {
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
} from "@chakra-ui/react";
import { route } from "../utils/route";

interface formType {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { handleSubmit, errors, register, formState } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [alert, setAlert] = useState(false);

  const loginMutation = useMutation((loginInfo: formType) =>
    axios.post("/api/auth", loginInfo)
  );

  const onSubmit = (formData: formType) => {
    setIsLoading(true);
    setAlert(false);

    loginMutation.mutate(formData, {
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
        setAuth(false);
        setAlert(true);
      },
      onSuccess: (data) => {
        console.log(data.data);

        setCookie(null, "jwt", data.data.token, {
          maxAge: 10 * 60 * 60,
          path: "/",
          sameSite: true,
        });
        router.push("/home");
        setIsLoading(false);
        setAuth(true);
        setAlert(true);
      },
    });
  };

  return (
    <>
      <Flex maxW="md" minH="100vh" justify="center" align="center" mx="auto">
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Box
            p="8"
            mx="2"
            border="1px"
            borderColor="gray.300"
            color="gray.800"
            rounded="lg"
          >
            <Heading mb="8" textAlign="center" fontSize="4xl">
              Login Page
            </Heading>
            <FormControl colorScheme="twitter" id="username" mb="4" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                ref={register({ required: true })}
              />
              <FormErrorMessage>
                {errors.username && "Username is required"}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password" mb="4" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                ref={register({ required: true })}
              />
              <FormErrorMessage>
                {errors.username && "Password is required"}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isLoading}
              loadingText="Loging in"
              w="full"
              mt="2"
              colorScheme="twitter"
              type="submit"
            >
              Log in
            </Button>

            {alert && <LoginAlert status={auth} />}
          </Box>
        </form>
      </Flex>
    </>
  );
}

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
