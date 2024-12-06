import React, { useEffect, useState } from "react";
import SelectBox from "../components/SelectBox";
import Button from "../components/Button";

const TestFromPage = () => {
  const [TopicArray, setTopicArray] = useState([]);
  const [DifficultyArray, setDifficultyArray] = useState([]);
  const [TechnologyArray, setTechnologyArray] = useState([]);
  const [Topic, setTopic] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [Technology, setTechnology] = useState("");
  const [randomTask, setRandomTask] = useState(null);

  const tasks = [
    {
      label: "Palindrome Check",
      value: "palindrome_check",
      technology: "Python",
      difficulty: "Easy",
      description:
        "Write a Python function to check if a given string is a palindrome.",
      tags: ["strings", "algorithms"],
      completion_time: "15 minutes",
    },
    {
      label: "Todo App API",
      value: "todo_app_api",
      technology: "Node.js",
      difficulty: "Medium",
      description:
        "Build a REST API for a Todo application that supports CRUD operations.",
      tags: ["API", "Node.js", "CRUD"],
      completion_time: "45 minutes",
    },
    {
      label: "React Counter Component",
      value: "react_counter_component",
      technology: "React.js",
      difficulty: "Easy",
      description:
        "Create a React component for a counter that increments, decrements, and resets its value.",
      tags: ["React.js", "components", "state"],
      completion_time: "30 minutes",
    },
    {
      label: "Java Spring Boot REST API",
      value: "spring_boot_rest_api",
      technology: "Spring Boot",
      difficulty: "Medium",
      description:
        "Build a REST API using Java Spring Boot that supports user authentication and CRUD operations.",
      tags: ["Java", "Spring Boot", "API", "Authentication"],
      completion_time: "60 minutes",
    },
    {
      label: "MERN Stack Blog App",
      value: "mern_blog_app",
      technology: "MERN Stack",
      difficulty: "Hard",
      description:
        "Develop a full-stack blog application using MongoDB, Express.js, React.js, and Node.js.",
      tags: ["MERN Stack", "full-stack", "CRUD", "React", "Node"],
      completion_time: "120 minutes",
    },
    {
      label: "Java Full Stack E-commerce App",
      value: "java_full_stack_ecommerce",
      technology: "Java Full Stack",
      difficulty: "Hard",
      description:
        "Develop an e-commerce web application using Java, Spring Boot, and React.js.",
      tags: ["Java", "Spring Boot", "React.js", "full-stack", "e-commerce"],
      completion_time: "180 minutes",
    },
    {
      label: "Python Data Analysis",
      value: "python_data_analysis",
      technology: "Python",
      difficulty: "Medium",
      description:
        "Write a Python script to perform data analysis on a given dataset and generate a report.",
      tags: ["Python", "data analysis", "pandas"],
      completion_time: "45 minutes",
    },
    {
      label: "JavaScript Calculator",
      value: "javascript_calculator",
      technology: "JavaScript",
      difficulty: "Easy",
      description:
        "Create a simple calculator using JavaScript that performs basic arithmetic operations.",
      tags: ["JavaScript", "UI", "DOM manipulation"],
      completion_time: "20 minutes",
    },
  ];

  const Technology_Array = [
    { id: 1, value: "python", label: "Python", add_date: "2024-12-06" },
    { id: 2, value: "javascript", label: "JavaScript", add_date: "2024-12-06" },
    { id: 3, value: "nodejs", label: "Node.js", add_date: "2024-12-06" },
    { id: 4, value: "reactjs", label: "React.js", add_date: "2024-12-06" },
    { id: 5, value: "mern_stack", label: "MERN Stack", add_date: "2024-12-06" },
    { id: 6, value: "java", label: "Java", add_date: "2024-12-06" },
    {
      id: 7,
      value: "java_full_stack",
      label: "Java Full Stack",
      add_date: "2024-12-06",
    },
    {
      id: 8,
      value: "spring_boot",
      label: "Spring Boot",
      add_date: "2024-12-06",
    },
  ];

  const Difficulty_Array = [
    { id: 1, value: "easy", label: "Easy", add_date: "2024-12-06" },
    { id: 2, value: "medium", label: "Medium", add_date: "2024-12-06" },
    { id: 3, value: "hard", label: "Hard", add_date: "2024-12-06" },
  ];

  const Topic_Array = [
    { id: 1, value: "strings", label: "Strings", add_date: "2024-12-06" },
    { id: 2, value: "algorithms", label: "Algorithms", add_date: "2024-12-06" },
    {
      id: 3,
      value: "data_structures",
      label: "Data Structures",
      add_date: "2024-12-06",
    },
    { id: 4, value: "API", label: "API Development", add_date: "2024-12-06" },
    {
      id: 5,
      value: "authentication",
      label: "Authentication",
      add_date: "2024-12-06",
    },
    {
      id: 6,
      value: "react_components",
      label: "React Components",
      add_date: "2024-12-06",
    },
    { id: 7, value: "CRUD", label: "CRUD Operations", add_date: "2024-12-06" },
    {
      id: 8,
      value: "data_analysis",
      label: "Data Analysis",
      add_date: "2024-12-06",
    },
  ];

  useEffect(() => {
    setTopicArray(Topic_Array);
    setDifficultyArray(Difficulty_Array);
    setTechnologyArray(Technology_Array);
  }, []);

  const getRandomTask = (filteredTasks) => {
    const randomIndex = Math.floor(Math.random() * filteredTasks.length);
    return filteredTasks[randomIndex];
  };

  const submitButton = (e) => {
    e.preventDefault();

    // Normalize input values for case-insensitive comparison
    const normalizedTechnology = Technology.toLowerCase();
    const normalizedDifficulty = Difficulty.toLowerCase();
    const normalizedTopic = Topic.toLowerCase();

    // Filter tasks based on selected Topic, Difficulty, and Technology
    const filtered = tasks.filter((task) => {
      const matchesTechnology =
        !Technology || task.technology.toLowerCase() === normalizedTechnology;
      const matchesDifficulty =
        !Difficulty || task.difficulty.toLowerCase() === normalizedDifficulty;
      const matchesTopic =
        !Topic ||
        task.tags.some((tag) => tag.toLowerCase() === normalizedTopic);

      return matchesTechnology && matchesDifficulty && matchesTopic;
    });

    // If there are matching tasks, pick a random one
    if (filtered.length > 0) {
      const randomTask = getRandomTask(filtered);
      setRandomTask(randomTask);
    } else {
      setRandomTask(null); // Clear if no tasks match
    }

    console.log(randomTask);
  };

  return (
    <div className="h-[83.9vh] flex flex-col items-center px-4 sm:px-8 md:pt-5">
      <form
        className="flex flex-col sm:flex-row gap-5 items-center justify-center flex-wrap w-full"
        onSubmit={submitButton}>
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
