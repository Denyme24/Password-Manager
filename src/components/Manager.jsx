import React from "react";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", uname: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    // alert("Show the password");
    passwordRef.current.type = "text";

    if (ref.current.src.includes("/eyecross.svg")) {
      ref.current.src = "/eye.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyecross.svg";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.uname.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id: form.id }),
      });
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      setform({ site: "", uname: "", password: "" });
    } else {
      toast("Error : Password not Saved !");
    }
  };

  const deletePassword = async (id) => {
    // toast.success("Password Deleted", {
    //   position: "top-right",
    //   autoClose: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
    setpasswordArray(
      passwordArray.filter((items) => {
        return items.id != id;
      })
    );
    let deletereq = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  };

  const editPassword = (id) => {
    let editPass = passwordArray.filter((items) => {
      return items.id == id;
    });
    setform(editPass[0], { id: id });

    let newPass = passwordArray.filter((items) => {
      return items.id !== id;
    });
    setpasswordArray(newPass);
  };

  const copyText = (text) => {
    // toast.success("Copied To Clipboard", {
    //   position: "top-right",
    //   autoClose: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Bounce"
      />
      <ToastContainer />
      <div></div>
      <div className="fixed h-[100%] w-[100%] top-0 z-[-2] md:h-screen md:w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="md:mycontainer p-2">
        <h1 className="text-4xl font-bold text-center md:mt-0 mt-10">
          <span className="text-amber-500">&lt;</span>
          CipherNest
          <span className="text-amber-500">/&gt;</span>
        </h1>
        <p className="text-black text-lg text-center mx-4 pt-5">
          Your Go-To Password Manager
        </p>
        <div className="text-black flex flex-col p-4 py-1 gap-8 items-center ">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border-[2px] border-amber-400 w-full px-3 "
            type="text"
            name="site"
            id=""
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              onChange={handleChange}
              value={form.uname}
              placeholder="Enter Username"
              className="rounded-full border-[2px] border-amber-400 w-full px-3 "
              type="text"
              name="uname"
              id="uname"
              autoComplete="off" // Add this
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border-[2px] border-amber-400 w-full px-3 "
                type="password"
                name="password"
                id="password"
                autoComplete="off" // Add this
              />
              <span
                onClick={showPassword}
                className="absolute right-[3px] top-[4px] cursor-pointer"
              >
                <img ref={ref} src="/eye.svg" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="justify-center flex items-center gap-1 rounded-full px-4 py-1 w-fit bg-amber-400 border border-amber-200"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2>Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords To Show</div>
          ) : (
            <table className="table-auto w-full rounded-sm overflow-hidden mb-[10]">
              <thead className="bg-amber-400">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-amber-100">
                {passwordArray.map((items, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className="text-center w-32 py-2 border border-white">
                          <div className=" ldicon-cpy flex justify-center items-center gap-7 cursor-pointer">
                            <a href={items.site} target="_blank">
                              {items.site}
                            </a>
                            <img
                              onClick={() => {
                                copyText(items.site);
                              }}
                              src="/public/copy.svg"
                              alt=""
                              height="20px"
                              width="20px"
                            />
                          </div>
                        </td>
                        <td className="md:text-center pl-12 pr-12 md:w-32 md:py-2 border border-white">
                          <div className=" ldicon-cpy flex justify-center items-center gap-7 cursor-pointer">
                            {items.uname}
                            <img
                              onClick={() => {
                                copyText(items.uname);
                              }}
                              src="/public/copy.svg"
                              alt=""
                              height="20px"
                              width="20px"
                            />
                          </div>
                        </td>
                        <td className="md:text-center pl-12 pr-12 md:w-32 md:py-2 border border-white">
                          <div className=" ldicon-cpy flex justify-center items-center gap-7 cursor-pointer">
                            {"*".repeat(items.password.length)}
                            <img
                              onClick={() => {
                                copyText(items.password);
                              }}
                              src="/public/copy.svg"
                              alt=""
                              height="20px"
                              width="20px"
                            />
                          </div>
                        </td>
                        {/* Edit or Delete buttons */}
                        <td className="md:text-center pl-12 pr-12 md:w-32 md:py-2 border border-white">
                          <div className=" ldicon-cpy flex justify-center items-center gap-7 cursor-pointer">
                            <div className="edit">
                              <script src="https://cdn.lordicon.com/lordicon.js"></script>
                              <lord-icon
                                onClick={() => {
                                  editPassword(items.id);
                                }}
                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                trigger="click"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                            <div
                              className="delete"
                              // onClick={() => {
                              //   deletePassword(items.id);
                              // }}
                            >
                              <script src="https://cdn.lordicon.com/lordicon.js"></script>
                              <lord-icon
                                onClick={() => {
                                  deletePassword(items.id);
                                }}
                                src="https://cdn.lordicon.com/drxwpfop.json"
                                trigger="click"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
// continue from 1:58:00
