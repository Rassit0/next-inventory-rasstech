import Image from 'next/image';
import React from 'react';
import { UserRole } from '../../interfaces/role.interface';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

interface GroupUsersProps {
  maxVisible?: number;
  users: UserRole[];
}

export const GroupUsers: React.FC<GroupUsersProps> = ({
  maxVisible = 3,
  users = [],
}) => {
  const totalUsers = users.length;
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = totalUsers - maxVisible;

  return (
    <div className="flex flex-row">
      {visibleUsers.map((user, index) => (
        <div
          key={user.id}
          className="relative shrink-0 rounded-full border-1.5 border-white bg-white"
          style={{
            width: '36px',
            height: '36px',
            marginRight: index !== visibleUsers.length - 1 ? '-8px' : '0',
            zIndex: index + 1,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={36}
                height={36}
                className="min-h-full min-w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-medium text-gray-600">
                {getInitials(user.name)}
              </div>
            )}
          </div>
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="relative shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 border-1.5 border-white"
          style={{
            width: '36px',
            height: '36px',
            marginRight: '0',
            marginLeft: '-10px',
            zIndex: visibleUsers.length + 1,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
