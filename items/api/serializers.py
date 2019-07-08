from rest_framework import serializers
from items.models import Item, Order, OrderItem, Size, Empty_class, Category
class ItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = Item 
		fields = ('title', 'price', 'category', 'image', 'id')


class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Order 
		fields = ('user', 'items', 'start_date', 'ordered_date', 'ordered')

class SizeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Size
		fields = ('size', 'pk')

class EmptySerializer(serializers.ModelSerializer):
	#items = CustomPKRelatedField(queryset=OrderItem.objects.all(), many=True)
	class Meta:
		model = Empty_class
		fields = ('quantity2',)

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('category', 'pk')