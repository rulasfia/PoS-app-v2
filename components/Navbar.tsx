import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import {
  Flex,
  Spacer,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  const router = useRouter();

  const logoutHandler = () => {
    destroyCookie(null, "jwt");
    router.push("/");
  };

  return (
    <>
      <Flex px="8" py="4" align="center">
        <Heading mr="8" fontSize="2xl">
          TokoIni
        </Heading>

        {/* Home */}
        <NextLink href="/home">
          <Button variant="link" color="gray.900" p="2" mr="4">
            Home
          </Button>
        </NextLink>

        {/* Gudang Menu */}
        <NextLink href="/gudang">
          <Button variant="link" color="gray.900" p="2" mr="4">
            Gudang
          </Button>
        </NextLink>

        {/* Toko Menu */}
        <Menu>
          <MenuButton
            variant="link"
            color="gray.900"
            p="2"
            mr="4"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Toko
          </MenuButton>
          <MenuList>
            <NextLink href="/toko/riwayat">
              <MenuItem>Kasir</MenuItem>
            </NextLink>
            <NextLink href="/toko/kasir">
              <MenuItem>Riwayat</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>

        <Spacer />
        {/* Log Out */}
        <Button onClick={logoutHandler} variant="outline" colorScheme="red">
          Log Out
        </Button>
      </Flex>
    </>
  );
};

export default Navbar;
