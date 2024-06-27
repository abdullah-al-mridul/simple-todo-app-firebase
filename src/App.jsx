import { onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./firebase/config";

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const handleAdd = () => {
    if (text.trim() !== "") {
      set(push(ref(db, "lists/")), {
        text,
      });
      setText("");
    }
    setText("");
  };
  const [modalText, setModalText] = useState("");
  useEffect(() => {
    const listRef = ref(db, "lists/");
    const unsubscribe = onValue(listRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((i) => {
        arr.push({
          data: i.val(),
          id: i.key,
        });
      });
      setList(arr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="p-10">
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="rounded-md mt-3 mb-4 border border-teal-400"
          value={text}
        />
        <br />
        <input
          className="bg-green-400 cursor-pointer text-white py-2 px-3 rounded-md"
          type="submit"
          onClick={handleAdd}
          value="submit"
        />
        <br />
        <ol className="flex mt-6 text-teal-500 flex-col gap-2">
          {list.map((i) => (
            <li key={i.id}>
              {i.data.text}{" "}
              <button
                onClick={() => {
                  remove(ref(db, "lists/" + i.id));
                }}
                className="text-red-500 py-1 px-2 rounded-md ml-3 bg-teal-400"
              >
                X
              </button>{" "}
              <button
                onClick={() => {
                  setModalOpen(!modalOpen);
                  setId(i.id);
                }}
                className="text-red-500 py-1 px-2 rounded-md ml-3 bg-teal-400"
              >
                Edit
              </button>{" "}
            </li>
          ))}
        </ol>
      </div>
      {modalOpen && (
        <div className=" fixed top-0 h-full bg-[#0808085d] w-full flex items-center justify-center">
          <div className="bg-teal-200 rounded-lg shadow-lg h-[200px] w-[500px] p-5">
            <div className="flex justify-between">
              <h2 className=" text-red-600 text-[20px]">edit todo text...</h2>
              <button
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
                className="bg-red-400 font-bold text-blue-200 py-2 px-4 rounded-md"
              >
                X
              </button>
            </div>
            <input
              type="text"
              onChange={(e) => {
                setModalText(e.target.value);
              }}
              className="mt-5 w-full border border-red-400"
              value={modalText}
            />
            <input
              type="button"
              value="change"
              onClick={() => {
                set(ref(db, "lists/" + id), {
                  text: modalText,
                });
                setId(null);
                setModalText("");
                setModalOpen(!modalOpen);
              }}
              className="bg-red-500 cursor-pointer text-green-800 font-[700] py-2 px-3 rounded-md mt-5"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
