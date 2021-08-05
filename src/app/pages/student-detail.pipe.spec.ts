import { StudentDetailPipe } from './student-detail.pipe';

describe('StudentDetailPipe', () => {
  it('create an instance', () => {
    const pipe = new StudentDetailPipe();
    expect(pipe).toBeTruthy();
  });
});
