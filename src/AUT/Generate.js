import React from "react";
import { useState, useEffect } from "react";
import { prompts } from "./Prompts";

let nextId = 0;

const Generate = () => {
    const [input, setInput] = useState(""); // store currently inputted idea in input form
    const [ideas, setIdeas] = useState([]); // previously entered ideas
    const [ideaEditing, setIdeaEditing] = useState(null); // id of idea we are editing
    const [editingText, setEditingText] = useState("");

    const handleSubmit = (e) => { // e is short for event
        e.preventDefault(); // prevents page from refreshing upon clicking submit
        setIdeas([...ideas, { id: nextId++, name: input }]);
        setInput(''); // clears the input form
    }

    function editIdea(id) {
        const updatedIdeas = [...ideas].map((idea) => {
        if (idea.id === id) {
            idea.name = editingText;
        }
        return idea;
        })
        setIdeas(updatedIdeas);

        // reset editing hooks
        setIdeaEditing(null);
        setEditingText("");
    }

    const [time, setTime] = useState(300);

    useEffect(() => {
        let timer = setInterval(() => {
        setTime((time) => {
            if (time === 0) {
            clearInterval(timer);
            return 0;
            } else return time - 1;
        });
        }, 1000);

        // Cleanup the interval on component unmount or when time reaches 0
        return () => clearInterval(timer);
    }, [time]);

    return (
        <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-8 bg-amber-400">
            <div className="flex flex-row space-x-4 p-4 h-full w-full items-center justify-center rounded-[60px]">
                <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full text-left p-10">
                    <text className="text-lg ml-4 mb-4">
                        For the following objects, come up with alternative uses that are different from it's typical intended use.
                    </text>
                    <text className="text-lg mb-4 ml-4">
                        The ideas don't have to be practical/realistic, so long as they strike people as clever, original, unusual, and innovative.
                    </text>
                    <div className="w-full rounded-[60px] bg-orange-600 flex justify-center items-center p-4 mt-4">
                        <img
                            className="object-contain rounded-[60px]"
                            src={prompts["Cardboard Box"]}
                        />
                    </div>
                    <h1 className="mt-8 text-center text-2xl">{Object.keys(prompts)[0]}</h1>
                </div>

                <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col items-center h-full px-4">
                    
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-row justify-between items-center mt-8 mb-4 px-3">
                            <h2 className="text-2xl text-center">Enter Alternative Uses below</h2>
                            <p className="w-fit bg-orange-400 rounded-lg text-xl p-1">
                            Time: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                            {`${time % 60}`.padStart(2, 0)}
                            </p>
                        </div>
                        
                        <div className="flex flex-row space-x-4 justify-between">
                            <input 
                                type="text" 
                                value={input}
                                className="w-2/3 p-1 text-lg"
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <input type="submit" value="SUBMIT" className="outline outline-offset-2 outline-2 rounded-md font-bold text-xl px-2 hover:bg-orange-500"/>
                        </div>
                    </form>

                    <div className="h-3/4 w-full rounded-b-[60px] bg-orange-600 mt-6 rounded-lg p-4 grid place-items-start">
                    <ul className="flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
                        {ideas.map((idea) => (
                            <li
                            key={idea.id}
                            className="text-left text-xl flex flex-col w-full px-2 space-y-1"
                            >
                            <div className="flex flex-row w-full justify-between items-center justify-center">
                                
                                {ideaEditing === idea.id ? 
                                (
                                <form onSubmit={() => editIdea(idea.id)} className="flex flex-row">
                                <input
                                    type="text"
                                    value={editingText}
                                    className="w-full p-1 outline outline-1"
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <input input type="submit" value="✔️" />
                                </form>
                                ) 
                                : 
                                (
                                <span className="whitespace-normal max-w-3/4">{`${idea.name}`}</span>
                                )}

                                <div className="flex justify-center">
                                <button 
                                    onClick={() => {
                                    setIdeaEditing(idea.id)
                                    setEditingText(idea.name)
                                    }}
                                >
                                    ✏️
                                </button>

                                <button
                                    onClick={() => {
                                    setIdeas(ideas.filter((a) => a.id !== idea.id));
                                    }}
                                >
                                    ❌
                                </button>
                                </div>
                            </div>

                            
                            
                            
                            </li>
                        ))}
                        </ul>
                    </div>
                    
                </div>

                <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full p-6">
                    <h2 className="mb-4 text-2xl text-center mt-4">Generative AI Ideas</h2>
                    <text className="text-lg mb-4 ml-4">
                        Below are alternative uses generated by GPT-4
                    </text>
                    <div className="h-5/6 w-full bg-orange-600 rounded-b-[60px] rounded-lg">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Generate;