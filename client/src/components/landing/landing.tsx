import React, {Fragment} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {MenuIcon, XIcon,
  ChevronDoubleRightIcon} from '@heroicons/react/outline';
import Table from './assets/table.svg';
import '../landing/landing.css';

function Landing() {
  return (
    <div>
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8
          sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <Popover>
              {({open}) => (
                <>
                  <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                    <nav
                      className="relative flex items-center
                      justify-between sm:h-10 lg:justify-start"
                      aria-label="Global"
                    >
                      <div className="flex items-center flex-grow
                      flex-shrink-0 lg:flex-grow-0">
                        <div className="flex items-center justify-between
                        w-full md:w-auto">
                          <a href="#" className="font-bold text-6xl">
                              DiceStarter
                          </a>
                          <div className="-mr-2 flex items-center md:hidden">
                            <Popover.Button className="bg-white rounded-md
                            p-2 inline-flex items-center justify-center
                            text-gray-400 hover:text-gray-500 hover:bg-gray-100
                            focus:outline-none focus:ring-2 focus:ring-inset
                            focus:ring-indigo-500">
                              <span className="sr-only">Open main menu</span>
                              <MenuIcon className="h-6 w-6"
                                aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>

                  <Transition
                    show={open}
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      static
                      className="absolute top-0 inset-x-0 p-2 transition
                      transform origin-top-right md:hidden"
                    >
                      <div className="rounded-lg shadow-md bg-white ring-1
                      ring-black ring-opacity-5 overflow-hidden">
                        <div className="px-5 pt-4 flex items-center
                        justify-between">
                          <div>Kickstart your dice!</div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md
                            p-2 inline-flex items-center justify-center
                            text-gray-400 hover:text-gray-500 hover:bg-gray-100
                            focus:outline-none focus:ring-2 focus:ring-inset
                            focus:ring-indigo-500">
                              <span className="sr-only">Close main menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="block w-full px-5 py-3 text-center
                          font-medium text-indigo-600 bg-gray-50
                          hover:bg-gray-100"
                        >
                          Log in aaaaaaaa
                        </a>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12
            sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold
                text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    BRINGING YOU</span>{' '}
                  <span className="block text-blue-500
                  xl:inline">CLOSER TO THE TABLE</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5
                sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We help you find your game. You help us kickstart a
                  boardgamer&apos;s dream!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center
                lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="home?page=1"
                      className="w-full flex items-center justify-center
                      px-8 py-3 border border-transparent text-base font-medium
                      rounded-md text-white bg-blue-600 hover:bg-blue-700
                      md:py-4 md:text-lg md:px-10"
                    >
                      FIND YOUR GAME
                      <div className="font-extrabold text-black rounded-full
                    bg-white flex items-center justify-center
                    md:px-1 md:ml-5"
                      style={{height: '30px', width: '30px'}}>
                        <ChevronDoubleRightIcon/>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 bg-white lg:right-0 lg:w-1/2">
          <img
            className="h- w-full object-cover sm:h-72 md:h-96
            lg:w-full lg:h-full"
            src={Table}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-row w-screen">
        <div className="relative bg-black text-white
        md:px-10 md:py-10 text-3xl border border-red-700
        w-2/6">
          Meet our team
        </div>
        <div className="relative bg-black text-white
        md:px-10 flex-grow md:py-10 text-4xl border border-red-700">
          Meet our team
        </div>
      </div>
      <div className="relative text-red-600 bg-blue-600 rounded
      md:text-lg md:px-10 md:mx-2 md:my-2 border">
        FOOTER
      </div>
    </div>
  );
};
export default Landing;
