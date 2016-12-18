import Step from './models/step';

export default function () {
  Step.remove({}, () => {});
  Step.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = 'Learn slocks basics by listening to some times.';

    const content2 = 'Listen to some times and guess.';

    const step1 = new Step({ number: 1, title: 'Learn the Basics', slug: 'learn-the-basics', cuid: 'cikqgkv4q01ck7453ualdn3hd', desc: content1 });
    const step2 = new Step({ number: 2, title: 'Try it Yourself', slug: 'try-it-yourself', cuid: 'cikqgkv4q01ck7453ualdn3hf', desc: content2 });

    Step.create([step1, step2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
