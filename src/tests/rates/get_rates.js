/**
 * @author - Wokoro Douye Samuel
 */

import axios from 'axios';
import sinon from 'sinon';

import { expect } from 'chai';
import request from '../../config/supertest';

const sandbox = sinon.createSandbox();

describe('Rates return tests GET: /api/rates', () => {
  it('should return rates successfully', async () => {
    const data = {
      base: 'NGN',
      data: '2021-01-15T00:00:00.000Z',
      rates: { CAD: 1.5413, PHP: 58.226 }
    };

    sandbox.stub(axios, 'get').returns({ data });

    const res = await request
      .get('/api/rates')
      .send();

    const { body } = res;

    expect(body.status).to.equal(200);
    expect(body.message).to.eql('success');
    expect(body.results).to.eql(data);

    sandbox.restore();
  });

  it('should return error for invalid base currency value', async () => {
    const res = await request
      .get(`/api/rates?base=invalid`)
      .send();

    const { body } = res;

    expect(body.status).to.equal(406);
    expect(body.message).to.eql('error');
    expect(body.error).to.eql(['Base currency must contain three(3) alphabets only']);

  });

  it('should return error for invalid base currency value', async () => {
    const res = await request
      .get(`/api/rates?currency=invalid`)
      .send();

    const { body } = res;

    expect(body.status).to.equal(406);
    expect(body.message).to.eql('error');
    expect(body.error).to.eql(["Currency must contain three(3) alphabets only, got: 'invalid'"]);

  });

  it('should return error for unsupported currency', async () => {
    sandbox.stub(axios, 'get').throws({
      response: { data: { error: "Base 'YYY' is not supported" } }
    });

    const res = await request
      .get(`/api/rates?base=YYY`)
      .send();

    const { body } = res;

    expect(body.status).to.equal(400);
    expect(body.message).to.eql('error');
    expect(body.error).to.eql("Base 'YYY' is not supported");

  });
});
