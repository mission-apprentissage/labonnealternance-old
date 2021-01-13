import hightlightItem from '../../services/hightlightItem';

describe('hightlightItem', () => {

  it('call : should wrap matching item inside <strong> html tag', async () => {
    expect(hightlightItem('aaron', 'aa')).toEqual('<strong>aa</strong>ron');
  });
  it('call : resist to uppercase', async () => {
    expect(hightlightItem('Aaron', 'aa')).toEqual('<strong>Aa</strong>ron');
  });
  it('call : resist to multiple matching', async () => {
    expect(hightlightItem('Aaronaa', 'aa')).toEqual('<strong>Aa</strong>ron<strong>aa</strong>');
  });
  it('call : left initial String as-is if no match', async () => {
    expect(hightlightItem('Aaron', 'bb')).toEqual('Aaron');
  });

});
