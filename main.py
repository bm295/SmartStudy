import json
import random
import tkinter as tk
from tkinter import messagebox

DATA_PATH = "data/questions.json"


class MCQApp:
    def __init__(self, root):
        self.root = root
        self.root.title("MCQ Practice")
        self.topics = []
        self.active_topic = None
        self.questions = []
        self.current_index = 0
        self.selected_vars = []

        self.header_label = tk.Label(root, text="MCQ Practice", font=("Segoe UI", 18, "bold"))
        self.header_label.pack(pady=(10, 4))

        self.subheader_label = tk.Label(
            root,
            text="Select a topic and answer the questions.",
            font=("Segoe UI", 11),
        )
        self.subheader_label.pack(pady=(0, 10))

        control_frame = tk.Frame(root)
        control_frame.pack(pady=6)

        tk.Label(control_frame, text="Topic:").grid(row=0, column=0, padx=6)
        self.topic_var = tk.StringVar()
        self.topic_menu = tk.OptionMenu(control_frame, self.topic_var, "")
        self.topic_menu.grid(row=0, column=1, padx=6)

        self.start_button = tk.Button(control_frame, text="Start Practice", command=self.start_practice)
        self.start_button.grid(row=0, column=2, padx=6)

        self.card_frame = tk.Frame(root, borderwidth=1, relief=tk.GROOVE, padx=16, pady=16)
        self.card_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=12)

        self.meta_label = tk.Label(self.card_frame, text="", font=("Segoe UI", 9))
        self.meta_label.pack(anchor="w")

        self.question_label = tk.Label(self.card_frame, text="", font=("Segoe UI", 12, "bold"), wraplength=600, justify=tk.LEFT)
        self.question_label.pack(anchor="w", pady=(8, 10))

        self.answers_frame = tk.Frame(self.card_frame)
        self.answers_frame.pack(anchor="w", fill=tk.X)

        action_frame = tk.Frame(self.card_frame)
        action_frame.pack(pady=(12, 0))

        self.check_button = tk.Button(action_frame, text="Check Answer", command=self.check_answer)
        self.check_button.grid(row=0, column=0, padx=6)

        self.next_button = tk.Button(action_frame, text="Next Question", command=self.next_question, state=tk.DISABLED)
        self.next_button.grid(row=0, column=1, padx=6)

        self.feedback_label = tk.Label(self.card_frame, text="", font=("Segoe UI", 10, "bold"))
        self.feedback_label.pack(anchor="w", pady=(10, 0))

        self.load_topics()

    def load_topics(self):
        try:
            with open(DATA_PATH, "r", encoding="utf-8") as file:
                data = json.load(file)
        except FileNotFoundError:
            messagebox.showerror("Error", f"Missing data file: {DATA_PATH}")
            self.root.destroy()
            return
        except json.JSONDecodeError:
            messagebox.showerror("Error", "Question data is not valid JSON.")
            self.root.destroy()
            return

        self.topics = data.get("topics", [])
        if not self.topics:
            messagebox.showerror("Error", "No topics found in the question data.")
            self.root.destroy()
            return

        menu = self.topic_menu["menu"]
        menu.delete(0, "end")
        for topic in self.topics:
            menu.add_command(label=topic["name"], command=lambda value=topic["id"]: self.topic_var.set(value))

        self.topic_var.set(self.topics[0]["id"])

    def start_practice(self):
        topic_id = self.topic_var.get()
        self.active_topic = next((topic for topic in self.topics if topic["id"] == topic_id), None)
        if not self.active_topic:
            messagebox.showwarning("Missing Topic", "Please select a topic to begin.")
            return

        self.questions = random.sample(self.active_topic["questions"], k=len(self.active_topic["questions"]))
        self.current_index = 0
        self.render_question()

    def clear_answers(self):
        for child in self.answers_frame.winfo_children():
            child.destroy()
        self.selected_vars = []

    def render_question(self):
        question = self.questions[self.current_index]
        self.meta_label.config(
            text=f"{self.active_topic['name']} | Question {self.current_index + 1} of {len(self.questions)}"
        )
        self.question_label.config(text=question["text"])
        self.clear_answers()

        allows_multiple = len(question["correctAnswers"]) > 1
        if allows_multiple:
            for index, choice in enumerate(question["choices"]):
                var = tk.BooleanVar()
                widget = tk.Checkbutton(
                    self.answers_frame,
                    text=choice,
                    variable=var,
                    anchor="w",
                    justify=tk.LEFT,
                    wraplength=600,
                )
                widget.pack(anchor="w", pady=2)
                self.selected_vars.append(var)
        else:
            selection = tk.IntVar(value=-1)
            for index, choice in enumerate(question["choices"]):
                widget = tk.Radiobutton(
                    self.answers_frame,
                    text=choice,
                    variable=selection,
                    value=index,
                    anchor="w",
                    justify=tk.LEFT,
                    wraplength=600,
                )
                widget.pack(anchor="w", pady=2)
            self.selected_vars.append(selection)

        self.feedback_label.config(text="")
        self.next_button.config(state=tk.DISABLED)

    def collect_selected(self):
        question = self.questions[self.current_index]
        allows_multiple = len(question["correctAnswers"]) > 1

        if allows_multiple:
            selected = [idx for idx, var in enumerate(self.selected_vars) if var.get()]
        else:
            selected_index = self.selected_vars[0].get()
            selected = [] if selected_index == -1 else [selected_index]

        return selected

    def check_answer(self):
        question = self.questions[self.current_index]
        selected = self.collect_selected()

        if not selected:
            self.feedback_label.config(text="Select an answer before checking.", fg="#b42318")
            return

        correct_set = set(question["correctAnswers"])
        is_correct = len(selected) == len(correct_set) and all(choice in correct_set for choice in selected)

        if is_correct:
            self.feedback_label.config(text="Correct! You can move to the next question.", fg="#0e7a3b")
            self.next_button.config(state=tk.NORMAL)
        else:
            self.feedback_label.config(text="Not quite. Please try again before moving on.", fg="#b42318")

    def next_question(self):
        if self.current_index < len(self.questions) - 1:
            self.current_index += 1
            self.render_question()
        else:
            self.feedback_label.config(text="Great work! You completed this topic.", fg="#0e7a3b")
            self.next_button.config(state=tk.DISABLED)


if __name__ == "__main__":
    root = tk.Tk()
    root.geometry("720x520")
    app = MCQApp(root)
    root.mainloop()
