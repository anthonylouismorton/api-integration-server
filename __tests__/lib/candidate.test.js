'use strict';

const { db, Candidates } = require('../../lib/model');

beforeAll(async () => {
  await db.sync();
});

describe('tesing the Candidates Model', () => {
  
  let candidate = {
    name: 'test',
  };
  let id = null;

  it('Create a Candidate', async () => {
    let test = await Candidates.create(candidate);

    expect(test.name).toBe(candidate.name);
    expect(test.voteCount).toBe(0);
    id = test.id;
  });

  it('Read a Candidate', async () => {
    let test = await Candidates.findOne({where: {name: candidate.name }});

    expect(test.name).toBe(candidate.name);
    expect(test.voteCount).toBe(0);
    expect(test.id).toBe(id);
  });

  it('Add a vote', async () => {
    let test = await Candidates.findOne({ where: { id }});
    test.voteCount = test.voteCount + 1;
    let updated = await test.save();
    
    expect(updated.voteCount).toBe(1);
  });
});
