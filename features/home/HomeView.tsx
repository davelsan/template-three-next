'use client';

import { DogView } from './DogView';
import { DuckView } from './DuckView';
import { LogoView } from './LogoView';

export function HomeView() {
  return (
    <div className="flex w-full flex-col px-40 py-12">
      <LogoView />
      <DogView />
      <DuckView />
    </div>
  );
}
