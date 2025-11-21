"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { AlertCircle } from "lucide-react"
import { Progress } from "../ui/progress"
import { InsightCard } from "./insight-card"
import { Fragment } from "react/jsx-runtime"
import { useState } from "react"

const stats = [
    {
        title: "10 Views",
        description: "On your last posted job",
    },
    {
        title: "200 Applications",
        description: "Received this month",
    },
]

const Sidebar = () => {
    const [role] = useState('user');
    return (
        <aside className="w-72 hidden md:flex flex-col gap-5 overflow-y-scroll">
        {/* profile-card */}
        <div className="border border-tertiary-50 profilecard flex justify-center items-center gap-2 bg-white rounded-md flex-col py-6 px-3">
            {/* user profile image */}
            <div className="relative w-40 h-40 mx-auto">
                <Image 
                    src="/images/portraitPlaceholder.png"
                    alt="profile"
                    fill
                    className="rounded-full object-cover"
                />
            </div>

                {/* name */}
                    <h1 className="text-[20px] font-bold text-gray-900">Nexo Labs</h1>
                    <p className="text-[16px] text-gray-500">Creative Design</p>

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-auto w-full">
                    {role === 'company' && 
                    <Button className="p-5 text-base">
                    Post a Job
                    </Button>
                    }
                    <Button
                    className="text-base border-tertiary-50 text-black p-5" 
                    variant={"outline"}>
                    Request Verification
                    </Button>
                </div>

        </div>

        {/* complete profile card */}
        <div className="border border-tertiary-50 profilecard flex justify-center items-start gap-4 bg-white rounded-md flex-col py-5 px-3">
            <h3 className="font-semibold text-[20px]">Complete your profile</h3>

            {/* progress bar */}
            <div className="progress-bar w-full">
                <h4 className="text-base text-tertiary-100">Your Profile is <span className="text-primary-blue font-bold">70%</span> complete</h4>
                <Progress 
                indicatorClassname="bg-primary-blue"
                value={70} 
                className="w-full h-1.5 bg-[#DCDCDC]" />
            </div>

            {/* Actions */}
            <div className="flex flex-col mt-2 w-full">
                <Button 
                variant={'outline'}
                className="p-5 Foundation bg-primary-50 text-base">
                Finish your profile
                </Button>
            </div>

            {/* note */}
            <div className="note flex items-center gap-2">
                <div className="icon"><AlertCircle width={16} height={16} /></div>
                <div className="text-sm text-tertiary-100">
                    {role === 'company' ? 'Complete your profile to attract stronger applicants.' : 'Complete your profile to attract more employers'}
                </div>
            </div>
        </div>

        {/* insights */}
        <div className="border border-tertiary-50 profilecard flex justify-center gap-2 bg-white rounded-md flex-col py-4 px-3">
            <h3 className="text-[20px] font-semibold">
                {
                role === 'company' ?
                'Insights' :
                'Job Statistics'
                }
            </h3>

            <div className="insight">

                {
                    stats && stats.map((item, index)=> 
                    <Fragment key={index}>
                        <InsightCard stat={item} />
                        {index !== stats.length -1 && <span className=" w-full h-px bg-tertiary-50 inline-block" />}
                    </Fragment>
                    )
                }

            </div>
        </div>

        </aside>
    )
}

export default Sidebar