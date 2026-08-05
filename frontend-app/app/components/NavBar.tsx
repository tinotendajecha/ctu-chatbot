

export default function NavBar(){
    return(
        <div className="flex gap-5 justify-between items-center p-5">
           <div className="flex gap-3">
            <h1>CTU</h1>
           <p>Campus Assistant</p>
           </div>

           <div className="flex gap-3">
            <button>Login</button>
            <button>Sign Up</button>
           </div>
        </div>
    )
}