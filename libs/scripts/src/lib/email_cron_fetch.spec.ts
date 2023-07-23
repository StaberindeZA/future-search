import { email_cron_fetch } from './email_cron_fetch';

describe('email_cron_fetch', () => {
  it('should work', () => {
    expect(email_cron_fetch({ status: 'NEW' })).toEqual('email_cron_fetch');
  });
});
