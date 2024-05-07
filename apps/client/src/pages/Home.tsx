import Input from "../components/Input";
import { Trash2 } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State, Task } from "../utils/sharedTypes";
import { twMerge } from "tailwind-merge";

const serverUrl = import.meta.env.VITE_APP_API_URL || "";
function Home() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks]: [Task[], any] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data } = useSelector((state: State) => state.user.user);
  const { _id } = data || {};
  console.log("this is from redux", _id);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const getTasks = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/task?id=${_id}`);
      if (!response.ok) throw new Error(response.statusText);
      const { data } = await response.json();
      setTasks(data || []);
    } catch (error: any) {
      console.log(error);
      // if (error.message === "Unauthorized") navigate("/login");
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (taskInput === "") {
      return;
    }
    try {
      setLoading(true);
      await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskInput,
          user: _id,
          category: selectedOption !== "" ? selectedOption : "other",
        }),
      });
      setTaskInput("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    getTasks();
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/task`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
    } catch (error) {
      console.error(error);
    }

    getTasks();
  };
  const updateTask = async (id: string) => {
    try {
      setLoading(true);
      const taskToUpdate: Task | undefined = tasks.find(
        (task: Task) => task._id === id
      );
      if (taskToUpdate) {
        const updatedTask = {
          ...(taskToUpdate as Task),
          checked: !(taskToUpdate as Task).checked,
          category: selectedOption !== "" ? selectedOption : "other",
        };

        await fetch(`/api/task`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
      }
      getTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex justify-center items-center ">
        <div className="w-[550px] mt-40 ">
          <div className="inline-flex w-full gap-2 relative">
            <Input
              type="text"
              placeholder="What do you want to do"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <select
              className="max-w-28  text-slate-300 rounded-lg bg-slate-800 px-2"
              value={selectedOption}
              onChange={handleChange}
            >
              <option disabled value="">
                Categories
              </option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="learning">Learning </option>
              <option value="other">other </option>
            </select>

            <button
              onClick={() => {
                addTask();
              }}
              className={twMerge(
                "font-semibold px-3  py-3 rounded-md w-24  ",
                loading ? "bg-sky-800" : "bg-sky-500"
              )}
            >
              Add
            </button>
          </div>
          <div className="p-4">
            {tasks.map((task: Task) => (
              <div
                key={task._id}
                className="flex justify-between bg-sky-900 p-3 my-2 rounded-lg"
              >
                <p>{task.title}</p>

                <div className="inline-flex gap-2">
                  <span className=" px-2 text-sm text-slate-100 bg-slate-500 rounded-full">
                    {task.category}
                  </span>
                  <input
                    className=" w-4 cursor-pointer"
                    type="checkbox"
                    onChange={() => updateTask(task._id)}
                  />
                  <Trash2
                    className="cursor-pointer "
                    color="red"
                    size={20}
                    onClick={() => deleteTask(task._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;
