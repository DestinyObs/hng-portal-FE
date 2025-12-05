// 'use client';

// import React from 'react';
// import { Search, ListFilter, ChevronDown, Trash } from 'lucide-react';
// import { columns, Applicant } from '@/components/shared/applicants-column';
// import { DataTable } from '@/components/shared/ui/data-table';

// const applicantsData: Applicant[] = [
//   {
//     id: '1',
//     name: 'Mark Essien',
//     email: 'markessien@gmail.com',
//     applied_role: 'Visual Designer',
//     status: 'Hired',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '2',
//     name: 'Chinedu Okeke',
//     email: 'markessien@gmail.com',
//     applied_role: 'Visual Designer',
//     status: 'Interviewd',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '3',
//     name: 'Folajomi',
//     email: 'markessien@gmail.com',
//     applied_role: 'Visual Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
//   {
//     id: '4',
//     name: 'Wade Warren',
//     email: 'markessien@gmail.com',
//     applied_role: 'Visual Designer',
//     status: 'Shortlisted',
//     applied_date: 'Jan 25, 2025',
//   },
// ];

// export default function Candidatelists() {
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [showFilters, setShowFilters] = React.useState(false);

//   const [selectedRole, setSelectedRole] = React.useState<string>('');
//   const [selectedStatus, setSelectedStatus] = React.useState<string>('');
//   const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

//   const statuses = ['Shortlisted', 'Interviewed', 'Hired'];

//   const statusTextStyles: Record<string, string> = {
//     Shortlisted: 'text-[#3730A3] bg-light-blue',
//     Interviewed: 'text-[#0369A1] bg-[#E0F2FE] ',
//     Hired: 'text-[#037847] bg-[#ECFDF3]',
//   };

//   const statusDotStyles: Record<string, string> = {
//     Shortlisted: 'bg-[#3730A3]',
//     Interviewed: 'bg-[#0369A1]',
//     Hired: 'bg-[#14BA6D]',
//   };

//   const filteredData = React.useMemo(() => {
//     let filtered = applicantsData;

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (applicant) =>
//           applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           applicant.email.includes(searchQuery) ||
//           applicant.applied_role
//             ?.toLowerCase()
//             .includes(searchQuery.toLowerCase()),
//       );
//     }

//     if (selectedRole) {
//       filtered = filtered.filter((a) => a.applied_role === selectedRole);
//     }

//     if (selectedStatus) {
//       filtered = filtered.filter((a) => a.status === selectedStatus);
//     }

//     return filtered;
//   }, [searchQuery, selectedRole, selectedStatus]);

//   return (
//     <div className="w-full min-h-screen px-6 py-4">
//       <div className="bg-white p-6 rounded-2xl">
//         <div className="flex items-center justify-between gap-3 mb-4">
//           <div className="relative flex-1 max-w-sm">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-tertiary-100" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full pl-10 pr-4 py-2 border border-tertiary-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <div className="flex gap-4">
//             {showFilters && (
//               <div className="relative">
//                 <div className="flex gap-5 items-center cursor-pointer">
//                   <button
//                     onClick={() =>
//                       setOpenDropdown(
//                         openDropdown === 'status' ? null : 'status',
//                       )
//                     }
//                     className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-tertiary-50 justify-between cursor-pointer"
//                   >
//                     <span className="text-tertiary-500 font-medium">
//                       {selectedStatus || 'Job Status'}
//                     </span>
//                     <ChevronDown className="w-4 h-4 text-[#242533]" />
//                   </button>
//                   <Trash
//                     className="w-4 h-4 text-tertiary-100 cursor-pointer"
//                     onClick={() => {
//                       setShowFilters(!showFilters);
//                       if (showFilters) {
//                         setSelectedRole('');
//                         setSelectedStatus('');
//                       }
//                     }}
//                   />
//                 </div>
//                 {openDropdown === 'status' && (
//                   <div className="absolute right-9 top-12 z-50 mt-1 w-auto p-4 bg-white rounded-lg shadow-lg">
//                     {statuses.map((status) => (
//                       <div
//                         key={status}
//                         className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
//                         onClick={() => {
//                           setSelectedStatus(status);
//                           setOpenDropdown(null);
//                         }}
//                       >
//                         <div
//                           className={`flex items-center gap-2 rounded-2xl w-auto py-0.5 px-2 font-medium text-sm ${statusTextStyles[status]}`}
//                         >
//                           <div
//                             className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[status]}`}
//                           ></div>
//                           <span>{status}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={() => {
//                 setShowFilters(!showFilters);
//                 if (showFilters) {
//                   setSelectedRole('');
//                   setSelectedStatus('');
//                 }
//               }}
//               className="flex items-center gap-2 px-3 py-2 text-sm text-[#344054] border border-tertiary-50 rounded-lg cursor-pointer"
//             >
//               <ListFilter className="w-4 h-4 text-tertiary-100" />
//               {showFilters ? 'Remove Filters' : 'Filters'}
//             </button>
//           </div>
//         </div>

//         <DataTable columns={columns} data={filteredData} />
//       </div>
//     </div>
//   );
// }
