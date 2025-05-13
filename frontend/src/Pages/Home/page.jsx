import React from "react";

const Page = () => {
  return (
    <>
      <header>
        <nav className="bg-white border-neutral-200 px-4 py-4 lg:px-6">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a
              className="logo-container flex items-center text-red-500"
              href="/"
            >
              <div className="mr-3">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 80 80"
                  strokeWidth="1"
                  stroke="currentColor"
                  fill="currentColor"
                  xmlSpace="preserve"
                >
                  <path d="M40.02,72.19c-17.83,0-32.32-14.58-32.32-32.54,0-8.25,3.07-15.82,8.13-21.56l.89,.14c.07,.03,.14,.03,.2,.03s.17,.03,.31,.03c.14,.03,.31,.03,.48,.07,.17,.03,4,.65,7.86,2.3-.99,3.1-2.53,8.8-3.04,15.65l-.07,.72,.51,.62c1.06,1.24,6.7,7.6,14.52,11.69l.55,.24,3.25-1.1c1.3-.45,3.01-1.03,4.82-1.65l.72-.28c2.46-.93,5.47-2.03,7.62-3.06l.24,.31c.79,1.07,1.81,2.37,2.8,3.78,.85,1.13,2.05,2.82,3.04,4.3,.51,.72,2.15,3.47,2.15,3.47l.27,.45s2.66-.28,5.88-1.89l.03,.03,.14-.1c-5.23,10.9-16.26,18.33-28.97,18.33ZM44.43,7.43c-.51,.93-1.16,2.24-1.54,3.03l-.34,.72c-.27,.58-.51,1.1-.68,1.51-5.91,1.1-11.21,3.54-14.04,5.02-2.6-1.17-5.98-2.24-8.71-2.82,5.64-4.85,12.95-7.77,20.91-7.77,1.5,0,2.97,.1,4.41,.31Zm11.21,18.23c-.34,5.74-.79,10.21-1.3,13.03-.03,.31-.1,.72-.24,1.1-1.57,.83-4.85,2.2-9.12,3.75-2.7,1-5.26,1.86-6.46,2.27-3.25-1.82-6.25-4.06-9.02-6.6-1.13-1.03-1.98-1.93-2.8-2.79l-.48-.48c.31-3.54,.92-7.22,1.88-10.94,.44-1.72,.75-2.68,.99-3.3,.07-.24,.17-.41,.2-.58,.17-.1,.38-.21,.58-.31h.03c2.49-1.27,7.48-3.54,12.95-4.51,.79,.28,4.95,2.27,12.78,9.35Zm10.52-5.12c-3.14,.62-6.49,1.75-8.16,2.37-6.01-5.4-10.25-8.15-12.5-9.42,.2-.45,.44-.96,.65-1.48,.68-1.48,1.5-3.2,1.91-3.89,.34,.07,.65,.17,.99,.28,.38,.1,.79,.24,1.23,.38,6.42,2.2,11.96,6.36,15.89,11.76Zm4.99,27.86c-.31,.24-.72,.58-1.3,1-1.67,1.2-3.31,1.89-4.68,2.37-.14,.07-.31,.1-.44,.17-.38-.62-.75-1.27-1.23-1.93-1.88-2.82-4.75-6.64-6.22-8.6,.75-1.99,1.4-6.95,1.91-15.13,3.01-1.07,6.22-1.65,8.95-2.37,.03,0,.07-.03,.1-.03,2.56,4.68,4.07,10.04,4.07,15.75,.03,3.06-.38,5.98-1.16,8.77ZM40.02,2.3C19.56,2.3,2.92,19.05,2.92,39.65s16.64,37.35,37.1,37.35,37.1-16.75,37.1-37.35S60.49,2.3,40.02,2.3Z" />
                </svg>
              </div>
              <span className="self-center text-2xl text-black font-black whitespace-nowrap">
                Footy Addicts
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4 sm:flex"
                href="/users/sign_up"
              >
                Register
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 py-2 px-4 ml-2 sm:flex"
                href="/users/sign_in"
              >
                Sign in
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="bg-home-hero text-secondary">
          <div className="wrapper">
            <div className="w-full pt-48 md:w-2/3">
              <h1 className="text-7xl font-bold">Play Football</h1>
              <h2 className="font-quinsy mb-4">whenever You Want</h2>
              <div className="rounded-xl p-6 bg-secondary text-black">
                <h3 className="text-4xl font-bold">Find a game near you</h3>
                <form
                  className="form flex items-center my-6"
                  action="/football-games"
                  acceptCharset="UTF-8"
                  method="get"
                >
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-500">
                        <path
                          clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="bg-white border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City, postcode or area"
                    />
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ml-2">
                    <span>Search</span>
                    <span className="hidden ml-1 md:inline-block">
                      for games
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
