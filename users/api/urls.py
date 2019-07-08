from django.urls import path
from .views import DetailUserView, ListUserView

urlpatterns = [
	path('<pk>/', DetailUserView.as_view()),
	path('', ListUserView.as_view())
]