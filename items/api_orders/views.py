from rest_framework.generics import UpdateAPIView, CreateAPIView, RetrieveAPIView, ListAPIView
from .serializers import OrderSerializer
from items.models import Order
from rest_framework import viewsets

class OrderViewSet(viewsets.ModelViewSet):
	serializer_class = OrderSerializer
	queryset = Order.objects.all()
'''
class ListOrderView(ListAPIView):
	serializer_class = OrderSerializer
	queryset = Order.objects.all()

class DetailOrderView(RetrieveAPIView):
	serializer_class = OrderSerializer
	queryset = Order.objects.all()

class CreateOrderView(CreateAPIView):
	serializer_class = OrderSerializer
	queryset = Order.objects.all()

class UpdateOrderView(UpdateAPIView):
	serializer_class = OrderSerializer
	queryset = Order.objects.all()
	'''