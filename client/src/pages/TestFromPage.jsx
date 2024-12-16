import React, { useEffect, useState } from "react";
import SelectBox from "../components/SelectBox";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";

const TestFromPage = () => {
  const [topicArray, setTopicArray] = useState([]);
  const [difficultyArray, setDifficultyArray] = useState([]);
  const [technologyArray, setTechnologyArray] = useState([]);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [technology, setTechnology] = useState("");
  const [randomTask, setRandomTask] = useState(null);
  const [loadingTask, setLoadingTask] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Helper function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Reusable API fetcher
  const fetchData = async (endpoint, setState) => {
    try {
      setLoadingOptions(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`
      );
      setState(response.data.data);
    } catch (error) {
      toast.error(`Failed to fetch ${endpoint}: ${error.message}`);
    } finally {
      setLoadingOptions(false);
    }
  };

  // Fetch random task based on selected filters
  const getRandomTasks = async (e) => {
    e.preventDefault();
    if (!technology || !difficulty || !topic) {
      toast.error("Please select all filters.");
      return;
    }

    setLoadingTask(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/questions/randomOne`,
        {
          Technology: capitalizeFirstLetter(technology),
          Difficulty: capitalizeFirstLetter(difficulty),
          Topic: capitalizeFirstLetter(topic),
        }
      );
      setRandomTask(response.data.data);
    } catch (error) {
      toast.error(`Failed to fetch task: ${error.response.data.message}`);
    } finally {
      setLoadingTask(false);
    }
  };

  // Fetch dropdown options on component mount
  useEffect(() => {
    fetchData("difficulty/full-data", setDifficultyArray);
    fetchData("technology/full-data", setTechnologyArray);
    fetchData("topic/full-data", setTopicArray);
  }, []);

  return (
    <div className="h-[83.9vh] flex flex-col items-center px-4 sm:px-8 md:pt-5">
      {/* Form for filters */}
      <form
        className="flex flex-col sm:flex-row gap-5 items-center justify-center flex-wrap w-full"
        onSubmit={getRandomTasks}>
        <SelectBox
          label="Topic"
          optionMap={topicArray}
          setInput={setTopic}
          inputValue={topic}
        />
        <SelectBox
          label="Difficulty"
          optionMap={difficultyArray}
          setInput={setDifficulty}
          inputValue={difficulty}
        />
        <SelectBox
          label="Technology"
          optionMap={technologyArray}
          setInput={setTechnology}
          inputValue={technology}
        />
        <Button
          type="submit"
          label="Filter"
          style="px-5 py-2 mt-5"
          disabled={!topic || !difficulty || !technology || loadingOptions}
        />
      </form>

      {/* Display the random task in a table */}
      <div className="overflow-x-auto w-full mt-10">
        <table className="border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Technology</th>
              <th className="border border-gray-300 px-4 py-2">Difficulty</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Tags</th>
              <th className="border border-gray-300 px-4 py-2">
                Completion Time
              </th>
            </tr>
          </thead>
          <tbody>
            {loadingTask ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading task...
                </td>
              </tr>
            ) : randomTask ? (
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {randomTask.label}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {randomTask.technology}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {randomTask.difficulty}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {randomTask.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {randomTask.tags.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {randomTask.completion_time}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestFromPage;
