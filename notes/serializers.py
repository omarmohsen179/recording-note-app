# serializers.py
from rest_framework import serializers
from .models import Note, Audio


class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = ["id", "file", "created_at"]


class NoteSerializer(serializers.ModelSerializer):
    audios = AudioSerializer(many=True, read_only=True)  # Include related audios

    class Meta:
        model = Note
        fields = ["id", "title", "description", "created_at", "updated_at", "audios"]
