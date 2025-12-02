"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { CompanyProfileData } from "@/types/profile"; 

interface CompanyProfileProps {
  // profile: CompanyProfileData | null | undefined;
  profile: any;
  isOwnProfile?: boolean;
}

const MOCK_COMPANY = {
  logo: "/assets/dashboard/company_logo.png",
  name: "Nexo Labs",
  tagline: "Innovating for the future",
  website: "nexolabs.com",
  employees: "10 employees",
  location: "Lagos, Nigeria",
  about:
    "Our company helps organisations improve operations through clear processes and reliable digital solutions. We focus on efficiency, accuracy and measurable outcomes.",
  techStack: ["React", "Node.js", "AWS", "Python"],
  sections: [
    {
      id: 1,
      title: "What We Do",
      bullets: [
        "We design products that solve defined problems.",
        "We deliver services that support daily workflows.",
        "We provide tools that improve decision making.",
        "We support teams with training and guidance.",
      ],
    },
    {
      id: 2,
      title: "Value Proposition",
      bullets: [
        "Faster workflows reduce delays.",
        "Standardised processes lower errors.",
        "Data dashboards help you track progress.",
        "Support teams respond quickly with direct solutions.",
      ],
    },
    {
      id: 3,
      title: "Why Talents Should Work With Us",
      bullets: [
        "Strong track record across multiple sectors.",
        "Practical solutions built around user needs.",
        "Transparent communication throughout each stage.",
        "Measurable results within agreed timelines.",
      ],
    },
  ],
};

export function CompanyProfileDisplay({
  profile,
  isOwnProfile = false,
}: CompanyProfileProps) {
  // const data = profile ?? MOCK_COMPANY;

  const data = MOCK_COMPANY; 

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Banner */}
      <div className="relative h-48 w-full max-w-[804px] rounded-t-xl bg-primary-300">
        <div className="absolute -bottom-12 left-6 h-40 w-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
          <Image
            src={data.logo}
            alt="Company Logo"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Card */}
      <Card className="max-w-[804px] rounded-t-none">
        <CardHeader className="p-10 pb-0 flex justify-between items-start">
          <div></div>

          {isOwnProfile && (
            <Link href="/settings/company-profile" className="inline-block">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 text-xs text-[#344054] border-[#D0D5DD] font-semibold hover:bg-gray-50 rounded"
              >
                <Image
                  src="/assets/dashboard/icons/edit.png"
                  alt="Edit"
                  width={14}
                  height={14}
                />
                Edit Profile
              </Button>
            </Link>
          )}
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-black">
                {data.name}
              </h2>
              <p className="text-base text-black">{data.tagline}</p>

              <div className="flex flex-col gap-1 mt-1">
                <p className="text-sm text-gray-600">{data.location}</p>
                <p className="text-sm text-gray-600">{data.employees}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="text-sm text-gray-700 text-right">
              <p className="font-semibold text-black">Company Links</p>
              <p>
                Website:{" "}
                <a
                  href={`https://${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 hover:underline"
                >
                  {data.website}
                </a>
              </p>
            </div>
          </div>

          {/* ABOUT */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-4">
              About Company
            </h3>
            <p className="text-base text-black whitespace-pre-line">
              {data.about}
            </p>
          </div>

          {/* DETAILS / SECTIONS */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-6">
              Details
            </h3>

            {data.sections.length === 0 ? (
              <p className="text-gray-500 text-sm">No details added yet.</p>
            ) : (
              <div className="space-y-6">
                {data.sections.map((section) => (
                  <div key={section.id}>
                    <p className="text-base font-semibold text-black">
                      {section.title}
                    </p>

                    <ul className="list-disc ml-5 text-gray-600 mt-2 space-y-1">
                      {section.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TECH STACK */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2">
              {data.techStack.length === 0 ? (
                <p className="text-gray-500 text-sm">No tech stack added yet.</p>
              ) : (
                data.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-[#EAF0ED] text-sm text-black rounded-2xl"
                  >
                    {tech}
                  </span>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
