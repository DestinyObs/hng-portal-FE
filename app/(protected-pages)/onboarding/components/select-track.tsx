'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTalentOnboardTab } from '@/store/onboarding';
import BackButton from './back-button';
import { useTracks } from '@/hooks/lookups';
import { Tracks } from '@/types/onboarding-talent';
// import clsx from 'clsx';
import Loading from '@/app/loading';
import { useMutation } from '@tanstack/react-query';
import { talent_onboarding_api } from '@/api/actions/talent-onboarding';
import { toast } from 'sonner';
import { useSkipToDashboard } from '@/hooks/use-skip-to-dashboard';

export default function TrackSelection() {
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useRouter();
  const { skipToDashboard } = useSkipToDashboard();

  const setTabs = useTalentOnboardTab((state) => state?.setTabs);

  const handleTrackChange = (trackId: string) => {
    setSelectedTrack(trackId);
    setError('');
  };

  const { data, isLoading } = useTracks();

  const { mutate, isPending } = useMutation({
    mutationKey: ['select_track_onboarding'],
    mutationFn: talent_onboarding_api,
    onSuccess: () => {
      toast.success('Skills saved!');
      navigate.push('/onboarding/talent?page=portfolio');
      setTabs('portfolio');
    },
  });

  const handleSubmit = () => {
    if (!selectedTrack) {
      setError('Please select a track');
      return;
    }
    const formData = new FormData();
    formData.append('track_id', selectedTrack);
    mutate(formData);
  };

  return (
    <div className="w-[90%] max-w-6xl mx-auto py-24 relative">
      <BackButton />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 lg:text-4xl">
          Select Your Track
        </h1>
        <p className="text-gray-600 lg:text-lg">
          Choose the field that best matches your skill
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 mb-6 md:gap-5 md:gap-y-8">
            {data?.map((track: Tracks) => {
              // const Icon = track.icons;
              const isSelected = selectedTrack === track.id;

              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleTrackChange(track.id)}
                  className={`cursor-pointer relative text-left rounded-xl border-2 p-3 flex flex-col justify-start transition-all hover:shadow bg-white md:p-6 ${
                    isSelected
                      ? 'border-primary-blue bg-blue-50 shadow'
                      : 'border-gray-100/25 hover:border-primary-blue'
                  }`}
                >
                  {isSelected ? (
                    <div className="absolute top-7 right-5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute top-7 right-5 w-5 h-5 bg-transparent border border-gray-100/35 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`w-11 h-11 rounded-lg ${track.color} flex items-center justify-center mb-4`}
                  >
                    {/* <Icon
                      className={clsx(
                        'w-5 h-5',
                        track.id === 'mobile' ? 'rotate-180' : '',
                      )}
                    /> */}
                  </div>

                  <h3 className="font-semibold text-[#343330] md:mb-2 text-base md:text-2xl">
                    {track.name}
                  </h3>

                  <p className="hidden text-[#343330] leading-relaxed font-dm_sans md:block">
                    {track.description}
                  </p>
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-3">
            {selectedTrack && (
              <Button
                variant={'default'}
                onClick={handleSubmit}
                size={'sm'}
                className="w-full md:w-88"
              >
                {isPending ? 'Saving...' : 'Continue'}
              </Button>
            )}

            <Button
              variant={'link'}
              onClick={() => skipToDashboard('/talent/dashboard')}
              className="mt-5 text-primary-blue font-medium text-lg hover:text-primary-blue/60 transition-colors"
            >
              Complete Later
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
