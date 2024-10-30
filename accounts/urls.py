# notes/urls.py

from django.urls import path
from accounts.views import RegisterView, LoginView, UserListView

urlpatterns = [
    path("users/", UserListView.as_view(), name="user-list"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
]
