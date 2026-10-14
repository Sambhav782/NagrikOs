import test from 'node:test';
import assert from 'node:assert/strict';
import { schemes, updates, events } from './schemes.js';

test('scheme dataset has unique ids and required information', () => {
  assert.ok(schemes.length >= 5);
  assert.equal(new Set(schemes.map((item) => item.id)).size, schemes.length);
  for (const scheme of schemes) {
    assert.ok(scheme.name, 'scheme name is required');
    assert.ok(scheme.summary, scheme.id + ' summary is required');
    assert.ok(scheme.eligibility.length > 0, scheme.id + ' eligibility checklist is required');
    assert.ok(scheme.documents.length > 0, scheme.id + ' document checklist is required');
    assert.match(scheme.officialUrl, /^https:\/\//, scheme.id + ' must link to HTTPS');
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
