import { ResultFactory } from './result';

describe('ResultFactory', () => {
  it('creates successful operation results', () => {
    const result = ResultFactory.ok('accepted');

    expect(result).toEqual({
      success: true,
      value: 'accepted',
    });
  });

  it('creates failed operation results', () => {
    const error = new Error('denied');
    const result = ResultFactory.fail(error);

    expect(result).toEqual({
      success: false,
      error,
    });
  });
});
