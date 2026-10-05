/**
 * BFC Talks guests — PLACEHOLDERS.
 * Replace with real, guest-approved names, roles, bios and photos.
 * `photo` accepts an image path (e.g. '/images/guests/guest-01.jpg');
 * when empty a neutral placeholder portrait is rendered.
 */

const PLACEHOLDER_BIO =
  '[Short guest bio — professional background, areas of expertise and current role. Replace with text approved by the guest.]';

export const GUESTS = [
  { id: 'guest-01', name: '[Guest Name]', designation: '[Designation]', company: '[Company]', sector: 'Construction', tone: 'warm' },
  { id: 'guest-02', name: '[Guest Name]', designation: '[Designation]', company: '[Company]', sector: 'Project Management', tone: 'steel' },
  { id: 'guest-03', name: '[Guest Name]', designation: '[Designation]', company: '[Organization]', sector: 'Infrastructure', tone: 'cool' },
  { id: 'guest-04', name: '[Guest Name]', designation: '[Designation]', company: '[Company]', sector: 'Real Estate', tone: 'warm' },
  { id: 'guest-05', name: '[Guest Name]', designation: '[Founder / Designation]', company: '[Company]', sector: 'Entrepreneurship', tone: 'steel' },
  { id: 'guest-06', name: '[Guest Name]', designation: '[Designation]', company: '[Company]', sector: 'Technology', tone: 'cool' },
  { id: 'guest-07', name: '[Guest Name]', designation: '[Designation]', company: '[Organization]', sector: 'Leadership', tone: 'warm' },
  { id: 'guest-08', name: '[Guest Name]', designation: '[Designation]', company: '[Company]', sector: 'Construction', tone: 'steel' },
].map((guest) => ({
  bio: PLACEHOLDER_BIO,
  photo: '',
  linkedin: '', // TODO: guest LinkedIn URL
  ...guest,
}));

export function getGuest(id) {
  return GUESTS.find((g) => g.id === id);
}
