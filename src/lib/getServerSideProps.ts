/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getServerSideProps(context: any) {
  const fullUrl = context.req.headers["x-url"] || "";
  const pathname = fullUrl ? new URL(fullUrl).pathname : "/";

  return {
    props: {
      pathname,
    },
  };
}
