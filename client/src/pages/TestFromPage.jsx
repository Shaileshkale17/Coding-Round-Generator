import React, { useEffect, useState } from "react";
import SelectBox from "../components/SelectBox";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";

const TestFromPage = () => {
  const [TopicArray, setTopicArray] = useState([]);
  const [DifficultyArray, setDifficultyArray] = useState([]);
  const [TechnologyArray, setTechnologyArray] = useState([]);
  const [Topic, setTopic] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [Technology, setTechnology] = useState("");
  const [randomTask, setRandomTask] = useState(null);

  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const DifficultyAPI = async () => {
    try {
      const Difficulty = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/difficulty/full-data`
      );

      setDifficultyArray(Difficulty.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const TechnologyAPI = async () => {
    try {
      const Technology = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/technology/full-data`
      );

      setTechnologyArray(Technology.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const TopicAPI = async () => {
    try {
      const Technology = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/topic/full-data`
      );
      setTopicArray(Technology.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getRandomTasks = async (e) => {
    e.preventDefault();
    try {
      const Random = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/questions/randomOne`,
        {
          Technology: capitalizeFirstLetter(Technology),
          Difficulty: capitalizeFirstLetter(Difficulty),
          Topic: capitalizeFirstLetter(Topic),
        }
      );
      setRandomTask(Random.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    DifficultyAPI();
    TechnologyAPI();
    TopicAPI();
  }, [setDifficultyArray, setTechnologyArray, setTopicArray]);

  return (
    <div className="h-[83.9vh] flex flex-col items-center px-4 sm:px-8 md:pt-5">
      <form
        className="flex flex-col sm:flex-row gap-5 items-center justify-center flex-wrap w-full"
        onSubmit={getRandomTasks}>
        <SelectBox
          label="Topic"
          optionMap={TopicArray}
          setInput={setTopic}
          inputValue={Topic}
        />
        <SelectBox
          label="Difficulty"
          optionMap={DifficultyArray}
          setInput={setDifficulty}
          inputValue={Difficulty}
        />
        <SelectBox
          label="Technology"
          optionMap={TechnologyArray}
          setInput={setTechnology}
          inputValue={Technology}
        />
        <Button type="submit" label="Filter" style="px-5 py-2 mt-5" />
      </form>

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
            {randomTask ? (
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
                <td className="border border-gray-300 px-4 py-2" colSpan="6">
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
