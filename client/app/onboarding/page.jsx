"use client";
import Image from "next/image";
import { useState } from "react";

function Onboarding() {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [issues, setIssues] = useState([
    { id: 1, name: "Diabetes" },
    { id: 2, name: "Hypertension" },
    { id: 3, name: "Weight Management" },
    { id: 4, name: "Heart Health" },
    { id: 5, name: "Food Sensitivities and Intolerances" },
  ]);
  const [newIssueName, setNewIssueName] = useState("");

  const toggleIssueSelection = (issueId) => {
    if (selectedIssues.includes(issueId)) {
      // If issueId is already selected, remove it
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId));
    } else {
      // Otherwise, add issueId to selectedIssues
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  const handleAddIssue = () => {
    if (newIssueName.trim() !== "") {
      const newIssue = {
        id: issues.length + 1,
        name: newIssueName.trim(),
      };

      setIssues([...issues, newIssue]);
      setNewIssueName(""); // Clear the input after adding
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
            Aleeyah would love to know your health issues
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:w-3/5">
          {issues?.map((issue) => (
            <div
              key={issue.id}
              className={`cursor-pointer p-4 rounded-lg bg-gray-50 ${
                selectedIssues.includes(issue.id)
                  ? "border border-primarycolor"
                  : ""
              }`}
              onClick={() => toggleIssueSelection(issue.id)}
            >
              <p className="text-gray-400">{issue.name}</p>
            </div>
          ))}
          <input
            type="text"
            placeholder="Add"
            value={newIssueName}
            onChange={(e) => setNewIssueName(e.target.value)}
            className="p-4 rounded-lg bg-gray-50 outline-primarycolor w-2/5 text-gray-400"
          />

          {newIssueName.length > 0 && (
            <button
              onClick={handleAddIssue}
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
