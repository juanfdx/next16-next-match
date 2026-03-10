'use client';

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// utils
import { likeTabs } from '@/utils/tabs'
// components
import { Button } from '../ui/Button';



export const MatchesTabs = () => {

  const [activeTab, setActiveTab] = useState('source');
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
      <div className="flex flex-col sm:flex-row gap-2">
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