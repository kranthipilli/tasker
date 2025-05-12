'use client';

import { useEffect, useState } from 'react';
import TaskBoard from '@/components/TaskBoard';

export default function TaskBoardClient() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Prevent hydration mismatch

  return <TaskBoard />;
}
