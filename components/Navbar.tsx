import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Flex, Spacer, Heading, Button, Link } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  const router = useRouter();

  const logoutHandler = () => {
    destroyCookie(null, "jwt");
    router.push("/");
  };

  return (
    <>
      <Flex mb="4" px="8" py="4" align="center">
        <Heading mr="8" fontSize="2xl">
          TokoIni
        </Heading>
        <NextLink href="/home">
          <Link mr="4">Home</Link>
        </NextLink>
        <NextLink href="/gudang">
          <Link mr="4">Gudang</Link>
        </NextLink>
        <NextLink href="/toko">
          <Link mr="4">Toko</Link>
        </NextLink>
        <Spacer />
        <Button onClick={logoutHandler} colorScheme="red">
          Log Out
        </Button>
      </Flex>
    </>
  );
};

export default Navbar;
