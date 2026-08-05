

export default function SideBar() {
    return(
        <div className="border border-gray-300 p-4">
            <button>New Chat</button>

            <div>
                <label htmlFor="temporaryChat">Temporary Chat</label>
                <input id="temporaryChat" type="radio" />

                <div>
                    <span>Chat History</span>
                    <div className="chats">
                        <ul>
                            <li>Chat 1</li>
                            <li>Chat 2</li>
                            <li>Chat 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}