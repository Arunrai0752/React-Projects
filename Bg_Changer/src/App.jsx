import { useState } from "react";

function App() {
  const [color, setColor] = useState("black");

  return (
    <>
      <div></div>
      <main
        className="h-screen w-full  z-50 "
        style={{ backgroundColor: color }}
      >
        <nav className=" w-full  py-2  fixed bottom-[50px] flex justify-center flex-wrap gap-10 ">
          <button
            style={{ backgroundColor: "#ffffff" }}
            className="rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#ffffff");
            }}
          >
            White
          </button>
          <button
            style={{ backgroundColor: "#ef4444" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#ef4444");
            }}
          >
            Red
          </button>
          <button
            style={{ backgroundColor: "#3b82f6" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#3b82f6");
            }}
          >
            Blue
          </button>
          <button
            style={{ backgroundColor: "#22c55e" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#22c55e");
            }}
          >
            Green
          </button>
          <button
            style={{ backgroundColor: "#eab308" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#eab308");
            }}
          >
            Yellow
          </button>
          <button
            style={{ backgroundColor: "#a855f7" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#a855f7");
            }}
          >
            Purple
          </button>
          <button
            style={{ backgroundColor: "#ec4899" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#ec4899");
            }}
          >
            Pink
          </button>
          <button
            style={{ backgroundColor: "#6b7280" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#6b7280");
            }}
          >
            Gray
          </button>
          <button
            style={{ backgroundColor: "#f97316" }}
            className="text-white rounded-3xl px-8 py-2"
            onClick={() => {
              setColor("#f97316");
            }}
          >
            Orange
          </button>
        </nav>
      </main>
    </>
  );
}

export default App;
