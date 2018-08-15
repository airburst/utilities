/* eslint-env jest */
import toposort from './toposort';

describe('Toposort', () => {
  it('sorts a collection with no-edge nodes', async () => {
    const collection = [
      ['r1', ['r2']],
      ['r2', ['r3']],
      ['r3', ['r4']],
      ['r4', []],
      ['r5', []],
    ];

    const result = toposort(collection);

    expect(result.error).toBe(null);
    expect(result.sorted).toMatchObject(['r4', 'r5', 'r3', 'r2', 'r1']);
  });

  it('returns a cyclic error', async () => {
    const cyclic = [
      ['r1', ['r2']],
      ['r2', ['r3']],
      ['r3', ['r1']], // cycle
      ['r4', []],
      ['r5', []],
    ];

    const result = toposort(cyclic);

    expect(result.error).toBe('Cyclic collection');
  });

  it('sorts a "full" collection, without no-edge nodes', async () => {
    const notCyclic = [['r1', ['r6']], ['r2', ['r3']], ['r3', ['r1']]];

    const result = toposort(notCyclic);

    expect(result.error).toBe(null);
    expect(result.sorted).toMatchObject(['r1', 'r3', 'r2']);
  });
});
