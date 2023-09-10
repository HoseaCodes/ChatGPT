"use client"
import { requireAdminRole, requireUserLoggedIn } from '../../utils/auth/helpers';
import { authOptions } from '../../utils/auth/options';
import { NavbarItem } from './(components)/components';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { UserAuth } from '../authContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await requireUserLoggedIn();
  // await requireAdminRole();
    const { user } = UserAuth();
  // const { user } = await getServerSession(authOptions);

  return (
    <div className='flex h-full w-full flex-row'>
      <div className='flex h-full min-h-screen w-[232px] shrink-0 flex-col justify-between justify-between border-r border-zinc-200 px-6 py-8'>
        <div className='flex flex-col gap-2'>
          <div className='px-2 pb-6'>
            <img src='/vercel.svg' className='h-8 w-8' />
          </div>
          <NavbarItem href='/admin' text='Overview' />
          <NavbarItem href='/admin/users' text='Users' />
          <NavbarItem href='/admin/subscriptions' text='Subscriptions' />
          <NavbarItem href='/admin/roles' text='Roles' />
        </div>
        <Link
          href='/dashboard/settings'
          className='flex items-center gap-2 rounded-md px-2 py-1 duration-150 hover:bg-neutral-100'
        >
          <p className='w-fit rounded-sm bg-rose-100 px-2 py-1 text-xs font-medium text-rose-500'>
            ADMIN
          </p>
          <p className='truncate text-sm'>{user.email}</p>
        </Link>
      </div>
      <div className='h-full max-h-[98vh] w-full overflow-y-auto'>
        <div className='mx-auto mt-12 flex w-full max-w-6xl flex-row px-4 py-6'>
          {children}
        </div>
      </div>
    </div>
  );
}
