'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js.',
      imageUrl: '/assets/dashboard-settings/images/project-ecommerce.png',
      projectUrl: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates.',
      imageUrl: '/assets/dashboard-settings/images/project-task.png',
      projectUrl: '#',
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description:
        'Data visualization dashboard with interactive charts and reporting.',
      imageUrl: '/assets/dashboard-settings/images/project-dashboard.png',
      projectUrl: '#',
    },
  ]);

  const handleRemove = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className=" w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-6 space-y-1">
        <h3 className="text-2xl font-bold text-[#232323]">Portfolio</h3>
        <p className="font-normal text-base text-black-200">
          Showcase your best work
        </p>
      </div>

      <Card className="flex-1 w-full bg-white-50 border-[#E8E8E8]">
        <CardContent className="px-6 max-w-[1056px]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-base font-medium text-[#1A1A1A]">Projects</h4>
            <Button
              variant="outline"
              size="xs"
              className="text-[#181818] border-[#E8E8E8] gap-1"
            >
              <Plus className="w-3 h-3" /> Add Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-[#E8EAEB] rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col"
              >
                <div className="relative w-full h-48 bg-primary-50">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h5 className="font-bold text-[#232323] text-base mb-1">
                    {project.title}
                  </h5>
                  <p className="text-sm text-[#92959C] line-clamp-2 mb-1 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                    <Link
                      href={project.projectUrl}
                      className="flex items-center gap-2 text-primary-300 text-base font-medium hover:underline"
                    >
                      View Project
                      <Image
                        src="/assets/dashboard-settings/icons/external-link.png"
                        alt="External Link"
                        width={14}
                        height={14}
                      />
                    </Link>

                    <button
                      onClick={() => handleRemove(project.id)}
                      className="text-[#FF3B30] text-base font-medium hover:text-error-normal"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
