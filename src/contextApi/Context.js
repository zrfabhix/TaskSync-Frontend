"use client"
const { createContext, useState } = require("react");

const Context = createContext()

export const MyProvider = ({children}) =>{
    const [user, setuser] = useState(null)
    const [allCollections, setallCollections] = useState([]);
    return (
        <Context.Provider value={{user, setuser, allCollections, setallCollections}}>
            {children}
        </Context.Provider>
    )
}

export default Context;