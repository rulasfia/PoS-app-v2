import nookies from "nookies";

export const route = (context) => {
  let result: string = "";
  const url = context.resolvedUrl;
  const cookies = nookies.get(context).jwt;

  if (cookies && url === "/") {
    result = "home";
  } else if (!cookies && url !== "/") {
    result = "/";
  }

  return result;
};
