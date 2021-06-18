import { expect } from 'chai';
import * as main from '../src/main'

describe('./src/main', () => {
  it('version is set', () => {
    expect(main.version).to.be.ok;
  });
});