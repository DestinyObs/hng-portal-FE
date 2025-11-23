import { Badge } from '@/components/ui/badge';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="inline-block mb-4">
        <Badge className="bg-white text-primary-blue px-4 py-2 rounded-full text-caption font-medium border border-primary-blue">
          How it Works
        </Badge>
      </div>
      <h2 className="text-h3 font-bold text-gray-900 mb-4">
        Simple Steps To Get You Moving Forward
      </h2>
      <p className="text-h5 text-gray-600 max-w-4xl mx-auto">
        A simple, transparent workflow that helps talents get discovered and recruiters hire with confidence
      </p>
    </div>
  );
}