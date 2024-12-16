import React, { useEffect, useState } from "react";
import SelectBox from "../components/SelectBox";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import IndexBox from "../components/IndexBox";
import Textarea from "../components/Textarea";

const Add_Question = () => {
  const [TopicArray, setTopicArray] = useState([]);
  const [DifficultyArray, setDifficultyArray] = useState([]);
  const [TechnologyArray, setTechnologyArray] = useState([]);
  const [Topic, setTopic] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [Technology, setTechnology] = useState("");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [Tags, setTags] = useState("");
  const [Completion_Time, setCompletion_Time] = useState("");

  // Fetch data for dropdowns on component mount
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
  useEffect(() => {
    DifficultyAPI();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    console.log(
      "label",
      label,
      "value",
      value,
      "Technology",
      Technology,
      "Difficulty",
      Difficulty,
      "description",
      description,
      "Completion_Time",
      Completion_Time
    );
    if (
      !label ||
      !value ||
      !Technology ||
      !Difficulty ||
      !description ||
      !Completion_Time
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/questions/create`,
        {
          label,
          value,
          technology: Technology,
          difficulty: Difficulty,
          description,
          tags: Tags.split(",").map((tag) => tag.trim()), // Split and trim tags
          completion_time: Completion_Time,
        }
      );
      toast.success("Question added successfully!");
      // Clear form on success
      setLabel("");
      setValue("");
      setTechnology("");
      setDifficulty("");
      setDescription("");
      setTags("");
      setCompletion_Time("");
    } catch (error) {
      toast.error("Error adding question. Please try again.");
    }
  };

  return (
    <div className="md:h-[83.9vh] h-full md:my-0 my-4 flex flex-col items-center px-4 sm:px-8 md:pt-5">
      <form
        className="flex flex-col sm:flex-col gap-5 items-center justify-center flex-wrap w-full "
        onSubmit={handleSubmit}>
        <div className="flex flex-row flex-wrap lg:w-[75%] xl:w-[52%] md:w-full md:justify-between justify-center">
          <IndexBox
            label="Label"
            placeholder="Enter label"
            name="Label"
            id="Label"
            type="text"
            value={label}
            setInput={setLabel}
          />
          <IndexBox
            label="Value"
            placeholder="Enter value"
            name="value"
            id="value"
            type="text"
            value={value}
            setInput={setValue}
          />
        </div>
        <div className="flex flex-row flex-wrap lg:w-[75%] xl:w-[52%] md:w-full md:justify-between justify-center">
          {/* Technology Field */}
          <IndexBox
            label="Technology"
            placeholder="Enter Technology"
            name="Technology"
            id="Technology"
            type="text"
            value={Technology}
            setInput={setTechnology}
          />

          {/* Difficulty Field */}
          <SelectBox
            label="Difficulty"
            optionMap={DifficultyArray}
            setInput={setDifficulty}
            inputValue={Difficulty}
          />
        </div>
        <div className="flex flex-row flex-wrap lg:w-[75%] xl:w-[52%] md:w-full  md:justify-between justify-center">
          <IndexBox
            label="Tags"
            placeholder="Enter tags separated by commas"
            name="Tags"
            id="Tags"
            type="text"
            value={Tags}
            setInput={setTags}
          />
          <IndexBox
            label="Completion Time"
            placeholder="Enter completion time (e.g., 2 hours)"
            name="Completion_Time"
            id="Completion_Time"
            type="text"
            value={Completion_Time}
            setInput={setCompletion_Time}
          />
        </div>

        <Textarea
          label="Description"
          placeholder="Enter a description"
          name="Description"
          id="Description"
          type="text"
          value={description}
          setInput={setDescription}
          cols="5"
          rows="10"
        />

        {/* Submit Button */}
        <Button type="submit" label="Submit" style="px-5 py-2 mt-5" />
      </form>
    </div>
  );
};

export default Add_Question;
