"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'

// export default function LandingPage<T extends user_obj>({user}:{user:T}) {
 export default function LandingPage() {
  return (
    <>
     <div className="relative bg-gray-800 items-center justify-center w-full overflow-x-hidden overflow-y-hidden lg:pt-40 lg:pb-20 xl:pt-40 xl:pb-30">
        <div
            className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
            <div
                className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
                <h1 className="relative mb-4 text-3xl font-black leading-tight text-white sm:text-6xl xl:mb-8">
                    Hustlers</h1>
                <p  className="pr-0 mb-8 text-base text-white sm:text-lg xl:text-xl lg:pr-20">
                   Ready to start your
                   Career?</p>
                <Link 
                href={"/signup"}
                    className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-base 
                    font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl 
                    sm:mt-1 fold-bold lg:mx-0" >
                      Start 
                </Link>
        
                </div>
                <svg className="absolute left-0 max-w-md mt-24 -ml-64 left-svg" viewBox="0 0 423 423"
                    xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <linearGradient x1="100%" y1="0%" x2="4.48%" y2="0%" id="linearGradient-1">
                            <stop stop-color="#5C54DB" offset="0%" />
                            <stop stop-color="#6A82E7" offset="100%" />
                        </linearGradient>
                        <filter x="-9.3%" y="-6.7%" width="118.7%" height="118.7%" filterUnits="objectBoundingBox"
                            id="filter-3">
                            <feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1" />
                        </filter>
                        <rect id="path-2" x="63" y="504" width="300" height="300" rx="40" />
                    </defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity=".9">
                        <g id="Desktop-HD" transform="translate(-39 -531)">
                            <g id="Hero" transform="translate(43 83)">
                                <g id="Rectangle-6" transform="rotate(45 213 654)">
                                    <use fill="#000" filter="url(#filter-3)" xlinkHref="#path-2" />
                                    <use fill="url(#linearGradient-1)" xlinkHref="#path-2" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
        </div>

          
     </div>
     
     <div id="testimonials"
        className="flex items-center justify-center w-full px-8 py-5 border-t bg-gray-800 border-gray-200 md:py-10 lg:py-24 xl:py-20 xl:px-0">
        <div className="max-w-6xl mx-auto">
            <div className="flex-col items-center ">
                <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl pr-8 mx-auto text-center">
                    <p className="my-5 text-base text-white font-medium tracking-tight uppercase">Our customers love
                        our product
                    </p>
                    <h2
                        className="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
                        Testimonials</h2>
                    <p className="my-6 text-xl font-medium text-white">Our
                        extensive
                        list of case studies and customer testimonials.</p>

                </div>

                <div className="flex flex-col items-center justify-center max-w-2xl py-8 mx-auto xl:flex-row xl:max-w-full">
                    <div className="w-full xl:w-1/2 xl:pr-8">
                        <blockquote
                            className="bg-gray-600 flex bg-gray-600 flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 rounded-lg md:flex-row md:text-left hover:bg-gray-800 hover:shadow ease">
                            <div className="flex  flex-col pr-8">
                                <div className="relative pl-12">
                                    <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                        <path
                                            d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                    </svg>
                                    <p className="mt-2 text-base text-white">I am loving these templates! Very nice
                                        features and layouts.
                                    </p>
                                </div>

                                <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-white truncate">Sandra
                                    Walton <span className="mt-1 text-sm leading-5 text-white truncate">- CEO
                                        SomeCompany</span></h3>
                                <p className="mt-1 text-sm leading-5 text-white truncate"></p>
                            </div>
                            <img className="flex-shrink-0 object-cover w-24 h-24 mb-5
                             bg-gray-300 rounded-full md:mb-0"
                           
     src={"https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2694&q=80"}
                                alt="" />
                        </blockquote>
                        <blockquote
                            className="bg-gray-600 flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 mb-16 text-center transition-all duration-200  rounded-lg md:flex-row md:text-left hover:bg-gray-800 hover:shadow ease xl:mb-0">
                            <div className="flex flex-col pr-10">
                                <div className="relative pl-12">
                                    <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                        <path
                                            d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                    </svg>
                                    <p className="mt-2 text-base text-white">Really digging this service. Now I can
                                        quickly bootstrap any
                                        project.</p>
                                </div>
                                <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-white truncate">Kenny
                                    Jones <span className="mt-1 text-sm leading-5 text-white truncate">- CEO
                                        SomeCompany</span></h3>
                                <p className="mt-1 text-sm leading-5 text-white truncate"></p>
                            </div>
                            <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                src="https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                                alt="" />
                        </blockquote>
                    </div>
                    <div className="w-full xl:w-1/2 xl:pl-8">
                        <blockquote
                            className="bg-gray-600 flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200  rounded-lg md:flex-row md:text-left hover:bg-gray-800 hover:shadow ease">
                            <div className="flex flex-col pr-10">
                                <div className="relative pl-12">
                                    <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                        <path
                                            d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                    </svg>
                                    <p className="mt-2 text-base text-white">Extremely helpful in every single project we
                                        have released.
                                    </p>
                                </div>

                                <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-white truncate">Mike Smith
                                    <span className="mt-1 text-sm leading-5 text-white truncate">- CEO SomeCompany</span>
                                </h3>
                                <p className="mt-1 text-sm leading-5 text-white truncate"></p>
                            </div>
                            <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80"
                                alt="" />
                        </blockquote>
                        <blockquote
                            className="bg-gray-600 flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 text-center transition-all duration-200  rounded-lg md:flex-row md:text-left hover:bg-gray-800 hover:shadow ease">
                            <div className="flex flex-col pr-10">
                                <div className="relative pl-12">
                                    <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                        <path
                                            d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                    </svg>
                                    <p className="mt-2 text-base text-white">Finally a quick and easy system I can use
                                        for any type of
                                        project.</p>
                                </div>

                                <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-white truncate">Molly
                                    Sanchez <span className="mt-1 text-sm leading-5 text-white truncate">- CEO
                                        SomeCompany</span></h3>
                                <p className="mt-1 text-sm leading-5 text-white truncate"></p>
                            </div>
                            <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
                                alt="" />
                        </blockquote>
                    </div>
                </div>


            </div>
        </div>
    </div>


    <footer className="px-4 pt-12 pb-8 text-white bg-gray-800 border-t border-gray-200">
        <div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
            <div className="w-full pl-12 mr-4 text-left lg:w-1/4 sm:text-center sm:pl-0 lg:text-left">
                <a href="/"
                    className="flex justify-start  text-left sm:text-center lg:text-left sm:justify-center lg:justify-start">
                    <span className="flex items-start sm:items-center">
                        <svg className="w-auto h-6 text-white fill-current" viewBox="0 0 194 116"
                            xmlns="http://www.w3.org/2000/svg">
                            <g fill-rule="evenodd">
                                <path
                                    d="M96.869 0L30 116h104l-9.88-17.134H59.64l47.109-81.736zM0 116h19.831L77 17.135 67.088 0z">
                                </path>
                                <path d="M87 68.732l9.926 17.143 29.893-51.59L174.15 116H194L126.817 0z"></path>
                            </g>
                        </svg>
                    </span>
                </a>
                <p className="mt-6 mr-4 text-base text-white">Crafting the next-level of user experience and engagement.
                </p>
            </div>
            <div className="block w-full pl-10 mt-6 text-sm lg:w-3/4 sm:flex lg:mt-0">
                <ul className="flex flex-col w-full p-0 font-medium text-left text-white list-none">
                    <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-white uppercase md:mt-0">
                        Product</li>
                    <li><a href="#_"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Features</a>
                    </li>
                    <li><a href="#_"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Integrations</a>
                    </li>
                    <li><a href="#_"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Pricing</a>
                    </li>
                    <li><a href="#_"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">FAQ</a></li>
                </ul>
                <ul className="flex flex-col w-full p-0 font-medium text-left text-white list-none">
                    <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-white uppercase md:mt-0">
                        Company</li>
                    <li><a href="#_"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Privacy</a>
                    </li>
                    <li><a href="#_" className="inline-block px-3 py-2 text-white no-underline hover:text-white">Terms
                            of
                            Service</a></li>
                </ul>
                <ul className="flex flex-col w-full p-0 font-medium text-left text-white list-none">
                    <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-white uppercase md:mt-0">
                        TailwindCSS
                    </li>
                    <li><a href="https://devdojo.com/tailwindcss/components"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Tailwind
                            Components</a></li>
                    <li><a href="https://devdojo.com/tailwindcss/templates"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Tailwind
                            Templates</a></li>
                    <li><a href="https://devdojo.com/tails"
                            className="inline-block px-3 py-2 text-white no-underline hover:text-white">Tails</a></li>
                </ul>
                <div className="flex flex-col w-full text-white">
                    <div className="inline-block px-3 py-2 mt-5 font-bold text-white uppercase md:mt-0">Follow Us</div>
                    <div className="flex justify-start pl-4 mt-2">
                        <a className="flex items-center  mr-6 text-white no-underline hover:text-white"
                            target="_blank" rel="noopener noreferrer" href="https://devdojo.com">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                            </svg>
                        </a>
                        <a className="flex items-center  mr-6 text-white no-underline hover:text-white"
                            target="_blank" rel="noopener noreferrer" href="https://devdojo.com">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                            </svg>
                        </a>
                        <a className="flex items-center  text-white no-underline hover:text-white"
                            target="_blank" rel="noopener noreferrer" href="https://devdojo.com">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className=" pt-6 mt-10 text-center text-white border-t border-gray-100">© 2020 Landmark. All rights
            reserved.</div>

            <div className=" pt-4 mt-2 text-center text-white border-t border-gray-100">Distributed By <a href="https://themewagon.com/">Themewagon</a></div>
    </footer>
    </>
  )
}
