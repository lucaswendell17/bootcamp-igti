import express from 'express';
import { promises } from 'fs';
import calc from '../libs/calculos.js';

const { readFile, writeFile } = promises;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const { student, subject, type, value } = req.body;
    const grade = {
      id: data.nextId++,
      student,
      subject,
      type,
      value,
      timestamp: new Date(),
    };
    data.grades.push(grade);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const { id, student, subject, type, value } = req.body;

    const index = data.grades.findIndex((grade) => grade.id === parseInt(id));

    if (index === -1) {
      res.status(400).send({ error: 'Register not found.' });
    }

    data.grades[index] = {
      ...data.grades[index],
      student,
      subject,
      type,
      value,
    };
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.grades[index]);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    res.send(grade);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;

    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/totalSubject', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const { student, subject } = req.body;

    let grades = data.grades.filter(
      (grade) => grade.student === student && grade.subject === subject
    );

    grades = grades.map((grade) => grade.value);

    res.send({ total: calc.soma(grades) });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/average', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const { subject, type } = req.body;

    let grades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );

    grades = grades.map((grade) => grade.value);

    res.send({ total: calc.media(grades) });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/bestGrades', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const { subject, type } = req.body;

    let grades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );

    grades = grades.sort((a, b) => b.value - a.value).slice(0, 3);

    res.send(grades);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/totalMes/:mes', async (req, res) => {
  try {
    res.send('await totalMes(parseInt(req.params.mes))');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
