import { CheckIcon, PencilIcon, TrashIcon, XIcon } from "lucide-react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export type Todo = {
  id: string;
  label: string;
  isComplete: boolean;
};

type Props = {
  id: string;
  isComplete: boolean;
  label: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoItem: FC<Props> = ({
  id,
  isComplete,
  label,
  todos,
  setTodos,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState(label);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      key={id}
      className={`flex justify-between items-center gap-2 py-2  group ${
        isEditing ? "border-b-2 border-gray-800" : "border-b border-gray-300"
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          ref={inputRef}
          className="w-full text-lg ml-6 focus:ring-0 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!e.currentTarget.value.trim()) return;

              setTodos((prev) =>
                prev.map((todo) =>
                  todo.id === id ? { ...todo, label: text } : todo
                )
              );

              setIsEditing(false);
            }
          }}
        />
      ) : (
        <div className="flex gap-2 cursor-pointer">
          <input
            checked={isComplete}
            onChange={(e) => {
              const newTodos = todos.map((todo) =>
                todo.id === id
                  ? { ...todo, isComplete: e.target.checked }
                  : todo
              );
              setTodos(newTodos);
            }}
            type="checkbox"
            className="size-4 min-h-4 min-w-4 cursor-pointer mt-2"
            id={id}
          />
          <label
            htmlFor={id}
            className={`text-start text-lg cursor-pointer ${
              isComplete ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {label}
          </label>
        </div>
      )}

      {isEditing ? (
        <div className="flex gap-4 px-4">
          <XIcon
            onClick={() => {
              setIsEditing(false);
              setText(label);
            }}
            className="size-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          />
          <CheckIcon
            onClick={() => {
              if (!text) return;

              const newTodos = todos.map((todo) =>
                todo.id === id ? { ...todo, label: text } : todo
              );

              setTodos(newTodos);

              setIsEditing(false);
            }}
            className="size-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex gap-4 px-4 xl:hidden group-hover:flex">
          <PencilIcon
            onClick={() => {
              setIsEditing(true);
            }}
            className="size-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          />
          <TrashIcon
            onClick={() =>
              setTodos((prev) => prev.filter((todo) => todo.id !== id))
            }
            className="size-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
