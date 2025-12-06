import Image from 'next/image';
import React from 'react';

interface GroupUsersProps {
  maxVisible?: number;
  users?: Array<{
    id: string | number;
    image: string;
    name: string;
  }>;
}

export const GroupUsers: React.FC<GroupUsersProps> = ({
  maxVisible = 3,
  users = [
    { id: 1, image: '/images/users/user_1.png', name: 'User 1' },
    { id: 2, image: '/images/users/user_2.png', name: 'User 2' },
    { id: 3, image: '/images/users/user_3.png', name: 'User 3' },
    { id: 4, image: '/images/users/user_4.png', name: 'User 4' },
  ],
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
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="min-h-full min-w-full object-cover"
            />
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
