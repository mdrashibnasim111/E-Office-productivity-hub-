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
    description: 'Prepare the quarterly financial report, including revenue analysis, expense breakdown, and profit margins. The draft needs to be ready for the management review meeting next week. Urgent.',
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
    description: 'Review the submitted budget proposals for the upcoming fiscal year. Check for alignment with strategic goals and financial viability. Provide feedback or approval for each proposal. Urgent.',
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
  {
    id: 'TASK-1122',
    title: 'Process vendor payments for Q2.',
    assignee: 'Sarah Lee',
    team: 'Finance',
    status: 'Completed',
    dueDate: '2024-06-30',
    description: 'All vendor invoices for the second quarter have been processed and payments have been dispatched.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-1123',
    title: 'Update employee handbook with new remote work policy.',
    assignee: 'David Chen',
    team: 'HR',
    status: 'Completed',
    dueDate: '2024-07-01',
    description: 'The employee handbook has been updated to include the revised remote work policy and distributed to all staff.',
    comments: [],
    attachments: [{ name: 'EmployeeHandbook_v3.pdf', url: '#', type: 'PDF' }],
  },
  {
    id: 'TASK-1124',
    title: 'Migrate database from on-prem to cloud.',
    assignee: 'Maria Rodriguez',
    team: 'IT',
    status: 'Completed',
    dueDate: '2024-07-15',
    description: 'The main operational database has been successfully migrated to the new cloud infrastructure. All services are running smoothly.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-1125',
    title: 'Create social media graphics for public health campaign.',
    assignee: 'Kenji Tanaka',
    team: 'IT',
    status: 'Completed',
    dueDate: '2024-07-18',
    description: 'A set of engaging graphics has been created for the upcoming social media campaign on public health awareness.',
    comments: [],
    attachments: [{ name: 'Campaign_Graphics.zip', url: '#', type: 'Image' }],
  },
  {
    id: 'TASK-1126',
    title: 'Analyze citizen feedback from the last town hall.',
    assignee: 'Fatima Al-Fassi',
    team: 'Field Operations',
    status: 'Completed',
    dueDate: '2024-07-19',
    description: 'Feedback from the recent town hall has been analyzed, and a summary report with key concerns has been prepared.',
    comments: [],
    attachments: [{ name: 'TownHall_Feedback_Summary.docx', url: '#', type: 'Document' }],
  },
  {
    id: 'TASK-1127',
    title: 'Reconcile monthly bank statements.',
    assignee: 'Sarah Lee',
    team: 'Finance',
    status: 'Completed',
    dueDate: '2024-07-05',
    description: 'June\'s bank statements have been reconciled with internal financial records. No discrepancies found.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-1128',
    title: 'Schedule Q3 performance reviews.',
    assignee: 'David Chen',
    team: 'HR',
    status: 'Completed',
    dueDate: '2024-07-10',
    description: 'Performance review meetings for all employees have been scheduled on the company calendar for the third quarter.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-1129',
    title: 'Perform routine server maintenance.',
    assignee: 'Maria Rodriguez',
    team: 'IT',
    status: 'Completed',
    dueDate: '2024-07-12',
    description: 'Scheduled monthly maintenance on all servers has been completed, including software updates and security checks.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-1130',
    title: 'Design a new logo for the "Clean City" initiative.',
    assignee: 'Kenji Tanaka',
    team: 'IT',
    status: 'Completed',
    dueDate: '2024-07-14',
    description: 'Several logo concepts for the "Clean City" initiative have been designed and submitted for review.',
    comments: [],
    attachments: [],
  },
  {
    id: 'TASK-1131',
    title: 'Prepare equipment for the upcoming field survey.',
    assignee: 'Fatima Al-Fassi',
    team: 'Field Operations',
    status: 'Completed',
    dueDate: '2024-07-25',
    description: 'All necessary equipment for the infrastructure project field survey has been checked and prepared for deployment.',
    comments: [],
    attachments: [],
  }
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
  id: string;
  name: string;
  title: string;
  points: number;
  avatar: string | undefined;
  badges: BadgeType[];
  team?: string;
}

export const leaderboard: LeaderboardUser[] = [
  { id: 'user-001', name: 'Ethan Carter', title: 'Finance Analyst', points: 1250, avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=2521&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badges: [{name: 'Achiever', variant: 'default'}, {name: 'Pro', variant: 'secondary'}], team: 'Team Alpha' },
  { id: 'user-002', name: 'Olivia Bennett', title: 'HR Coordinator', points: 1180, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badges: [{name: 'Rising Star', variant: 'outline'}], team: 'Team Beta' },
  { id: 'user-003', name: 'Noah Thompson', title: 'System Administrator', points: 1120, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badges: [{name: 'Achiever', variant: 'default'}], team: 'Team Alpha' },
  { id: 'user-004', name: 'Ava Harper', title: 'UI/UX Designer', points: 1050, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badges: [{name: 'Pro', variant: 'secondary'}], team: 'Team Gamma' },
  { id: 'user-005', name: 'Fatima Al-Fassi', title: 'Field Officer', points: 980, avatar: PlaceHolderImages.find(i => i.id === 'avatar-5')?.imageUrl, badges: [], team: 'Team Beta' },
];

export type Team = {
  name: string;
  totalPoints: number;
  progress: number;
  avatar: string;
  sharedBadges: { name: string; icon: string }[];
};

export const teamRankings: Team[] = [
  {
    name: 'Team Alpha',
    totalPoints: 2500,
    progress: 75,
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sharedBadges: [
      { name: 'Task Master', icon: 'task_alt' },
      { name: 'Collaboration Champion', icon: 'groups' },
    ],
  },
  {
    name: 'Team Beta',
    totalPoints: 2100,
    progress: 60,
    avatar: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sharedBadges: [{ name: 'Deadline Dominator', icon: 'timer' }],
  },
  {
    name: 'Team Gamma',
    totalPoints: 1950,
    progress: 50,
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sharedBadges: [{ name: 'Efficiency Experts', icon: 'speed' }],
  },
];


export type Goal = {
  id: string;
  title: string;
  description: string;
  progress: number; // Percentage
  deadline: string;
};

export const teamGoals: Goal[] = [
    { id: 'goal-team-1', title: 'Improve Citizen Satisfaction Score by 5%', description: 'Implement feedback mechanisms and reduce response times.', progress: 75, deadline: '2024-09-30' },
    { id: 'goal-team-2', title: 'Reduce Departmental Budget Variance to < 2%', description: 'Enhance budget tracking and enforce stricter spending controls.', progress: 50, deadline: '2024-12-31' },
    { id: 'goal-team-3', title: 'Launch New Digital Service Portal', description: 'Complete development, testing, and launch of the new portal for citizen services.', progress: 30, deadline: '2024-11-15' },
];

export const individualGoals: (Goal & { assignee: string })[] = [
    { id: 'goal-ind-1', title: 'Complete Advanced Project Management Certification', assignee: 'Sarah Lee', progress: 80, deadline: '2024-08-31' },
    { id: 'goal-ind-2', title: 'Master New UI/UX Design Software', assignee: 'Kenji Tanaka', progress: 60, deadline: '2024-09-15' },
    { id: 'goal-ind-3', title: 'Improve Public Speaking Skills', assignee: 'David Chen', progress: 90, deadline: '2024-08-20' },
    { id: 'goal-ind-4', title: 'Automate a Manual Reporting Process', assignee: 'Maria Rodriguez', progress: 45, deadline: '2024-10-10' },
    { id: 'goal-ind-5', title: 'Conduct 20 Successful Field Audits', assignee: 'Fatima Al-Fassi', progress: 70, deadline: '2024-09-30' },
].map(g => ({...g, description: `Assigned to ${g.assignee}`}));
