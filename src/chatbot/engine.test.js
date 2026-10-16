import { getLocalReply } from './engine';

const ask = (q) => getLocalReply(q);

describe('portfolio chatbot engine', () => {
  test('greets', () => {
    expect(ask('hi').text).toMatch(/portfolio assistant/i);
  });

  test('greeting + question answers the question, not just hello', () => {
    expect(ask('hi, what is his experience?').text).toMatch(/Androapps/);
  });

  test('experience lists both jobs', () => {
    const r = ask('Tell me about his work experience');
    expect(r.text).toMatch(/Androapps Technology/);
    expect(r.text).toMatch(/Tech Sierra/);
  });

  test('skills are grouped', () => {
    const r = ask('what skills does he have?');
    expect(r.text).toMatch(/Frontend: .*React\.js/);
    expect(r.text).toMatch(/Backend: .*Laravel/);
    expect(r.text).toMatch(/Database: MongoDB/);
  });

  test('project list and a single project', () => {
    expect(ask('show me your projects').text).toMatch(/GoKwik/);
    const r = ask("Tell me about the GoKwik project");
    expect(r.text).toMatch(/GoKwik/);
    expect(r.links.some((l) => l.label === 'Visit site')).toBe(true);
  });

  test('known tech says yes and where it was used', () => {
    const r = ask('Does he know Laravel?');
    expect(r.text).toMatch(/^Yes - Laravel/);
    expect(r.text).toMatch(/Androapps/);
  });

  test('"node js" and "nodejs" are recognised', () => {
    expect(ask('do you use node js').text).toMatch(/^Yes - Node\.js/);
    expect(ask('nodejs?').text).toMatch(/^Yes - Node\.js/);
  });

  test('tech outside the stack is answered honestly', () => {
    const r = ask('does he know python?');
    expect(r.text).toMatch(/don't have python listed/i);
  });

  test('"java" does not match JavaScript', () => {
    expect(ask('does he know java').text).toMatch(/don't have java listed/i);
  });

  test('education', () => {
    expect(ask('where did he study?').text).toMatch(/University of Mumbai/);
  });

  test('contact gives email, linkedin and github', () => {
    const r = ask('how can I contact him?');
    const labels = r.links.map((l) => l.label);
    expect(labels).toEqual(expect.arrayContaining(['Email Satish', 'LinkedIn', 'GitHub']));
  });

  test('hiring question does not claim job-seeking status', () => {
    const r = ask('is he available for hire?');
    expect(r.text).toMatch(/best way to reach/i);
    expect(r.text).not.toMatch(/open to work|looking for a job|available for/i);
  });

  test('resume request points to contact', () => {
    expect(ask('can I get his resume?').text).toMatch(/resume/i);
  });

  test('salary is declined', () => {
    expect(ask('what is his expected salary?').text).toMatch(/can't share salary/i);
  });

  test('phone / personal details are never exposed', () => {
    const all = ['what is his phone number', 'contact him', 'where does he live', 'resume'].map((q) => JSON.stringify(ask(q)));
    all.forEach((r) => expect(r).not.toMatch(/\+91|98336/));
  });

  test('bot honesty', () => {
    expect(ask('are you a bot?').text).toMatch(/automated assistant/i);
  });

  test('thanks and bye', () => {
    expect(ask('thank you!').text).toMatch(/welcome/i);
    expect(ask('bye').text).toMatch(/thanks for stopping by/i);
  });

  test('empty and gibberish fall back', () => {
    expect(ask('').text).toMatch(/not sure/i);
    expect(ask('asdkjh qwe').text).toMatch(/not sure/i);
  });
});
