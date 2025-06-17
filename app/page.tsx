
"use client"
import React from "react"
import Sidebar from './landing/about/page'
import Navbar from './landing/navbar/page'
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