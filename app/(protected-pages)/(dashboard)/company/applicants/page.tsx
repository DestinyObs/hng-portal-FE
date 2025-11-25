// // 'use client';

// // import React from 'react';

// // const ApplicantsPage: React.FC = () => {
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Applicants</h1>
// //     </div>
// //   );
// // };

// // export default ApplicantsPage;

// // 'use client';

// // import React from 'react';
// // import { DataTable } from '@/components/shared/ui/data-table';
// // import { columns } from '@/components/shared/ui/data-column';
// // import { Applicant } from '@/components/shared/ui/data-column';

// // const data: Applicant[] = [
// //   {
// //     id: '1',
// //     name: 'Blessing Ubiomor',
// //     verified: true,
// //     phone: '08012345678',
// //     applied_role: 'Frontend Developer',
// //     status: 'Interview',
// //     applied_date: '2025-01-10',
// //   },
// //   {
// //     id: '2',
// //     name: 'John Doe',
// //     verified: false,
// //     phone: '08123456789',
// //     applied_role: 'Product Designer',
// //     status: 'In Review',
// //     applied_date: '2025-01-09',
// //   },
// // ];

// // const ApplicantsPage = () => {
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Applicants</h1>

// //       <DataTable columns={columns} data={data} />
// //     </div>
// //   );
// // };

// // export default ApplicantsPage;

// 'use client';

// import React from 'react';
// import {
//   Search,
//   SlidersHorizontal,
//   Download,
//   ListFilter,
//   CloudDownload,
// } from 'lucide-react';
// import { DataTable } from '@/components/shared/ui/data-table';
// import { columns, Applicant } from '@/components/shared/applicants-column';

// // Sample data
// const applicantsData: Applicant[] = [
//   {
//     id: '1',
//     name: 'Mark Essien',
//     verified: true,
//     phone: '(234) 555-0113',
//     applied_role: 'Visual Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '2',
//     name: 'Chinedu Okeke',
//     verified: true,
//     phone: '(234) 555-0111',
//     applied_role: 'Visual Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '3',
//     name: 'Folajomi',
//     verified: true,
//     phone: '(234) 555-0105',
//     applied_role: 'Visual Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '4',
//     name: 'Emma Brown',
//     verified: false,
//     phone: '(233) 555-0116',
//     applied_role: 'Visual Designer',
//     status: 'In Review',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '5',
//     name: 'Noah Davis',
//     verified: false,
//     phone: '(224) 555-0129',
//     applied_role: 'Visual Designer',
//     status: 'In Review',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '6',
//     name: 'Noah Davis',
//     verified: false,
//     phone: '(224) 555-0129',
//     applied_role: 'Graphics Designer',
//     status: 'In Review',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '7',
//     name: 'Noah Davis',
//     verified: false,
//     phone: '(224) 555-0129',
//     applied_role: 'Graphics Designer',
//     status: 'In Review',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '8',
//     name: 'Emma Brown',
//     verified: false,
//     phone: '(224) 555-0129',
//     applied_role: 'Graphics Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '9',
//     name: 'Noah Davis',
//     verified: false,
//     phone: '(224) 555-0129',
//     applied_role: 'Senior Motion Designer',
//     status: 'In Review',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '10',
//     name: 'Noah Davis',
//     verified: false,
//     phone: '(224) 555-0129',
//     applied_role: 'Senior Motion Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
// ];

// export default function ApplicantsPage() {
//   const [activeTab, setActiveTab] = React.useState('all');
//   const [searchQuery, setSearchQuery] = React.useState('');

//   // Filter data based on search
//   const filteredData = React.useMemo(() => {
//     if (!searchQuery) return applicantsData;

//     return applicantsData.filter(
//       (applicant) =>
//         applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         applicant.phone.includes(searchQuery) ||
//         applicant.applied_role
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         applicant.status.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   }, [searchQuery]);

//   return (
//     <div className="w-full p-6 bg-white-100">
//       {/* Tabs */}
//       <div className="flex gap-8 mb-6">
//         <button
//           className={`pb-3 px-1 font-semibold text-xl transition-colors ${
//             activeTab === 'all' ? 'text-primary-300' : 'text-gray-100'
//           }`}
//           onClick={() => setActiveTab('all')}
//         >
//           All Applicants
//         </button>
//         <button
//           className={`pb-3 px-1 font-semibold text-xl transition-colors ${
//             activeTab === 'lists' ? 'text-primary-300' : 'text-gray-100'
//           }`}
//           onClick={() => setActiveTab('lists')}
//         >
//           Candidates Lists
//         </button>
//       </div>

//       {/* <div className='border border-blue-500 pt-4 px-4'> */}
//         {/* Search and Actions */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full pl-10 pr-4 py-2 border border-tertiary-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 cursor-pointer text-[#344054]">
//               <ListFilter className="w-4 h-4" />
//               Filters
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 text-[#344054] border border-[#D0D5DD] rounded-lg cursor-pointer">
//               <CloudDownload className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>

//         {/* Data Table */}
//         <DataTable columns={columns} data={filteredData} />
//       {/* </div> */}
//     </div>
//   );
// }

'use client';

import React from 'react';
import { Search, ListFilter, ChevronDown, Trash } from 'lucide-react';
import { columns, Applicant } from '@/components/shared/applicants-column';
import { DataTable } from '@/components/shared/ui/data-table';
import { Tabs } from '@/components/shared/ui/tabs';
import Header from '@/components/landing-page/how-it-works/Header';
import Footer from '@/components/shared/ui/footer';
import AllApplicants from './all-applicants';
import Candidatelists from './candidate-lists';

export default function ApplicantsPage() {
  const tabsData = [
    { value: 'all', tabsName: 'All Applicants', TabView: AllApplicants },
    { value: 'lists', tabsName: 'Candidates List', TabView: Candidatelists },
  ];

  return (
    <div className="w-full min-h-screen px-6 py-4">
      {/* Tabs */}
      {/* <div className="flex gap-8 mb-6">
        <button
          className={`pb-3 px-1 font-semibold text-xl cursor-pointer ${
            activeTab === 'all' ? 'text-primary-300' : 'text-gray-100'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Applicants
        </button>

        <button
          className={`pb-3 px-1 font-semibold text-xl cursor-pointer ${
            activeTab === 'lists' ? 'text-primary-300' : 'text-gray-100'
          }`}
          onClick={() => setActiveTab('lists')}
        >
          Candidates Lists
        </button>
      </div> */}

      <Tabs tabs={tabsData} variant="ghost" />
    </div>
  );
}
