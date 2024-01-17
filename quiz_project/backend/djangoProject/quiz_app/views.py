from user_app.models import Course
from user_app.serializer import CourseSerializer
from .models import Question, Quizzes, Category
from .serializer import QuizzesSerializer, QuestionSerializer, QuizzCreateSerializer, \
    QuestionWithAnswersSerializer, CategorySerializer, TestQuizCreateSerializer
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class QuizListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Quizzes.objects.all()
    serializer_class = QuizzesSerializer


class UserQuizListAPIView(APIView):
    """
    returns all quizzes associated to current authenticated user.
    must be used in user profile > user quizzes
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, **kwargs):
        quizzes = Quizzes.objects.filter(creator__email=request.user.email)
        serializer = QuizzesSerializer(quizzes, many=True)
        return Response(serializer.data)


class StartQuiz(APIView):
    """
    returns full quiz by it title,
    all questions and answers are comes together.
    """

    permission_classes = [IsAuthenticated]
    def get(self, request, format=None, **kwargs):
        quiz = Question.objects.filter(quiz__title=kwargs['quiz_title']).order_by('?')
        serializer = QuestionSerializer(quiz, many=True)
        return Response(serializer.data)


class QuizCreateAPIView(APIView):
    """
    creates a new quiz
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, **kwargs):
        course = Course.objects.all()
        category = Category.objects.all()

        category_serializer = CategorySerializer(category, many=True)
        course_serializer = CourseSerializer(course, many=True)

        return Response({'category': category_serializer.data, 'course': course_serializer.data})

    def post(self, request, format=None, **kwargs):
        creator = request.user
        serializer = QuizzCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=creator)
        return Response({"data": request.data}, status=status.HTTP_201_CREATED)


class FullQuestionCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuestionWithAnswersSerializer


class TestQuizCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Quizzes.objects.all()
    serializer_class = TestQuizCreateSerializer
