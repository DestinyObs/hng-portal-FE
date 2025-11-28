export const TERMS_OF_SERVICE_SECTIONS = [
  { id: '#introduction', label: 'Introduction' },
  { id: '#eligibility', label: 'Eligibility' },
  { id: '#user-accounts', label: 'User accounts' },
  { id: '#user-obligations', label: 'User obligations' },
  { id: '#verification', label: 'Verification' },
  { id: '#content-ownership', label: 'Content ownership' },
  { id: '#platform-rights', label: 'Platform rights' },
  { id: '#company-use', label: 'Company use' },
  { id: '#prohibited-actions', label: 'Prohibited actions' },
  { id: '#liability', label: 'Liability' },
  { id: '#termination', label: 'Termination' },
  { id: '#updates-to-terms', label: 'Updates to terms' },
];

export const TERMS_OF_SERVICE_CONTENT = [
  {
    id: '1',
    title: 'Introduction',
    sectionId: 'introduction',
    subtitle:
      'These terms govern the use of HNG Connect. Users agree to follow these rules when creating profiles, accessing features, or using any service linked to the connect. These terms apply to talents, companies, and all visitors.',
  },
  {
    id: '2',
    title: 'Eligibility',
    sectionId: 'eligibility',
    subtitle:
      'Users must provide correct information during registration. False details lead to loss of access. Users must hold full rights to any content they upload.',
  },
  {
    id: '3',
    title: 'User Account',
    sectionId: 'user-accounts',

    subtitle:
      'Users create an account with personal information, work history, and other profile details. Users keep login details secure and accept full responsibility for actions taken through their account. HNG Connect holds the right to restrict or end access if misuse appears.',
  },
  {
    id: '4',
    title: 'User Obligation',
    sectionId: 'user-obligations',

    subtitle:
      'Users share accurate work history, skills, and HNG involvement. Users upload content they own or have rights to share. Users avoid harmful activity, including attempts to breach security, disrupt services, spread malware, or impersonate others.',
  },
  {
    id: '5',
    title: 'Verification',
    sectionId: 'verification',

    subtitle:
      'HNG Connect verifies internship history for users who joined HNG at any stage. Verification improves trust signals and visibility. Users give permission for checks linked to their HNG history. The connect holds the right to reject or remove verification if records look false.',
  },
  {
    id: '6',
    title: 'Content Ownership',
    sectionId: 'content-ownership',

    subtitle:
      'Users keep ownership of content they upload. Users grant HNG Connect a licence to display, store, and use uploaded content for platform features. This licence ends when content is removed, except where copies remain in backup systems for a limited period',
  },
  {
    id: '7',
    title: 'Platform rights',
    sectionId: 'platform-rights',

    subtitle:
      'HNG Connect updates, improves, or removes features without notice. Service interruptions or maintenance windows might appear from time to time. The connect holds the right to limit or suspend accounts linked to harmful behaviour.',
  },
  {
    id: '8',
    title: 'Company use',
    sectionId: 'company-use',

    subtitle:
      'Companies must post accurate role details and respect privacy rules. Companies avoid misleading tasks, unsafe hiring practices, or harassment. Misuse leads to account restriction.',
  },
  {
    id: '9',
    title: 'Prohibited actions',
    sectionId: 'prohibited-actions',

    subtitle: (
      <div>
        Users must avoid:
        <ul className="text-[#9C9C9C] list-disc pl-6">
          <li>Uploading harmful files</li>
          <li>Sharing false identity details</li>
          <li>Scraping data</li>
          <li>Attempting unauthorised access</li>
          <li>Harrassing other users</li>
          <li>Posting illegal content</li>
          <li>Sharing confidential details they have no rights to release</li>
        </ul>
      </div>
    ),
  },
  {
    id: '10',
    title: 'Liability',
    sectionId: 'liability',

    subtitle:
      'HNG Connect holds the right to end or restrict access if these terms are broken. Users can end their account at any time through settings.',
  },
  {
    id: '11',
    title: 'Termination',
    sectionId: 'termination',

    subtitle:
      'HNG Connect holds the right to end or restrict access if these terms are broken. Users can end their account at any time through settings.',
  },
  {
    id: '12',
    title: 'Update to terms',
    sectionId: 'updates-to-terms',

    subtitle:
      'HNG Connect updates these terms when needed. Continued use of the platform signals agreement with updated terms.',
  },
];
