"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setmainTask([...mainTask, { title, desc, completed: false }]); // Add completed property
    settitle("");
    setdesc("");
  };

  const deleteHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
  };

  const toggleCompleteHandler = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks[i].completed = !updatedTasks[i].completed; // Toggle completed state
    setmainTask(updatedTasks);
  };

  const editHandler = (index) => {
    setEditIndex(index);
  };

  const saveHandler = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index] = { ...updatedTasks[index], title, desc };
    setmainTask(updatedTasks);
    setEditIndex(null);
    settitle("");
    setdesc("");
  };

  const cancelEditHandler = () => {
    setEditIndex(null);
    settitle("");
    setdesc("");
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      const isEditing = editIndex === i;
      return (
        <li
          key={i}
          className={`flex items-center justify-between mb-5 ${
            t.completed ? "opacity-50 line-through" : ""
          }`}
        >
          {isEditing ? (
            <div className="flex flex-col w-2/3">
              <input
                className="text-lg border-2 px-2 py-1 mb-2"
                type="text"
                value={title}
                placeholder="Edit title"
                onChange={(e) => settitle(e.target.value)}
              />
              <input
                className="text-lg border-2 px-2 py-1"
                type="text"
                value={desc}
                placeholder="Edit description"
                onChange={(e) => setdesc(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex justify-between items-center mb-5 w-2/3">
              <h5 className="text-2xl font-semibold">{t.title}</h5>
              <h6 className="text-lg font-medium">{t.desc}</h6>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => toggleCompleteHandler(i)}
              className={`px-4 py-2 ${
                t.completed ? "bg-green-400" : "bg-gray-300"
              } text-white rounded font-bold`}
            >
              {t.completed ? "Completed" : "Mark Complete"}
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={() => saveHandler(i)}
                  className="px-4 py-2 bg-green-500 text-white rounded font-bold"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditHandler}
                  className="px-4 py-2 bg-gray-400 text-white rounded font-bold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => editHandler(i)}
                  className="px-4 py-2 bg-blue-400 text-white rounded font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className="px-4 py-2 bg-red-400 text-white rounded font-bold"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">
        My ToDo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          className="text-2xl border-zinc-800 border-4 px-4 py-2 m-8"
          type="text"
          required
          placeholder="Enter title here"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          className="text-2xl border-zinc-800 border-4 px-4 py-2 m-8"
          type="text"
          required
          placeholder="Enter description here"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
