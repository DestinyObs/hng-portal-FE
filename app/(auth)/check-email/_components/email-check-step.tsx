import { EmailCheckStepCardProps } from '@/types/auth';

export function EmailCheckStepCard({
  icon: Icon,
  title,
  description,
}: EmailCheckStepCardProps) {
  return (
    <div className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
