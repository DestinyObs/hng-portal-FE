'use client';
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandInput,
} from '@/components/ui/command';
import { useMemo, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import SkillsBadge from '@/components/settings/skills/skills-badge';
import { useGetProfileData } from '@/hooks/profile-settings';
import { useSkills } from '@/hooks/lookups';
import { Skill, Experience } from '@/types/profile-settings';
import { updateUserSkills } from '@/api/actions/user-profile-settings';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import Modal from '@/components/shared/ui/modal';
import WorkExperienceForm from './components/add-experience-form';

export default function SkillsAndExperiencePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { data } = useGetProfileData();

  const { data: skillsRes } = useSkills();

  const userSkills = useMemo(() => data?.skills || [], [data?.skills]);
  const userExperiences = useMemo(
    () => data?.experiences || [],
    [data?.experiences],
  );

  const [skills, setSkills] = useState<Skill[]>(userSkills);
  const [experiences, setExperiences] = useState<Experience[]>(userExperiences);

  useEffect(() => {
    setSkills(userSkills);
  }, [userSkills]);

  useEffect(() => {
    setExperiences(userExperiences);
  }, [userExperiences]);

  useEffect(() => {
    console.log(skillsRes);
  }, [skillsRes]);

  const [skillInput, setSkillInput] = useState('');

  const handleSaveChanges = async () => {
    try {
      const result = await updateUserSkills(skills);

      if (result.success) {
        await queryClient.invalidateQueries({
          queryKey: ['profile', user?.id],
        });
        console.log('Skills updated successfully');
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleOpenModal = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    setSkills(skills.filter((skill) => skill.id !== skillToRemove.id));
  };

  const handleReset = () => {
    setSkills(userSkills);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-4 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Skills & Experience
        </h3>
        <p className="font-normal text-base text-black-200">
          Showcase your expertise and work history
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <div className="space-y-4 w-full mb-8">
            <label className="text-sm text-[#1A1A1A] font-medium">Skills</label>

            <div className="relative">
              {skillInput.length > 0 ? (
                <div className="absolute z-20 top-0 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Add skills to help employers find you"
                      value={skillInput}
                      onValueChange={setSkillInput}
                      className="p-3 border-none focus:outline-none focus:ring-0"
                      autoFocus
                    />
                    <CommandList className="max-h-48 overflow-y-auto">
                      <CommandGroup heading="Available Skills">
                        {skillsRes
                          ?.filter((skill: Skill) =>
                            skill.name
                              .toLowerCase()
                              .includes(skillInput.toLowerCase()),
                          )
                          .map((skill: Skill) => (
                            <CommandItem
                              key={skill.id}
                              onSelect={() => {
                                if (
                                  !skills.some((s: Skill) => s.id === skill.id)
                                ) {
                                  setSkills([...skills, skill]);
                                }
                                setSkillInput('');
                              }}
                            >
                              {skill.name}
                            </CommandItem>
                          ))}

                        {skillsRes?.filter((s: Skill) =>
                          s.name
                            .toLowerCase()
                            .includes(skillInput.toLowerCase()),
                        ).length === 0 && (
                          <div className="p-3 text-sm text-gray-500">
                            No skills found.
                          </div>
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Add skills to help employers find you"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                />
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills?.map((skill: Skill) => (
                <SkillsBadge
                  key={skill.id}
                  skill={skill.name}
                  onRemove={() => handleRemoveSkill(skill)}
                />
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
                onClick={handleOpenModal}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => {
                const startDate = new Date(exp.start_date).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    year: 'numeric',
                  },
                );
                const endDate = exp.end_date
                  ? new Date(exp.end_date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : null;
                const dateRange = exp.is_current
                  ? `${startDate} – Present`
                  : endDate
                    ? `${startDate} – ${endDate}`
                    : startDate;

                return (
                  <div
                    key={exp.id}
                    className="border border-[#E8EAEB] rounded-xl p-5 space-y-3 bg-white transition hover:border-gray-300"
                  >
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-[#6A7282] text-sm font-medium">
                        {dateRange}
                      </span>
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-[#FF3B30] font-medium text-sm hover:text-red-700 focus:outline-none"
                      >
                        Remove
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-[#111827] leading-tight">
                      {exp.position}
                    </h4>

                    <div>
                      <Badge className="bg-[#DBEAFE] hover:bg-[#DBEAFE] text-[#1D4ED8] font-semibold rounded-md border-none px-2.5 py-0.5 text-xs">
                        {exp.company}
                      </Badge>
                    </div>

                    {exp.description && (
                      <p className="text-[#92959C] text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-2xl"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal openDialog={openDialog} setOpenDialog={handleOpenModal}>
        <WorkExperienceForm
          onSuccess={() => {
            handleOpenModal();
            if (data) {
              queryClient.invalidateQueries({
                queryKey: ['profile'],
              });
            }
          }}
        />
      </Modal>
    </div>
  );
}
