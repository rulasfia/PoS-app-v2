import React from "react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const LoginAlert: React.FC<{ status: boolean }> = ({ status }) => {
  return (
    <>
      <Alert status={status ? "success" : "error"} mt="4">
        <AlertIcon />
        <AlertDescription>
          {status ? "Anda berhasil masuk" : "Username atau password salah."}
        </AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    </>
  );
};

export default LoginAlert;
