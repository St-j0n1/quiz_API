from django.db import models
from user_app.models import Course, CustomUser
import uuid


class Category(models.Model):
    name = models.CharField(max_length=50)  # exp: python, c++, angular, PHP, other...

    def __str__(self):
        return self.name


class Quizzes(models.Model):
    # TODO: change title default name with logged in user username
    creator = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, null=True)
    title = models.CharField(max_length=225, default=f"new_quiz-{uuid.uuid4()}")
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, default=1)  # exp: Python
    course = models.ForeignKey(Course, on_delete=models.DO_NOTHING, default=1)  # exp: Backend
    level = models.CharField(max_length=200, choices=(
        ('easy', 'easy'),
        ('medium', 'medium'),
        ('hard', 'hard')
    ), default='medium')
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Quizzes'
        verbose_name = 'Quiz'
        ordering = ['id']


class Question(models.Model):
    TYPE = ((1, 'true or false'),
            (2, 'correct answer'),
            (3, 'multy select'))

    quiz = models.ForeignKey(Quizzes, on_delete=models.CASCADE, related_name='question', null=True)
    technique = models.IntegerField(choices=TYPE, default=3)
    title = models.CharField(max_length=200, verbose_name='Question Title')
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Questions'
        verbose_name = 'Question'
        ordering = ['id']


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answer', on_delete=models.CASCADE)
    answer_text = models.CharField(max_length=225)
    is_correct = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Answers'
        verbose_name = 'Answer'
        ordering = ['id']

    def __str__(self):
        return self.answer_text
