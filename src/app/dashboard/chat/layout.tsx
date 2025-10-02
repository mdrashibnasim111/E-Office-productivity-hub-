import type { ReactNode } from 'react';

// This layout prevents the default dashboard layout from wrapping the chat page.
export default function ChatLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
