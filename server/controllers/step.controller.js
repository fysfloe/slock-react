import Step from '../models/step';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getSteps(req, res) {
  Step.find().sort('number').exec((err, steps) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ steps });
  });
}

/**
 * Get a single step
 * @param req
 * @param res
 * @returns void
 */
export function getStep(req, res) {
  Step.findOne({ cuid: req.params.cuid }).exec((err, step) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ step });
  });
}
