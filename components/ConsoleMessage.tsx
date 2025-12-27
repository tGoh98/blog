'use client';

import { useEffect } from 'react';

export default function ConsoleMessage() {
  useEffect(() => {
    console.log('What are you doing poking around in here?');
    console.log('( ━☞´◔‿ゝ◔`)━☞');
    console.log('There\'s nothing here right now, but perhaps one day there will be 🚩🎏');
  }, []);

  return null;
}
