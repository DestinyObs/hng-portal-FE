'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Import Image component
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactUsPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-[linear-gradient(92.78deg,_#EDF9FF_41.88%,_#CFD3FF_98.18%)] pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-us-hero-img.png"
            alt="Contact Us Hero"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative container mx-auto flex justify-center items-end min-h-[50vh] z-10">
          <div className="flex flex-col lg:flex-row items-end gap-8 w-full max-w-6xl">
            <div className="lg:w-1/2 text-center lg:text-left pb-20">
              <div className="inline-block px-4 py-2 rounded-[20px] bg-white text-black border border-primary-blue text-sm font-semibold uppercase tracking-wider">
                Contact us
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mt-2 mb-4">
                Hello. <br /> What can we help you with today?
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Do you have questions, require hands-on help or would you like
                to make inquiries? Contact our support team or read through our
                FAQs.
              </p>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/images/contact-us-img.png"
                alt="Cityscape"
                width={500}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Contact Us
          </h2>
          <div className="bg-white p-8 rounded-lg w-full max-w-3xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-left">
                  <Label htmlFor="name">Full Name (Surname First)</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div className="text-left">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="text-left">
                <Label htmlFor="message">What&apos;s your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Hello! I'm looking to bring talent onto my next project, but I'm not entirely sure how the process works."
                  rows={6}
                  className="mt-1 h-[300px]"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto min-w-[350px]"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
