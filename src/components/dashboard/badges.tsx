import { Badge, BadgeProps } from '@/components/ui/badge';
import type { BadgeType } from '@/lib/data';

interface BadgesProps {
  badges: BadgeType[];
}

export function Badges({ badges }: BadgesProps) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {badges.map((badge) => (
        <Badge key={badge.name} variant={badge.variant}>
          {badge.name}
        </Badge>
      ))}
    </div>
  );
}
