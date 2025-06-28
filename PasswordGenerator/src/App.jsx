import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(10);
  const [AllowedChars, setAllowedchars] = useState(false);
  const [Allowednums, setAllowednums] = useState(false);
  const passwordRef = useRef(null);

  const Randompassword = useCallback(() => {
    let Pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (AllowedChars) {
      str += "!@#$%^&*()_+{}|`~][;'<>?/";
    }
    if (Allowednums) {
      str += "0192837465";
    }

    for (let i = 1; i <= length; i++) {
      Pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(Pass);
  }, [length, AllowedChars, Allowednums]);

  useEffect(() => {
    Randompassword();
  }, [length, AllowedChars, Allowednums]);

  const CopyPassword = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
  };

  return (
    <>
      <main className="w-full h-screen flex items-center  justify-center bg-black text-white">
        <div className="w-[60%] bg-gray-600 rounded-3xl fixed top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8">
          <input
            type="text"
            readOnly
            className="w-[80%]  ms-4 p-4 bg-white text-black rounded-s-2xl text-2xl outline-0"
            placeholder="Random Password"
            value={password}
            ref={passwordRef}
          />
          <button
            className=" w-[10%] bg-blue-500 me-4 p-4 rounded-e-2xl text-2xl hover:bg-blue-900 active:bg-green-500 "
            onClick={() => CopyPassword()}
          >
            Copy
          </button>
        </div>
        <div className=" flex justify-center items-center mt-5 gap-7">
          <button
            className="bg-blue-500 p-4 rounded-lg text-2xl text-white"
            onClick={Randompassword}
          >
            Generate Password
          </button>
          <div className="flex w-40 text-2xl items-center gap-1">
            {" "}
            <input
              type="range"
              value={length}
              min={6}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label htmlFor=""> {length}</label>
          </div>

          <div className="flex text-2xl items-center gap-1">
            <input
              type="checkbox"
              className="h-4 w-4"
              defaultChecked={Allowednums}
              onClick={() => {
                setAllowednums((prev) => !prev);
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex text-2xl items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={AllowedChars}
              className="h-4 w-4"
              onClick={() => {
                setAllowedchars((prev) => !prev);
              }}
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
