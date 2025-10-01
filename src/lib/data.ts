import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BadgeProps } from '@/components/ui/badge';
import { MessageSquare, Paperclip } from 'lucide-react';

export type Comment = {
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
};

export type Attachment = {
  name: string;
  url: string;
  type: 'PDF' | 'Image' | 'Document';
};

export type Task = {
  id: string;
  title: string;
  assignee: string;
  team: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
  description: string;
  comments: Comment[];
  attachments: Attachment[];
};

export const tasks: Task[] = [
  {
    id: 'TASK-8782',
    title: 'Draft Q3 financial report for management review.',
    assignee: 'Sarah Lee',
    team: 'Finance',
    status: 'In Progress',
    dueDate: '2024-08-15',
    description: 'Prepare the quarterly financial report, including revenue analysis, expense breakdown, and profit margins. The draft needs to be ready for the management review meeting next week.',
    comments: [
      { author: 'Jane Doe', avatar: PlaceHolderImages.find(i => i.id === 'avatar-manager')?.imageUrl || '', timestamp: '2 hours ago', text: 'Sarah, please ensure you include the year-over-year growth comparison.' },
      { author: 'Sarah Lee', avatar: PlaceHolderImages.find(i => i.id === 'avatar-1')?.imageUrl || '', timestamp: '1 hour ago', text: 'Will do, Jane. I\'m on it.' },
    ],
    attachments: [
      { name: 'Q2_Financials.pdf', url: '#', type: 'PDF' },
      { name: 'Expense_Guidelines.docx', url: '#', type: 'Document' },
    ],
  },
  {
    id: 'TASK-7878',
    title: 'Finalize the new citizen portal UI mockups.',
    assignee: 'Kenji Tanaka',
    team: 'IT',
    status: 'In Progress',
    dueDate: '2024-08-05',
    description: 'Complete the high-fidelity UI mockups for the new citizen portal project. The design should be responsive and accessible, following the latest government design standards.',
    comments: [],
    attachments: [
        { name: 'Wireframes_v2.jpg', url: '#', type: 'Image' },
    ],
  },
  {
    id: 'TASK-4582',
    title: 'Review and approve budget proposals from all departments.',
    assignee: 'Jane Doe',
    team: 'Management',
    status: 'Pending',
    dueDate: '2024-07-30',
    description: 'Review the submitted budget proposals for the upcoming fiscal year. Check for alignment with strategic goals and financial viability. Provide feedback or approval for each proposal.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-3210',
    title: 'Organize the annual inter-departmental training workshop.',
    assignee: 'David Chen',
    team: 'HR',
    status: 'Completed',
    dueDate: '2024-07-20',
    description: 'The annual training workshop has been successfully organized. All sessions were completed, and feedback from participants has been collected for review.',
    comments: [],
    attachments: [
      { name: 'Final_Agenda.pdf', url: '#', type: 'PDF' },
    ],
  },
  {
    id: 'TASK-5432',
    title: 'Deploy security patch to all public-facing servers.',
    assignee: 'Maria Rodriguez',
    team: 'IT',
    status: 'Completed',
    dueDate: '2024-07-22',
    description: 'Security patch XYZ has been successfully deployed across all production servers. System monitoring shows no issues post-deployment.',
    comments: [],
    attachments: [],
  },
    {
    id: 'TASK-6891',
    title: 'Conduct field survey for the new infrastructure project.',
    assignee: 'Fatima Al-Fassi',
    team: 'Field Operations',
    status: 'In Progress',
    dueDate: '2024-08-25',
    description: 'Begin the field survey in the designated area for the upcoming infrastructure project. Data collection on soil quality and existing utilities is the primary focus.',
    comments: [],
    attachments: [],
  },
];

export const productivityData = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 72 },
    { week: 'Week 3', score: 70 },
    { week: 'Week 4', score: 78 },
    { week: 'Week 5', score: 82 },
    { week: 'Week 6', score: 85 },
];

export type BadgeType = {
  name: string;
  variant: BadgeProps['variant'];
}

export type LeaderboardUser = {
  name: string;
  title: string;
  points: number;
  avatar: string | undefined;
  badges: BadgeType[];
}

export const leaderboard: LeaderboardUser[] = [
  { name: 'Sarah Lee', title: 'Finance Analyst', points: 1250, avatar: PlaceHolderImages.find(i => i.id === 'avatar-1')?.imageUrl, badges: [{name: 'Achiever', variant: 'default'}, {name: 'Pro', variant: 'secondary'}] },
  { name: 'David Chen', title: 'HR Coordinator', points: 1180, avatar: PlaceHolderImages.find(i => i.id === 'avatar-2')?.imageUrl, badges: [{name: 'Rising Star', variant: 'outline'}] },
  { name: 'Maria Rodriguez', title: 'System Administrator', points: 1120, avatar: PlaceHolderImages.find(i => i.id === 'avatar-3')?.imageUrl, badges: [{name: 'Achiever', variant: 'default'}] },
  { name: 'Kenji Tanaka', title: 'UI/UX Designer', points: 1050, avatar: PlaceHolderImages.find(i => i.id === 'avatar-4')?.imageUrl, badges: [{name: 'Pro', variant: 'secondary'}] },
  { name: 'Fatima Al-Fassi', title: 'Field Officer', points: 980, avatar: PlaceHolderImages.find(i => i.id === 'avatar-5')?.imageUrl, badges: [] },
];
