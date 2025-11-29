'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth';

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}
const getInitialSettings = (
  role: string | undefined,
): NotificationSetting[] => {
  if (role === 'employer') {
    return [
      {
        id: 'email',
        title: 'Email Notifications',
        description: 'Receive email updates about your account',
        enabled: true,
      },
      {
        id: 'job_posting_alerts',
        title: 'Job Posting Alerts',
        description: 'Stay notified about your active listings',
        enabled: true,
      },
      {
        id: 'application_status',
        title: 'Application Status',
        description: "Updates on candidates' applications",
        enabled: true,
      },
      {
        id: 'talent_messages',
        title: 'Messages From Talent',
        description: 'Get messages from candidates',
        enabled: true,
      },
      {
        id: 'promotions',
        title: 'Promotions & Tips',
        description: 'Get hiring tips and product updates',
        enabled: false,
      },
    ];
  } else {
    return [
      {
        id: 'email',
        title: 'Email Notifications',
        description: 'Receive email updates about your account',
        enabled: true,
      },
      {
        id: 'job_matches',
        title: 'Job Matches',
        description: 'Get notified when jobs match your profile',
        enabled: true,
      },
      {
        id: 'application_status',
        title: 'Application Status',
        description: 'Updates on your job applications',
        enabled: true,
      },
      {
        id: 'company_messages',
        title: 'Message From Companies',
        description: 'When companies send you messages',
        enabled: true,
      },
      {
        id: 'promotions',
        title: 'Promotions & Tips',
        description: 'Career tips and promotional offers',
        enabled: false,
      },
    ];
  }
};
const CustomSwitch = ({ checked, onCheckedChange, id }: CustomSwitchProps) => {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEFF] focus-visible:ring-offset-2
        ${checked ? 'bg-[#00AEFF]' : 'bg-[#F0F1F1]'}
      `}
    >
      <span
        className={`
          pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
};

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsPage() {
  const { user } = useAuthStore();

  const [settings, setSettings] = useState<NotificationSetting[]>(() =>
    getInitialSettings(user?.current_role),
  );

  useEffect(() => {
    setSettings(getInitialSettings(user?.current_role));
  }, [user?.current_role]);
  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  };

  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-4 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">Notifications</h3>
        <p className="font-normal text-base text-black-200">
          Manage how you receive updates
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <div className="space-y-8">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex flex-row items-center justify-between border-[#E8EAEB]"
              >
                <div className="space-y-1 flex-1 pr-4 text-left">
                  <label
                    htmlFor={setting.id}
                    className="text-base font-semibold text-[#111827] cursor-pointer block"
                    onClick={() => handleToggle(setting.id)}
                  >
                    {setting.title}
                  </label>
                  <p className="text-sm font-normal text-[#92959C]">
                    {setting.description}
                  </p>
                </div>

                <CustomSwitch
                  id={setting.id}
                  checked={setting.enabled}
                  onCheckedChange={() => handleToggle(setting.id)}
                />
              </div>
            ))}
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
