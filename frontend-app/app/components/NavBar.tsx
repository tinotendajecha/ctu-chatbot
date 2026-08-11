import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar(){
    return(
        <div className="flex gap-5 justify-between items-center p-5">
           <div className="flex gap-3">
            <div className="md:hidden">
                <MenuIcon />
            </div>
            <div className="flex gap-3 flex justify-center items-center">
                <h1 className="text-3xl font-extrabold  text-primary">CTU</h1>
                <span className="text-2xl text-gray-500">|</span>
                <div className="flex flex-col text-sm font-bold text-gray-500">
                     <p className="hidden md:block"> Campus</p>
                    <p className="hidden md:block"> Assistant</p>

                </div>
            </div>
           </div>

           <div className="flex gap-3">
            <button className="border-primary border-2 px-2 py-1 rounded-md text-primary">Sign In</button>
            <button className="bg-primary px-2 py-1 text-surface rounded-md">Sign Up</button>
           </div>
        </div>
    )
}