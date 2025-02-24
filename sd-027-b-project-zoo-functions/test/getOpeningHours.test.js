const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {});
it('Testes da função getOpeningHours', () => {
  expect(getOpeningHours()).toMatchObject({
    Tuesday: { open: 8, close: 6 },
    Wednesday: { open: 8, close: 6 },
    Thursday: { open: 10, close: 8 },
    Friday: { open: 10, close: 8 },
    Saturday: { open: 8, close: 10 },
    Sunday: { open: 8, close: 8 },
    Monday: { open: 0, close: 0 },
  });
  expect(() => getOpeningHours('fff', '29:00-PM')).toThrow(/^The day must be valid. Example: Monday$/);
  expect(() => getOpeningHours('NNN', '29:00-PM')).toThrow(/^The day must be valid. Example: Monday$/);
  expect(() => getOpeningHours('Friday', '29:00-PM')).toThrow(/^The hour must be between 0 and 12$/);
  expect(() => getOpeningHours('Friday', '10:75-PM')).toThrow(/^The minutes must be between 0 and 59$/);
  expect(() => getOpeningHours('Friday', '10:00-FM')).toThrow(/^The abbreviation must be 'AM' or 'PM'$/);
  expect(() => getOpeningHours('Friday', '10:00-JFKSJF')).toThrow(/^The abbreviation must be 'AM' or 'PM'$/);
  expect(() => getOpeningHours('Saturday', 'Saturday')).toThrow(/^The hour should represent a number$/);
  expect(getOpeningHours('Saturday', '09:00-PM')).toBe('The zoo is open');
  expect(getOpeningHours('Saturday', '11:00-PM')).toBe('The zoo is closed');
  expect(getOpeningHours('Monday', '12:00-AM')).toBe('The zoo is closed');
});
