'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Welcome = () => {
  const navigate = useRouter();

  return (
    <div className="w-[90%] mx-auto md:w-3/5 lg:w-1/2 min-h-screen h-full flex justify-center items-center">
      <section className="text-center flex flex-col items-center justify-center w-full">
        <h1 className="text-5xl text-primary-blue mb-5">[ ]</h1>
        <h1 className="text-4xl font-bold">
          Welcome to <br className="md:hidden" />{' '}
          <span className="text-primary-blue">HNG Portal</span>
        </h1>
        <p className="text-[#60646E] my-4">
          Let&apos;s set up your professional profile so companies can discover
          you.
        </p>
        <div className="w-full flex flex-col gap-3 mt-4 lg:w-[45%]">
          <Button
            variant={'default'}
            size={'sm'}
            onClick={() => navigate.push('/onboarding/talent?page=profile')}
            className="font-normal"
          >
            Set Up Profile
          </Button>
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => navigate.push('/dashboard')}
            className="font-normal bg-primary-50 text-primary-blue hover:bg-primary-50"
          >
            Skip to Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
};
export default Welcome;
