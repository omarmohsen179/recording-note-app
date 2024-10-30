# noteapp/urls.py
from django.contrib import admin
from django.urls import path, include
from notes import urls as notes_urls
from accounts import urls as accounts_urls
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(notes_urls)),  # Include URLs from notes app
    path("auth/", include(accounts_urls)),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
