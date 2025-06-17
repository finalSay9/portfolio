
"use client"
import React from "react"
import Navbar from "./navbar/page"

import Sidebar from "./about/page"

const Page: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

        <div className="flex flex-1">
            <Sidebar />

        
        
        </div>
        

        </div>
    )


}

export default Page;