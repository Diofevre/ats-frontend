'use client'

import React from 'react';
import UsersList from './_components/UserList';
import { useParams } from 'next/navigation';

const Users = () => {
  const { id } = useParams();
  const organizationId = Number(id);

  return (
    <div className="min-h-screen">
      <UsersList organizationId={organizationId} />
    </div>
  );
}

export default Users;