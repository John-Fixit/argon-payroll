let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const events = [
  {
    id: createEventId(),
    title: 'Intermediate Technician Certificate Course',
    start: '2024-01-01',
    end: '2024-05-20'
  },
  {
    id: createEventId(),
    title: 'STANDARD AIR TRAFFIC CONTROL COURSE NO 75',
    start: '2024-01-01',
    end: '2024-05-20'
  },
  {
    id: createEventId(),
    title: 'Advance Aeronautical Information Management Officers course',
    start: '2024-01-01',
    end: '2024-05-20'
  },
  {
    id: createEventId(),
    title: '2-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}