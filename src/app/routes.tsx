import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import {
  DiscoveryHome,
  EventDetails,
  CreateEvent,
  LockerRoom,
  NotFound,
} from './screens';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: DiscoveryHome },
      { path: 'event/:id', Component: EventDetails },
      { path: 'create', Component: CreateEvent },
      { path: 'locker-room/:id', Component: LockerRoom },
      { path: '*', Component: NotFound },
    ],
  },
]);