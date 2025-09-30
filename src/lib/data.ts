import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Task = {
  id: string;
  title: string;
  assignee: string;
  team: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
};

export const tasks: Task[] = [
  {
    id: 'TASK-8782',
    title: 'Draft Q3 financial report for management review.',
    assignee: 'Sarah Lee',
    team: 'Finance',
    status: 'In Progress',
    dueDate: '2024-08-15',
  },
  {
    id: 'TASK-7878',
    title: 'Finalize the new citizen portal UI mockups.',
    assignee: 'Kenji Tanaka',
    team: 'IT',
    status: 'In Progress',
    dueDate: '2024-08-05',
  },
  {
    id: 'TASK-4582',
    title: 'Review and approve budget proposals from all departments.',
    assignee: 'Jane Doe',
    team: 'Management',
    status: 'Pending',
    dueDate: '2024-07-30',
  },
  {
    id: 'TASK-3210',
    title: 'Organize the annual inter-departmental training workshop.',
    assignee: 'David Chen',
    team: 'HR',
    status: 'Completed',
    dueDate: '2024-07-20',
  },
  {
    id: 'TASK-5432',
    title: 'Deploy security patch to all public-facing servers.',
    assignee: 'Maria Rodriguez',
    team: 'IT',
    status: 'Completed',
    dueDate: '2024-07-22',
  },
    {
    id: 'TASK-6891',
    title: 'Conduct field survey for the new infrastructure project.',
    assignee: 'Fatima Al-Fassi',
    team: 'Field Operations',
    status: 'In Progress',
    dueDate: '2024-08-25',
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

export type LeaderboardUser = {
  name: string;
  title: string;
  points: number;
  avatar: string | undefined;
}

export const leaderboard: LeaderboardUser[] = [
  { name: 'Sarah Lee', title: 'Finance Analyst', points: 1250, avatar: PlaceHolderImages.find(i => i.id === 'avatar-1')?.imageUrl },
  { name: 'David Chen', title: 'HR Coordinator', points: 1180, avatar: PlaceHolderImages.find(i => i.id === 'avatar-2')?.imageUrl },
  { name: 'Maria Rodriguez', title: 'System Administrator', points: 1120, avatar: PlaceHolderImages.find(i => i.id === 'avatar-3')?.imageUrl },
  { name: 'Kenji Tanaka', title: 'UI/UX Designer', points: 1050, avatar: PlaceHolderImages.find(i => i.id === 'avatar-4')?.imageUrl },
  { name: 'Fatima Al-Fassi', title: 'Field Officer', points: 980, avatar: PlaceHolderImages.find(i => i.id === 'avatar-5')?.imageUrl },
];
