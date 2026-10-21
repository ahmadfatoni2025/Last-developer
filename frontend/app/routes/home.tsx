import type { Route } from './+types/home';
import { Leam } from '../leam/leam';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'leam — Create your Universe' },
    { name: 'description', content: 'leam — Live rooms and community chat with tickets, subscriptions, NFTs, and more.' },
  ];
}

export default function Home() {
  return <Leam />;
}
