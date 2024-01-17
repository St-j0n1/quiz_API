from rest_framework import serializers

from user_app.serializer import UserSerializer
from .models import Quizzes, Question, Answer, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class QuizzesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzes
        fields = ('title', 'category', 'course', 'level', 'date_created')


class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    answer = AnswersSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('quiz', 'technique', 'title', 'answer')


class QuizzCreateSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Quizzes
        fields = ['creator', 'title', 'course', 'category', 'level']


class QuestionWithAnswersSerializer(serializers.ModelSerializer):
    answer = AnswersSerializer(many=True)

    class Meta:
        model = Question
        fields = ["quiz", 'technique', 'title', 'answer']

    def create(self, validated_data):
        answers = validated_data.pop('answer')

        question = Question.objects.create(**validated_data)

        for answer in answers:
            Answer.objects.create(question=question, **answer)

        return question


class TestQuizCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzes
        fields = ['creator', 'title', 'course', 'category', 'level']


