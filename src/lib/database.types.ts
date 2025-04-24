export interface Database {
  public: {
    Tables: {
      meetings: {
        Row: Meeting;
        Insert: MeetingInsert;
        Update: Partial<MeetingInsert>;
      };
    };
  };
}

export interface Meeting {
  id: string;
  title: string;
  arranged_time: string;
  status: MeetingStatus;
  participants: Participant[];
  created_at: string;
  updated_at: string;
}

export interface MeetingInsert {
  title: string;
  arranged_time: string;
  status: MeetingStatus;
  participants: Participant[];
}

export type MeetingStatus = 'scheduled' | 'in-progress' | 'completed' | 'canceled';

export interface Participant {
  name: string;
  position: string;
}