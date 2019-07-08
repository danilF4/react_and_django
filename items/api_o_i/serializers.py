from rest_framework import serializers
from items.models import OrderItem, Item

from rest_framework.renderers import JSONRenderer


class OrderItemSerializer(serializers.ModelSerializer):
	#item = serializers.StringRelatedField(many=True)
	class Meta:
		model = OrderItem 
		fields = ('item', 'item_title', 'item_price', 'item_size', 'item_category', 'user', 'size', 'quantity', 'item_image', 'pk')
