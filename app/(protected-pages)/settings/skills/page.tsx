'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface ExperienceItem {
  id: number;
  dateRange: string;
  title: string;
  company: string;
  description: string;
}

export default function SkillsAndExperiencePage() {
  const [skills, setSkills] = useState<string[]>([
    'Figma',
    'Sketch',
    'Adobe XD',
    'Python',
  ]);
  const [skillInput, setSkillInput] = useState('');

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: 1,
      dateRange: 'Jan 2025 – Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      description:
        'Leading development of scalable web applications using React and Node.js. Managing a team of 4 developers.',
    },
    {
      id: 2,
      dateRange: 'Jun 2019 – Dec 2020',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      description:
        'Built and maintained customer-facing applications. Implemented CI/CD pipelines and improved deployment processes.',
    },
  ]);

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleRemoveExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="w-full pt-8 lg:pt-30 justify-center pb-10 px-4 lg:px-0">
      <div className="w-full mb-6 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Skills & Experience
        </h3>
        <p className="font-normal text-base text-[#969696]">
          Showcase your expertise and work history
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <div className="space-y-4 w-full mb-8">
            <label className="text-sm text-[#1A1A1A]">Skills</label>

            <input
              type="text"
              placeholder="Add skills to help employers find you"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && skillInput.trim() !== '') {
                  e.preventDefault();
                  setSkills([...skills, skillInput.trim()]);
                  setSkillInput('');
                }
              }}
            />

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-[#111827] text-xs py-1.5 px-2 rounded-full border border-[#EAF0ED] flex items-center bg-white gap-1 font-normal"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#92959C] hover:text-red-500 focus:outline-none ml-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6 w-full">
            <div className="flex flex-row justify-between items-center w-full mb-4">
              <label className="text-sm text-[#1A1A1A] font-medium whitespace-nowrap">
                Work Experience <span className="text-[#FF3B30]">*</span>
              </label>

              <Button
                type="button"
                variant="outline"
                className="h-8 px-3 text-xs max-w-30 font-medium text-[#181818] border-[#E8E8E8] bg-white hover:bg-gray-50 gap-1.5 rounded-lg whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border border-[#E8EAEB] rounded-xl p-5 space-y-3 bg-white transition hover:border-gray-300"
                >
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-[#6A7282] text-sm font-medium">
                      {exp.dateRange}
                    </span>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-[#FF3B30] font-medium text-sm hover:text-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-[#111827] leading-tight">
                    {exp.title}
                  </h4>

                  <div>
                    <Badge className="bg-[#DBEAFE] hover:bg-[#DBEAFE] text-[#1D4ED8] font-semibold rounded-md border-none px-2.5 py-0.5 text-xs">
                      {exp.company}
                    </Badge>
                  </div>

                  <p className="text-[#92959C] text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-2xl"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
