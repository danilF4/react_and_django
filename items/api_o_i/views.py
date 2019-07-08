from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
from .serializers import OrderItemSerializer
from items.models import OrderItem
from rest_framework.response import Response
from django.conf import settings
from rest_framework import viewsets
# OrderItem APIView

class OrderItemViewSet(viewsets.ModelViewSet):
	serializer_class = OrderItemSerializer
	queryset = OrderItem.objects.all()

'''
class ListOrderItemView(ListAPIView):
	serializer_class = OrderItemSerializer
	queryset = OrderItem.objects.all()

class DetailOrderItemView(RetrieveAPIView):
	serializer_class = OrderItemSerializer
	queryset = OrderItem.objects.all()

class CreateOrderItemView(CreateAPIView):
	serializer_class = OrderItemSerializer
	queryset = OrderItem.objects.all()

	def get_response(self):
		if getattr(settings, 'REST_USE_JWT', False):
			data = {
                'item': self.item,
                'user': self.user,
                'size': self.size,
            }
			serializer = serializer_class(instance=data,
                                          context={'request': self.request})
		response = Response(serializer.data, status=status.HTTP_200_OK)
		if getattr(settings, 'REST_USE_JWT', False):
			from rest_framework_jwt.settings import api_settings as jwt_settings
			if jwt_settings.JWT_AUTH_COOKIE:
				response.set_cookie(jwt_settings.JWT_AUTH_COOKIE,
                                    self.item,
                                    self.user,
                                    httponly=True)
		return response

class UpdateOrderItemView(UpdateAPIView):
	serializer_class = OrderItemSerializer
	queryset = OrderItem.objects.all()


class DeleteOrderItemView(DestroyAPIView):
	serializer_class = OrderItemSerializer
	queryset = OrderItem.objects.all()
	'''