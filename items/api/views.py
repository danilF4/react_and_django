from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView
from .serializers import ItemSerializer, SizeSerializer, EmptySerializer, CategorySerializer
from items.models import Item, Size, Empty_class, Category

# Item APIView
class DetailItemView(RetrieveAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class UpdateItemView(UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class ListItemView(ListAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class CreateItemView(CreateAPIView):
	serializer_class = ItemSerializer
	queryset = Item.objects.all()

class SizeView(ListAPIView):
	serializer_class = SizeSerializer
	queryset = Size.objects.all()

class CategoryView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class EmptyListView(ListAPIView):
    serializer_class = EmptySerializer
    queryset = Empty_class.objects.all()