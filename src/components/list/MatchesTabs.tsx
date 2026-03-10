'use client';

import { likeTabs } from '@/utils/tabs'
import { Member } from '@/utils/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react'
import { Button } from '../ui/Button';


type Props = {
  members: Member[]
  likedIds: string[]
}


export const MatchesTabs = ({ members, likedIds }: Props) => {

  const [activeTab, setActiveTab] = useState("sent");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  const handleChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', tab.toString());
    router.replace(`${pathname}?${params.toString()}`);

    setActiveTab(tab);

  };



  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 ">
        {likeTabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <Button
              key={tab.id}
              label={tab.label}
              variant={'solid'}
              active={active}
              onClick={() => handleChange(tab.id)}
            />
          );
        })}
      </div>
    </div>
  );
}