"use client";
import Image from "next/image";
import { useState } from "react";

function Onboarding() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [allergies, setAllergies] = useState([
    { id: 1, name: "Pea Nuts" },
    { id: 2, name: "Tree Nuts" },
    { id: 3, name: "Milk" },
    { id: 4, name: "Eggs" },
    { id: 5, name: "Wheat" },
    { id: 6, name: "Soy" },
    { id: 5, name: "Fish and Shellfish" },
    { id: 5, name: "Sesame" },
  ]);
  const [newAllergyName, setNewAllergyName] = useState("");

  const toggleAllergySelection = (allergyId) => {
    if (selectedAllergies.includes(allergyId)) {
      setSelectedAllergies(selectedAllergies.filter((id) => id !== allergyId));
    } else {
      setSelectedAllergies([...selectedAllergies, allergyId]);
    }
  };

  const handleAddAllergy = () => {
    if (newAllergyName.trim() !== "") {
      const newAllergy = {
        id: allergies.length + 1,
        name: newAllergyName.trim(),
      };

      setAllergies([...allergies, newAllergy]);
      setNewAllergyName(""); // Clear the input after adding
    }
  };

  return (
    <>
      <section className="w-full md:w-3/6 h-screen mx-auto my-auto flex flex-col gap-4 justify-center items-center">
        <div className="w-[100px] ">
          <Image
            src={"/logo.png"}
            width={1000}
            height={1000}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-xl md:text-5xl font-bold text-primarycolor">
            Welcome Onboard
          </h1>
          <p className="text-[11px] md:text-base text-gray-400">
            What are your allergies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:w-3/5">
          {allergies?.map((allergy) => (
            <div
              key={allergy.id}
              className={`cursor-pointer p-4 rounded-lg bg-gray-50 ${
                selectedAllergies.includes(allergy.id)
                  ? "border border-primarycolor"
                  : ""
              }`}
              onClick={() => toggleAllergySelection(allergy.id)}
            >
              <p className="text-gray-400">{allergy.name}</p>
            </div>
          ))}
          <input
            type="text"
            placeholder="Add"
            value={newAllergyName}
            onChange={(e) => setNewAllergyName(e.target.value)}
            className="p-4 rounded-lg bg-gray-50 outline-primarycolor w-2/5 text-gray-400"
          />

          {newAllergyName.length > 0 && (
            <button
              onClick={handleAddAllergy}
              className="border border-primarycolor p-4 rounded-lg text-primarycolor"
            >
              Add
            </button>
          )}

          <button className="bg-primarycolor py-3 px-[200px] rounded text-white">
            Continue
          </button>
        </div>
      </section>
    </>
  );
}

export default Onboarding;
