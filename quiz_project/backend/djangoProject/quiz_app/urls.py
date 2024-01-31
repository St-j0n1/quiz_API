from django.urls import path
from .views import QuizListAPIView, StartQuiz, UserQuizListAPIView, QuizCreateAPIView, FullQuestionCreateAPIView, \
    TestQuizCreateAPIView

urlpatterns = [
    path('list/', QuizListAPIView.as_view(), name='quiz_list'),
    path('new_quiz_create', QuizCreateAPIView.as_view(), name='quiz_create'),
    path('new_question_create', FullQuestionCreateAPIView.as_view(), name='create question and answers'),


    path('myquiz/', UserQuizListAPIView.as_view(), name='current_user_quizzes'),
    path('start/<str:quiz_title>/', StartQuiz.as_view(), name='questions'),

    path('test_quiz_create/', TestQuizCreateAPIView.as_view(), name='testing')
]





