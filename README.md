# MCQ Practice Desktop App

A lightweight desktop application for practising multiple-choice questions by topic.

## Run locally

This app uses Python and Tkinter (included with most Python installations).

```bash
python main.py
```

## Add questions

Edit `data/questions.json` to add topics and questions. Each topic has an `id`, `name`, and a list of questions. Each question includes:

- `text`: the question content
- `choices`: list of answer choices
- `correctAnswers`: list of zero-based indices for correct options
