/*
  # Seed meetings data
  
  1. Test Data
    - Creates 10 sample meetings with varied:
      - Titles
      - Times (past, present, future)
      - Statuses
      - Participant counts
    - Realistic participant data with names and positions
  
  2. Data Distribution
    - Mix of meeting statuses
    - Varied participant counts (2-8 people)
    - Spread of dates (last week to next month)
*/

INSERT INTO meetings (title, arranged_time, status, participants)
VALUES
  (
    'Q1 2025 Planning Session',
    NOW() + INTERVAL '2 days',
    'scheduled',
    '[
      {"name": "Sarah Chen", "position": "Product Manager"},
      {"name": "Michael Rodriguez", "position": "Engineering Lead"},
      {"name": "Emma Thompson", "position": "UX Designer"},
      {"name": "David Kim", "position": "Backend Developer"}
    ]'::jsonb
  ),
  (
    'Weekly Engineering Sync',
    NOW() - INTERVAL '2 hours',
    'in-progress',
    '[
      {"name": "Michael Rodriguez", "position": "Engineering Lead"},
      {"name": "Alex Johnson", "position": "Frontend Developer"},
      {"name": "Lisa Wang", "position": "QA Engineer"}
    ]'::jsonb
  ),
  (
    'Design Review - Mobile App',
    NOW() - INTERVAL '2 days',
    'completed',
    '[
      {"name": "Emma Thompson", "position": "UX Designer"},
      {"name": "James Wilson", "position": "UI Designer"},
      {"name": "Sarah Chen", "position": "Product Manager"},
      {"name": "Alex Johnson", "position": "Frontend Developer"},
      {"name": "Maria Garcia", "position": "Mobile Developer"}
    ]'::jsonb
  ),
  (
    'Client Presentation - Project Phoenix',
    NOW() + INTERVAL '5 days',
    'scheduled',
    '[
      {"name": "John Smith", "position": "Account Executive"},
      {"name": "Sarah Chen", "position": "Product Manager"},
      {"name": "Emma Thompson", "position": "UX Designer"},
      {"name": "Michael Rodriguez", "position": "Engineering Lead"}
    ]'::jsonb
  ),
  (
    'Sprint Planning',
    NOW() + INTERVAL '1 day',
    'scheduled',
    '[
      {"name": "Michael Rodriguez", "position": "Engineering Lead"},
      {"name": "Sarah Chen", "position": "Product Manager"},
      {"name": "David Kim", "position": "Backend Developer"},
      {"name": "Alex Johnson", "position": "Frontend Developer"},
      {"name": "Lisa Wang", "position": "QA Engineer"},
      {"name": "Maria Garcia", "position": "Mobile Developer"}
    ]'::jsonb
  ),
  (
    'Security Review Meeting',
    NOW() - INTERVAL '1 day',
    'completed',
    '[
      {"name": "David Kim", "position": "Backend Developer"},
      {"name": "Robert Taylor", "position": "Security Engineer"},
      {"name": "Michael Rodriguez", "position": "Engineering Lead"}
    ]'::jsonb
  ),
  (
    'Product Demo',
    NOW() - INTERVAL '3 days',
    'canceled',
    '[
      {"name": "Sarah Chen", "position": "Product Manager"},
      {"name": "John Smith", "position": "Account Executive"},
      {"name": "Emma Thompson", "position": "UX Designer"}
    ]'::jsonb
  ),
  (
    'Architecture Discussion',
    NOW() + INTERVAL '3 days',
    'scheduled',
    '[
      {"name": "Michael Rodriguez", "position": "Engineering Lead"},
      {"name": "David Kim", "position": "Backend Developer"},
      {"name": "Lisa Wang", "position": "QA Engineer"},
      {"name": "Robert Taylor", "position": "Security Engineer"}
    ]'::jsonb
  ),
  (
    'Team Retrospective',
    NOW() - INTERVAL '4 hours',
    'completed',
    '[
      {"name": "Sarah Chen", "position": "Product Manager"},
      {"name": "Michael Rodriguez", "position": "Engineering Lead"},
      {"name": "Emma Thompson", "position": "UX Designer"},
      {"name": "Alex Johnson", "position": "Frontend Developer"},
      {"name": "Lisa Wang", "position": "QA Engineer"},
      {"name": "Maria Garcia", "position": "Mobile Developer"},
      {"name": "David Kim", "position": "Backend Developer"},
      {"name": "James Wilson", "position": "UI Designer"}
    ]'::jsonb
  ),
  (
    'API Integration Workshop',
    NOW() + INTERVAL '4 days',
    'scheduled',
    '[
      {"name": "David Kim", "position": "Backend Developer"},
      {"name": "Alex Johnson", "position": "Frontend Developer"},
      {"name": "Maria Garcia", "position": "Mobile Developer"},
      {"name": "Michael Rodriguez", "position": "Engineering Lead"}
    ]'::jsonb
  );