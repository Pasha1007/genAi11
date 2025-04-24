import { supabase } from './supabase';
import type { Meeting, MeetingInsert, MeetingStatus, Participant } from './database.types';

// Fetch all meetings
export async function getMeetings() {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .order('arranged_time', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

// Fetch meetings by status
export async function getMeetingsByStatus(status: MeetingStatus) {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('status', status)
    .order('arranged_time', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

// Fetch a single meeting by ID
export async function getMeetingById(id: string) {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// Create a new meeting
export async function createMeeting(meeting: MeetingInsert) {
  const { data, error } = await supabase
    .from('meetings')
    .insert(meeting)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Update an existing meeting
export async function updateMeeting(id: string, updates: Partial<Meeting>) {
  const { data, error } = await supabase
    .from('meetings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Delete a meeting
export async function deleteMeeting(id: string) {
  const { error } = await supabase
    .from('meetings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Add a participant to a meeting
export async function addParticipant(meetingId: string, participant: Participant) {
  // First get the current participants
  const meeting = await getMeetingById(meetingId);
  const updatedParticipants = [...meeting.participants, participant];
  
  return updateMeeting(meetingId, { participants: updatedParticipants });
}

// Remove a participant from a meeting
export async function removeParticipant(meetingId: string, participantIndex: number) {
  // First get the current participants
  const meeting = await getMeetingById(meetingId);
  const updatedParticipants = meeting.participants.filter((_, index) => index !== participantIndex);
  
  return updateMeeting(meetingId, { participants: updatedParticipants });
}