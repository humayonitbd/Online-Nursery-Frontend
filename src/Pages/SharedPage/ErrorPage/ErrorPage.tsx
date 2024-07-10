// eslint-disable-next-line no-unused-vars

import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error:any = useRouteError();
 
  return (
    <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div>{/* <img className="w-28" src={errorImage} alt="" /> */}</div>
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-500">
            <span className="sr-only">Error</span>
            <div className="flex justify-center items-center h-full">
              4
              <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin mt-3 border-green-400"></div>
              4
            </div>
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            Sorry, we could not find this page.
          </p>
          <p>{error?.statusText || error?.message}</p>
          <Link to="/">
            <button className="btn bg-[#F01543] px-10">Back to home</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
