import test from 'node:test';
import assert from 'node:assert/strict';
import { schemes, updates, events } from './schemes.js';

test('scheme dataset contains 20 unique schemes with required information', () => {
  assert.equal(schemes.length, 20, 'the demo directory should contain exactly 20 schemes');
  assert.equal(new Set(schemes.map((item) => item.id)).size, schemes.length);
  for (const scheme of schemes) {
    assert.ok(scheme.name, 'scheme name is required');
    assert.ok(scheme.summary, scheme.id + ' summary is required');
    assert.ok(scheme.benefits, scheme.id + ' benefit description is required');
    assert.ok(scheme.eligibility.length > 0, scheme.id + ' eligibility checklist is required');
    assert.ok(scheme.documents.length > 0, scheme.id + ' document checklist is required');
    assert.match(scheme.officialUrl, /^https:\/\//, scheme.id + ' must link to HTTPS');
    assert.ok(Array.isArray(scheme.targetGroups) && scheme.targetGroups.length > 0, scheme.id + ' needs filterable target groups');
    assert.ok(Array.isArray(scheme.residence) && scheme.residence.length > 0, scheme.id + ' needs filterable residence values');
    assert.ok(scheme.benefitType, scheme.id + ' needs a filterable benefit type');
    assert.ok(scheme.stateScope, scheme.id + ' needs geographic scope');
    assert.ok(scheme.sourceCheckedAt, scheme.id + ' needs source review date');
  }
});

test('updates and public-service resources have safe HTTPS links', () => {
  assert.ok(updates.length > 0);
  assert.ok(events.length > 0);
  for (const item of [...updates, ...events]) {
    assert.ok(item.title, 'resource title is required');
    assert.match(item.officialUrl, /^https:\/\//, item.id + ' must link to HTTPS');
  }
});
