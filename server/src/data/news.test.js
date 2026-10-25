import test from 'node:test';
import assert from 'node:assert/strict';
import { news } from './news.js';

test('news dataset contains twenty complete curated articles', () => {
  assert.equal(news.length, 20);
  assert.equal(new Set(news.map((item) => item.id)).size, 20);
  for (const item of news) {
    assert.ok(item.title, `missing title for ${item.id}`);
    assert.ok(item.summary, `missing summary for ${item.id}`);
    assert.ok(item.fullContent, `missing full content for ${item.id}`);
    assert.ok(item.publishedAt, `missing publication label for ${item.id}`);
    assert.match(item.officialUrl, /^https:\/\//, `source should use HTTPS for ${item.id}`);
  }
});
