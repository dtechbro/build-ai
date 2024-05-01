"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="w-full  md:w-5/6 mx-auto ">
        <header className=" flex justify-between items-center md:justify-between md:items-center pr-5 md:pr-20 pl-5 md:pl-20 pt-6 pb-6">
          <div className="md:w-28 h-5 md:h-full">
            <Image
              src={"/logo.png"}
              width={1000}
              height={1000}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex space-x-3 ">
            <Link
              href={"/login"}
              className="border border-primarycolor p-2 md:p-4 rounded-lg text-primarycolor"
            >
              Login
            </Link>
            <Link
              href={"/signup"}
              className="border border-black p-2 md:p-4 rounded-lg bg-black text-white"
            >
              Get Started
            </Link>
          </div>
        </header>
        <div className=" flex flex-col gap-4 w-full md:w-4/6 md:p-10 p-4 mx-auto ">
          <div className="flex flex-col gap-4 ">
            <h1 className=" text-center text-gray-800 md:text-7xl text-3xl ">
              Discovering Tastes Together: Your Friendly{" "}
              <span className="text-primarycolor">Food Journey</span> Companion
            </h1>
            <p className="text-xs md:text-base text-center pr-5 pl-5  text-gray-400">
              Explore a world of allergy-friendly dining options with our food
              companion app. Discover safe and delicious meals tailored to your
              dietary needs, ensuring every bite is a delightful experience.
            </p>
          </div>
          <div className="flex flex-wrap md:gap-6 gap-2  justify-center">
            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Allergy Awareness
              </p>
            </div>
            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Discover New Options
              </p>
            </div>

            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Personalized Recommendations
              </p>
            </div>
            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Ingredients Substitutions
              </p>
            </div>
            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Nutritional Assessments
              </p>
            </div>
            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Recipe Suggestions
              </p>
            </div>
            <div className="md:p-4 p-3 border border-primarycolor rounded-lg">
              <p className="text-primarycolor md:text-md text-xs ">
                Health Condition analysic
              </p>
            </div>
          </div>
          <div>
            <div className="grid gap-4 md:grid-cols-2 p-4 md:p-8">
              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="md:w-2/4 w-full h-[100px] md:h-full">
                  <Image
                    src={"/1.png"}
                    width={1000}
                    height={1000}
                    alt="Food"
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="md:w-2/4 text-sm ">
                  Eat a Variety of Foods: Include a diverse range of foods in
                  your diet to ensure you get a wide spectrum of nutrients. Aim
                  for a balanced intake of fruits, vegetables, whole grains,
                  lean proteins, and healthy fats.
                </p>
              </div>{" "}
              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="md:w-2/4 w-full h-[100px] md:h-full">
                  <Image
                    src={"/2.png"}
                    width={1000}
                    height={1000}
                    alt="Food"
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="md:w-2/4 text-sm ">
                  Stay Hydrated: Drink plenty of water throughout the day. Water
                  is essential for digestion, nutrient absorption, and overall
                  health. Limit sugary drinks and opt for water, herbal tea, or
                  infused water instead.
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
