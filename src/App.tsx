import { useState } from "react";
import "./App.css";
import { PlusCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo, TodoItem } from "./components/todo-item";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", label: "My todo", isComplete: false },
  ]);

  const [input, setInput] = useState("");

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const filteredTodos = query
    ? todos.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : todos;

  return (
    <div className="w-full max-w-screen-2xl">
      <div className="w-full max-w-screen-md mx-auto">
        <p className="text-3xl text-gray-700 my-4">Your Todos</p>
        <div className="w-full border border-gray-500 rounded-md overflow-hidden">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search your note"
            className="w-full px-4 py-1.5"
          />
        </div>

        <div className="relative">
          <div className="mt-10 h-[calc(100vh-15rem)] overflow-y-auto pb-20">
            <div className="flex flex-col">
              {filteredTodos.map(({ id, isComplete, label }) => {
                return (
                  <TodoItem
                    id={id}
                    isComplete={isComplete}
                    label={label}
                    todos={todos}
                    setTodos={setTodos}
                  />
                );
              })}
            </div>
          </div>

          <Dialog open={open} onOpenChange={(data) => setOpen(data)}>
            <DialogTrigger className="absolute bottom-5 right-5 bg-white">
              {" "}
              <PlusCircleIcon className="text-blue-800 size-10" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Note</DialogTitle>
                <DialogDescription>Add your note here</DialogDescription>
              </DialogHeader>

              <div className="w-full border border-gray-500 rounded-md overflow-hidden">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (input.trim() === "") return;

                      setTodos([
                        ...todos,
                        {
                          id: `${Math.random()}`,
                          label: input,
                          isComplete: false,
                        },
                      ]);

                      setInput("");
                      setOpen(false);
                    }
                  }}
                  type="text"
                  placeholder="Search your note"
                  className="w-full px-4 py-1.5"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default App;
