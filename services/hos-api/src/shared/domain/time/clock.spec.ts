import { SystemClock } from './clock';

describe('SystemClock', () => {
  it('provides current time values', () => {
    const clock = new SystemClock();

    expect(clock.now()).toBeInstanceOf(Date);
    expect(Date.parse(clock.nowIso())).not.toBeNaN();
  });
});
