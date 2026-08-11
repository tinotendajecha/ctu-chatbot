import SideBar from "./components/SideBar";

export default function Home() {

  type message = {
    id: string,
    message: string,
    author: "user" | "assistant"
  }

  let chatHistory: message[] = [{ 
      id: "1",
      message: "Hi! I'm the CTU Campus Assistant. Ask me anything about admissions, courses, timetables or student services.",
      author: "assistant" 
    }, 
    {
      id: "2",
      message: "What documents do I need to apply?",
      author: "user"
    },{
      id: '3',
      message:"You'll need your ID or passport, your latest results, and — if you're applying for Graphic Design or Visual Communication — a portfolio of your work. A parent/guardian ID is also needed if you're under 18 or sponsored.",
      author: "assistant"
    }
  ]

  return (
    <div className="flex min-h-[calc(100vh-88px)] flex-col border-t border-slate-200 bg-primary-tint">
      <div className="flex flex-1">
        <aside className="w-72 shrink-0 border-r border-slate-200 bg-slate-50 p-4 hidden md:block">
          <SideBar />
        </aside>

        <main className="flex flex-col ">


          <div className="flex flex-col gap-4 p-4 text-sm text-slate-600">
            {chatHistory.map((message) => (
              <div>
                {message.author === "assistant" ? (
                  <div className="flex gap-2">
                    <span className="font-bold bg-primary text-white p-1 rounded-md w-16 h-8">CTU</span>
                    <div>
                      <p className="bg-white mr-50 p-3 rounded-r-lg rounded-bl-lg">{message.message}</p>
                    </div>
                  </div>
                ):(<div>
                  <p className="bg-primary text-white p-3 rounded-l-lg rounded-br-lg ml-140 ">
                    {message.message}
                  </p>
                </div>)}
              </div>
            ))}
          </div>

          <div className=" bg-white w-full p-7  mt-auto">
            <input
            className="border border-primary w-full p-5 outline-none rounded-lg"
            placeholder="Ask about Admissions, courses, timetables, fees..." />
          </div>
        </main>
      </div>
    </div>
  );
}
