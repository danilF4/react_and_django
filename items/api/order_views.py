from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView
from .serializers import OrderSerializer
from items.models import Order

# Order APIView
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
