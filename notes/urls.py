# notes/urls.py

from django.urls import path
from .views import (
    NoteDetailView,
    AudioUploadView,
    NoteListCreateView,
    NoteDeleteView,
    NoteAudioListView,
)


urlpatterns = [
    path("notes", NoteListCreateView.as_view(), name="note-list-create"),
    path(
        "notes/<int:note_id>/audios/",
        NoteAudioListView.as_view(),
        name="note-audios",
    ),
    path("notes/<int:pk>/", NoteDetailView.as_view(), name="note-detail"),
    path("notes/<int:note_id>", NoteDeleteView.as_view(), name="note-delete"),
    path(
        "record/<int:note_id>",
        AudioUploadView.as_view(),
        name="audio-upload",
    ),
]
