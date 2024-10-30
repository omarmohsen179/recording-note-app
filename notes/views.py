from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Audio, Note
from .serializers import AudioSerializer, NoteSerializer


class NoteAudioListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AudioSerializer

    def get_queryset(self):
        note_id = self.kwargs.get("note_id")
        return Audio.objects.filter(note_id=note_id, note__user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"detail": "No audios found for this note."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)


class AudioUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, note_id):
        try:
            note = Note.objects.get(id=note_id, user=request.user)
            if "audio" not in request.FILES:
                raise ParseError("Audio file not provided.")
            file = request.FILES["audio"]
            audio = Audio.objects.create(note=note, file=file)
            serializer = AudioSerializer(audio)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as err:
            print(err)
            return Response(
                {"detail": "Note not found. xxx" + str(err)},
                status=status.HTTP_404_NOT_FOUND,
            )


class NoteDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, note_id):
        try:
            # Get the note related to the specific user
            note = Note.objects.get(id=note_id, user=request.user)
            note.delete()
            return Response(
                {"message": "Note deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Note.DoesNotExist:
            return Response(
                {"error": "Note not found."}, status=status.HTTP_404_NOT_FOUND
            )
