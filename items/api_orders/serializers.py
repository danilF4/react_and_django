from rest_framework import serializers
from items.models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
	#items = CustomPKRelatedField(queryset=OrderItem.objects.all(), many=True)
	class Meta:
		model = Order
		fields = ('pk', 'user', 'items', 'ordered_date', 'ordered')