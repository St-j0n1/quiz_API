from django.contrib import admin
from . import models


@admin.register(models.Quizzes)
class QuizzesAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'level']


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']


class AnswerInlineModel(admin.TabularInline):
    model = models.Answer
    fields = ['answer_text', 'is_correct']


@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
    fields = ['title', 'quiz']
    list_display = ['title', 'quiz']
    inlines = [AnswerInlineModel,]


@admin.register(models.Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = [
        'answer_text', 'is_correct', 'question']
