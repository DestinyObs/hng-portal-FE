import {
  Tabs as TabsUI,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card } from '../../ui/card';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type TabsProps = {
  tabs: {
    value: string;
    tabsName: string;
    TabView: React.ComponentType;
  }[];
  variant?: 'pills' | 'tabs' | null | undefined;
};

const tabStyles = cva(
  '*:data-[state=active]:shadow-none *:data-[state=active]:outline-0 transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]',
  {
    variants: {
      variant: {
        // box
        pills: cn(
          'bg-gray-50 *:bg-transparent *:hover:text-primary-blue p-0.5 shadow-none shadow-0 rounded-xs h-11 *:rounded-xs *:data-[state=active]:bg-background ',
        ),

        // tabs
        tabs: cn(
          'bg-transparent *:border-b-2  *:border-b-[#9A9A98] gap-3',
          'p-0.5 shadow-none  h-11',
          '*:rounded-none *:px-3 *:data-[state=active]:border-b-primary-blue *:hover:text-primary-blue *:data-[state=active]:bg-background',
        ),
      },
    },
    defaultVariants: { variant: 'tabs' },
  },
);

export function Tabs({ tabs, variant }: TabsProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <TabsUI defaultValue={tabs[0]?.value}>
        {/*  Tab Buttons*/}
        <TabsList className={cn(tabStyles({ variant }))}>
          {tabs.map(({ value, tabsName }, index) => (
            <TabsTrigger
              className={cn('group text-base font-open-sans px-5')}
              key={index}
              value={value}
            >
              {tabsName}
              <span className="px-2 group-hover:bg-primary-blue group-data-[state=active]:bg-primary-blue bg-[#9A9A98] text-white rounded-[3px]">
                {'0' + (index + 1)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/*  Tab Content Panels  */}
        {tabs.map(({ value, TabView }) => (
          <TabsContent key={value} value={value}>
            <Card>
              <TabView />
            </Card>
          </TabsContent>
        ))}
      </TabsUI>
    </div>
  );
}
