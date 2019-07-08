from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import UserSerializer
from users.models import MyUser

class ListUserView(ListAPIView):
	serializer_class = UserSerializer
	queryset = MyUser.objects.all()

class DetailUserView(RetrieveAPIView):
	serializer_class = UserSerializer
	queryset = MyUser.objects.all()