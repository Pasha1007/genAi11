import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { MeetingListPage } from './pages/MeetingListPage';
import { MeetingDetailPage } from './pages/MeetingDetailPage';
import { MeetingNewPage } from './pages/MeetingNewPage';
import { MeetingEditPage } from './pages/MeetingEditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'meetings',
        element: <MeetingListPage />,
      },
      {
        path: 'meetings/new',
        element: <MeetingNewPage />,
      },
      {
        path: 'meetings/:id',
        element: <MeetingDetailPage />,
      },
      {
        path: 'meetings/:id/edit',
        element: <MeetingEditPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;